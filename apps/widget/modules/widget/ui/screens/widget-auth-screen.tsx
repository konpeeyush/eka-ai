"use client";

import { useState } from "react";
import { z } from "zod";
import { WidgetHeader } from "../components/widget-header";
import { Form } from "@workspace/ui/components/form";
import {
    Field,
    FieldLabel,
    FieldControl,
    FieldError,
} from "@workspace/ui/components/field";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { Doc } from "@workspace/backend/convex/_generated/dataModel";
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, organizationIdAtom } from "../../atoms/widget-atoms";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;


export const WidgetAuthScreen = () => {
    const [errors, setErrors] = useState<Record<string, string | string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormEmpty, setIsFormEmpty] = useState(true);
    const organizationId = useAtomValue(organizationIdAtom);
    const setContactSessionId = useSetAtom(
        contactSessionIdAtomFamily(organizationId || "")
    )

    const createContactSession = useMutation(api.public.contactSessions.create);

    const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const nameValue = formData.get("name") as string;
        const emailValue = formData.get("email") as string;
        setIsFormEmpty(!nameValue?.trim() || !emailValue?.trim());
    };

    const handleSubmit = async (formValues: Record<string, any>) => {
        // Clear stale errors before re-validating
        setErrors({});

        const result = formSchema.safeParse(formValues);

        if (!result.success) {
            const fieldErrors: Record<string, string[]> = {};
            for (const issue of result.error.issues) {
                const key = issue.path[0] as string;
                if (!fieldErrors[key]) {
                    fieldErrors[key] = [];
                }
                fieldErrors[key].push(issue.message);
            }
            setErrors(fieldErrors);
            return;
        }

        if (!organizationId) {
            return;
        }

        setIsSubmitting(true);

        try {
            const metadata: Doc<"contactSessions">["metadata"] = {
                userAgent: navigator.userAgent,
                language: navigator.language,
                languages: navigator.languages?.join(","),
                platform: navigator.platform,
                vendor: navigator.vendor,
                screenResolution: `${screen.width}x${screen.height}`,
                viewportSize: `${window.innerWidth}x${window.innerHeight}`,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezoneOffset: new Date().getTimezoneOffset(),
                cookieEnabled: navigator.cookieEnabled,
                referrer: document.referrer || "direct",
                currentUrl: window.location.href,
            };

            const contactSessionId = await createContactSession({
                ...result.data,
                organizationId,
                metadata,
            });

            setContactSessionId(contactSessionId);
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
                    <p className="text-3xl">
                        Hi there! 👋
                    </p>
                    <p className="text-lg">
                        Let&apos;s get you started
                    </p>
                </div>
            </WidgetHeader>

            <Form
                className="flex flex-col gap-4 p-4"
                errors={errors}
                onFormSubmit={handleSubmit}
                onChange={handleFormChange}
            >
                <Field name="name" disabled={isSubmitting}>
                    <FieldLabel>Name</FieldLabel>
                    <FieldControl
                        render={(props) => (
                            <Input {...props} placeholder="Your name" />
                        )}
                    />
                    <FieldError />
                </Field>

                <Field name="email" disabled={isSubmitting}>
                    <FieldLabel>Email</FieldLabel>
                    <FieldControl
                        render={(props) => (
                            <Input {...props} type="email" placeholder="you@example.com" />
                        )}
                    />
                    <FieldError />
                </Field>

                <Button type="submit" className="w-full" loading={isSubmitting} disabled={isFormEmpty}>
                    Get Started
                </Button>
            </Form>
        </>
    );
};