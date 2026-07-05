"use client";
import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atoms";
import { WidgetScreen } from "../../types";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
import { WidgetSelectionScreen } from "../screens/widget-selection-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";

interface Props {
    organizationId: string | null
}

export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtom);

    const screenComponents: Record<WidgetScreen, React.ReactNode> = {
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
        error: <WidgetErrorScreen />,
        auth: <WidgetAuthScreen />,
        selection: <WidgetSelectionScreen />,
        chat: <WidgetChatScreen />,
        voice: <p>TODO: Voice</p>,
        inbox: <p>TODO: Inbox</p>,
        contact: <p>TODO: Contact</p>
    };

    return (
        <main className="min-h-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            {screenComponents[screen]}
        </main>
    )
}