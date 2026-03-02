"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from "@/lib/chat-mock-data";
import { CURRENT_USER, getUserInitials, formatMessageTime, MOCK_USERS } from "@/lib/chat-mock-data";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    message: Message;
    showAvatar?: boolean;
    isConsecutive?: boolean;
}

export function MessageBubble({ message, showAvatar = true, isConsecutive = false }: MessageBubbleProps) {
    const isMine = message.senderId === CURRENT_USER.id;
    const sender = MOCK_USERS.find((u) => u.id === message.senderId);
    const senderName = sender?.name || "Unknown";

    return (
        <div
            className={cn(
                "flex gap-2.5 group",
                isMine ? "flex-row-reverse" : "flex-row",
                isConsecutive ? "mt-0.5" : "mt-3"
            )}
        >
            {/* Avatar */}
            <div className="w-8 shrink-0">
                {showAvatar && !isMine && !isConsecutive && (
                    <Avatar className="h-8 w-8 border border-border">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                            {getUserInitials(senderName)}
                        </AvatarFallback>
                    </Avatar>
                )}
            </div>

            {/* Bubble */}
            <div className={cn("max-w-[70%] flex flex-col", isMine ? "items-end" : "items-start")}>
                {/* Sender name for group chats */}
                {!isMine && !isConsecutive && (
                    <span className="text-[11px] text-muted-foreground mb-1 px-1 font-medium">
                        {senderName}
                    </span>
                )}

                <div
                    className={cn(
                        "px-3.5 py-2 rounded-2xl text-sm leading-relaxed break-words",
                        isMine
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted/80 text-foreground rounded-bl-md border border-border/50"
                    )}
                >
                    {message.content}
                </div>

                {/* Timestamp */}
                <span className="text-[10px] text-muted-foreground/60 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatMessageTime(message.createdAt)}
                </span>
            </div>
        </div>
    );
}
