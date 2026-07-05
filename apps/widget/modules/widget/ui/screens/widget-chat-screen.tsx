"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { ArrowLeft01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { api } from "@workspace/backend/convex/_generated/api";
import { useQuery } from "convex/react";

export const WidgetChatScreen = () => {
    const errorMessage = useAtomValue(errorMessageAtom);
    const conversationId = useAtomValue(conversationIdAtom);
    const organizationId = useAtomValue(organizationIdAtom);
    const contactSessionId = useAtomValue(
        contactSessionIdAtomFamily(organizationId || "")
    );

    const setScreen = useSetAtom(screenAtom);
    const setConversationId = useSetAtom(conversationIdAtom);
    const conversation = useQuery(
        api.public.conversations.getOne,
        conversationId && contactSessionId
            ? {
                conversationId,
                contactSessionId
            } : "skip"
    )

    const onBack = () => {
        setConversationId(null);
        setScreen("selection");
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
            <div className="flex flex-1 flex-col gap-y-4 p-4">
                {JSON.stringify(conversation)}
            </div>
        </>
    )
}