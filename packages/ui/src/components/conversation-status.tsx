import { ArrowRight, ArrowUp01Icon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "../lib/utils"

interface ConversationStatusIconProps {
    status: "unresolved" | "escalated" | "resolved";
}

const statusConfig = {
    resolved: {
        icon: CheckmarkBadge01Icon,
        bgColor: "bg-success"
    },
    unresolved: {
        icon: ArrowRight,
        bgColor: "bg-destructive"
    },
    escalated: {
        icon: ArrowUp01Icon,
        bgColor: "bg-warning"
    }
} as const

export const ConversationStatusIcon = ({
    status,
}: ConversationStatusIconProps) => {
    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <div className={cn("flex aspect-square items-center justify-center rounded-full p-1 size-5", config.bgColor)}>
            <HugeiconsIcon icon={Icon} className="size-4 shrink-0 stroke-3 text-white" />
        </div>
    )
}