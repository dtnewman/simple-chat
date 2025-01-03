import * as React from "react"
import { cn } from "@/lib/utils"

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "sent" | "received"
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
    ({ className, variant = "received", children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex w-full gap-2 p-4",
                    variant === "sent" ? "justify-end" : "justify-start",
                    className
                )}
                {...props}
            >
                <div
                    className={cn(
                        "rounded-lg px-3 py-2 max-w-[95%] sm:max-w-[80%]",
                        variant === "sent"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                    )}
                >
                    {children}
                </div>
            </div>
        )
    }
)
ChatBubble.displayName = "ChatBubble"

export { ChatBubble } 