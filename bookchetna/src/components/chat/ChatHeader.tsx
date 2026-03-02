"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "@/lib/chat-mock-data";
import {
    getConversationDisplayName,
    getOtherMembers,
    getUserInitials,
} from "@/lib/chat-mock-data";
import {
    ArrowLeft,
    Phone,
    Video,
    Info,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
    conversation: Conversation;
    onBack?: () => void;
    onToggleInfo?: () => void;
    showBackButton?: boolean;
}

export function ChatHeader({
    conversation,
    onBack,
    onToggleInfo,
    showBackButton = false,
}: ChatHeaderProps) {
    const displayName = getConversationDisplayName(conversation);
    const others = getOtherMembers(conversation);
    const firstOther = others[0];
    const isOnline = !conversation.isGroup && firstOther?.isOnline;

    // Subtitle text
    const subtitle = conversation.isGroup
        ? `${conversation.members.length} members`
        : isOnline
            ? "Online"
            : "Offline";

    return (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
            {/* Back button (mobile) */}
            {showBackButton && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="h-9 w-9 rounded-full shrink-0 lg:hidden"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            )}

            {/* Avatar */}
            <div className="relative shrink-0">
                <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback
                        className={cn(
                            "text-xs font-semibold",
                            conversation.isGroup
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                        )}
                    >
                        {conversation.isGroup ? (
                            <Users className="h-5 w-5" />
                        ) : (
                            getUserInitials(firstOther?.name || "?")
                        )}
                    </AvatarFallback>
                </Avatar>
                {isOnline && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
                )}
            </div>

            {/* Name & status */}
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm text-foreground truncate">
                    {displayName}
                </h2>
                <div className="flex items-center gap-1.5">
                    {!conversation.isGroup && isOnline && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    )}
                    <span className="text-xs text-muted-foreground">{subtitle}</span>
                    {conversation.isGroup && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 rounded-md border-0 ml-1">
                            Group
                        </Badge>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                    <Phone className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                    <Video className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleInfo}
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                >
                    <Info className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
