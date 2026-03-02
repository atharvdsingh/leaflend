"use client";

import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "@/lib/chat-mock-data";
import { CURRENT_USER } from "@/lib/chat-mock-data";
import { MessageSquare } from "lucide-react";

interface ChatWindowProps {
    messages: Message[];
    isGroup: boolean;
}

export function ChatWindow({ messages, isGroup }: ChatWindowProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-3">
                    <div className="h-16 w-16 rounded-full bg-muted/50 border border-border flex items-center justify-center mx-auto">
                        <MessageSquare className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">No messages yet</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Send a message to start the conversation
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ScrollArea className="flex-1">
            <div className="px-4 py-4 max-w-4xl mx-auto">
                {/* Date separator */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-border/60" />
                    <span className="text-[10px] text-muted-foreground font-medium bg-background px-3 py-0.5 rounded-full border border-border/50">
                        Today
                    </span>
                    <div className="flex-1 h-px bg-border/60" />
                </div>

                {/* Messages */}
                {messages.map((msg, i) => {
                    const prev = i > 0 ? messages[i - 1] : null;
                    const isConsecutive = prev?.senderId === msg.senderId;

                    return (
                        <MessageBubble
                            key={msg.id}
                            message={msg}
                            showAvatar={isGroup || msg.senderId !== CURRENT_USER.id}
                            isConsecutive={isConsecutive}
                        />
                    );
                })}

                {/* Scroll anchor */}
                <div ref={bottomRef} />
            </div>
        </ScrollArea>
    );
}
