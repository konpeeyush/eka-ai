"use client";

import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeft01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { contactSessionIdAtomFamily, conversationIdAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { api } from "@workspace/backend/convex/_generated/api";
import { useAction, useQuery } from "convex/react";
import {
    AIConversation,
    AIConversationContent
} from "@workspace/ui/components/ai/conversation"

import {
    AIInput,
    AIInputSubmit,
    AIInputTextarea
} from "@workspace/ui/components/ai/input"

import {
    AIMessage,
    AIMessageContent
} from "@workspace/ui/components/ai/message"

import { AIResponse } from "@workspace/ui/components/ai/response";


import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    message: z.string().min(1, "Message is required"),
})

export const WidgetChatScreen = () => {
    const conversationId = useAtomValue(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(
        contactSessionIdAtomFamily(organizationId || "")
    );

    const setScreen = useSetAtom(screenAtom);
    const setConversationId = useSetAtom(conversationIdAtom);

    const onBack = () => {
        setConversationId(null);
        setScreen("selection");
    }

    const conversation = useQuery(
        api.public.conversations.getOne,
        conversationId && contactSessionId
            ? {
                conversationId,
                contactSessionId
            } : "skip"
    )

    const messages = useThreadMessages(
        api.public.messages.getMany,
        conversation?.threadId && contactSessionId
            ? {
                threadId: conversation.threadId,
                contactSessionId
            } : "skip",
        { initialNumItems: 10 }
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        }
    })

    const createMessage = useAction(api.public.messages.create);
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!conversation || !contactSessionId) {
            return;
        }

        form.reset();

        await createMessage({
            threadId: conversation.threadId,
            prompt: values.message,
            contactSessionId,
        })
    }


    return (
        <>
            <WidgetHeader className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="hover:bg-primary/70 transition-colors duration-100"
                        onClick={onBack}
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} className="text-primary-foreground" />
                    </Button>
                    <p className="text-primary-foreground"> Chat</p>
                </div>
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="hover:bg-primary/70 transition-colors duration-100"
                >
                    <HugeiconsIcon icon={Menu01Icon} className="text-primary-foreground" />
                </Button>
            </WidgetHeader>
            <AIConversation>
                <AIConversationContent>
                    {toUIMessages(messages.results ?? [])?.map((message) => {
                        return (
                            <AIMessage
                                from={message.role === "user" ? "user" : "assistant"}
                                key={message.id}
                            >
                                <AIMessageContent>
                                    <AIResponse>
                                        {message.text}
                                    </AIResponse>
                                    {/* TODO: add avatar */}
                                </AIMessageContent>
                            </AIMessage>
                        )
                    })}
                </AIConversationContent>
            </AIConversation>
            <div className="p-4 bg-background">
                <AIInput
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full divide-none overflow-hidden rounded-2xl border bg-muted/40 focus-within:bg-background focus-within:ring-1 focus-within:ring-ring transition-all"
                >
                    <AIInputTextarea
                        {...form.register("message")}
                        disabled={conversation?.status === "resolved"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                form.handleSubmit(onSubmit)();
                            }
                        }}
                        placeholder={
                            conversation?.status === "resolved"
                                ? "This conversation has been resolved"
                                : "Ask your query..."
                        }
                    />
                    <div className="flex items-center justify-end p-2 pt-0">
                        <AIInputSubmit
                            status={form.formState.isSubmitting ? "submitted" : "ready"}
                            className="rounded-full w-8 h-8"
                        />
                    </div>
                </AIInput>
            </div>
        </>
    )
}