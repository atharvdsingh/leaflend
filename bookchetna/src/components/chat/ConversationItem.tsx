"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "@/lib/chat-mock-data";
import {
    getConversationDisplayName,
    getOtherMembers,
    getUserInitials,
    formatMessageTime,
    CURRENT_USER,
} from "@/lib/chat-mock-data";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    onClick: () => void;
}

export function ConversationItem({ conversation, isActive, onClick }: ConversationItemProps) {
    const displayName = getConversationDisplayName(conversation);
    const others = getOtherMembers(conversation);
    const firstOther = others[0];
    const isOnline = !conversation.isGroup && firstOther?.isOnline;
    const lastMessage = conversation.lastMessage;

    // Determine last message preview
    let preview = "No messages yet";
    if (lastMessage) {
        const senderPrefix = lastMessage.senderId === CURRENT_USER.id ? "You: " : "";
        preview = senderPrefix + lastMessage.content;
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-200",
                "hover:bg-muted/60",
                isActive
                    ? "bg-muted/80 border border-border/60"
                    : "border border-transparent"
            )}
        >
            {/* Avatar */}
            <div className="relative shrink-0">
                <Avatar className="h-11 w-11 border border-border">
                    <AvatarFallback className={cn(
                        "text-xs font-semibold",
                        conversation.isGroup
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                    )}>
                        {conversation.isGroup ? (
                            <Users className="h-5 w-5" />
                        ) : (
                            getUserInitials(firstOther?.name || "?")
                        )}
                    </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                {isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm text-foreground truncate">
                        {displayName}
                    </span>
                    {lastMessage && (
                        <span className="text-[10px] text-muted-foreground shrink-0">
                            {formatMessageTime(lastMessage.createdAt)}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                    <p className="text-xs text-muted-foreground truncate">
                        {preview}
                    </p>
                    {conversation.unreadCount > 0 && (
                        <Badge className="h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0 flex items-center justify-center border-0">
                            {conversation.unreadCount}
                        </Badge>
                    )}
                </div>
            </div>
        </button>
    );
}
