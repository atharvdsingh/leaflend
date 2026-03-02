"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Conversation, ChatUser } from "@/lib/chat-mock-data";
import {
    getConversationDisplayName,
    getUserInitials,
    CURRENT_USER,
} from "@/lib/chat-mock-data";
import {
    X,
    Users,
    Crown,
    UserPlus,
    LogOut,
    Bell,
    BellOff,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupInfoPanelProps {
    conversation: Conversation;
    onClose: () => void;
}

export function GroupInfoPanel({ conversation, onClose }: GroupInfoPanelProps) {
    const displayName = getConversationDisplayName(conversation);

    return (
        <div className="w-80 border-l border-border bg-background flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-sm text-foreground">
                    {conversation.isGroup ? "Group Info" : "Contact Info"}
                </h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-full"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    {/* Profile section */}
                    <div className="flex flex-col items-center text-center space-y-3">
                        <Avatar className="h-20 w-20 border-2 border-border">
                            <AvatarFallback className={cn(
                                "text-xl font-bold",
                                conversation.isGroup
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                            )}>
                                {conversation.isGroup ? (
                                    <Users className="h-8 w-8" />
                                ) : (
                                    getUserInitials(displayName)
                                )}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-semibold text-foreground">{displayName}</h4>
                            {conversation.isGroup && (
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {conversation.members.length} members
                                </p>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Quick actions */}
                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors text-sm text-foreground">
                            <Bell className="h-4 w-4 text-muted-foreground" />
                            Mute notifications
                        </button>
                        {conversation.isGroup && (
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors text-sm text-foreground">
                                <Settings className="h-4 w-4 text-muted-foreground" />
                                Group settings
                            </button>
                        )}
                    </div>

                    <Separator />

                    {/* Members list */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Members ({conversation.members.length})
                            </h5>
                            {conversation.isGroup && (
                                <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg">
                                    <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                                    Add
                                </Button>
                            )}
                        </div>

                        <div className="space-y-1">
                            {conversation.members.map((member: ChatUser) => {
                                const isCurrentUser = member.id === CURRENT_USER.id;
                                return (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/40 transition-colors"
                                    >
                                        <div className="relative">
                                            <Avatar className="h-9 w-9 border border-border">
                                                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                                                    {getUserInitials(member.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            {member.isOnline && (
                                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm font-medium text-foreground truncate">
                                                    {isCurrentUser ? "You" : member.name}
                                                </span>
                                                {/* Show admin badge for first member (mock) */}
                                                {member.id === conversation.members[0]?.id && (
                                                    <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5 rounded border-0">
                                                        <Crown className="h-2.5 w-2.5 mr-0.5" />
                                                        Admin
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-[11px] text-muted-foreground">
                                                {member.email}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Separator />

                    {/* Danger zone */}
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-colors text-sm text-destructive">
                        <LogOut className="h-4 w-4" />
                        {conversation.isGroup ? "Leave group" : "Delete chat"}
                    </button>
                </div>
            </ScrollArea>
        </div>
    );
}
