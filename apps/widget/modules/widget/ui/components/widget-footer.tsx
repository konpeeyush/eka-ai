import { Home01Icon, InboxIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export const WidgetFooter = () => {
    const screen = "selection";
    return (
        <footer className="flex items-center justify-between border-t bg-background">
            <Button
                className="h-14 flex-1 rounded-none"
                onClick={() => { }}
                size="icon"
                variant="ghost"
            >
                <HugeiconsIcon
                    icon={Home01Icon}
                    className={cn("size-5", screen === "selection" && "text-primary")}
                />
            </Button>

            <Button
                className="h-14 flex-1 rounded-none"
                onClick={() => { }}
                size="icon"
                variant="ghost"
            >
                <HugeiconsIcon
                    icon={InboxIcon}
                    className={cn("size-5", screen === "inbox" && "text-primary")}
                />
            </Button>
        </footer>
    )
}

export default WidgetFooter