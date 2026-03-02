"use client";

import React, { useState, useRef, useCallback } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = useCallback(() => {
        const trimmed = message.trim();
        if (!trimmed) return;
        onSendMessage(trimmed);
        setMessage("");
        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }, [message, onSendMessage]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        // Auto-grow textarea
        const el = e.target;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 120) + "px";
    };

    return (
        <div className="border-t border-border bg-background/80 backdrop-blur-sm px-4 py-3">
            <div className="flex items-end gap-2 max-w-4xl mx-auto">
                {/* Emoji placeholder button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground rounded-full"
                    type="button"
                >
                    <Smile className="h-5 w-5" />
                </Button>

                {/* Text area */}
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        disabled={disabled}
                        rows={1}
                        className={cn(
                            "w-full resize-none rounded-xl border border-border bg-muted/50 px-4 py-2.5",
                            "text-sm text-foreground placeholder:text-muted-foreground/60",
                            "focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-border",
                            "transition-all duration-200 scrollbar-hide",
                            "min-h-[40px] max-h-[120px]"
                        )}
                    />
                </div>

                {/* Send button */}
                <Button
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                    size="icon"
                    className={cn(
                        "h-9 w-9 shrink-0 rounded-full transition-all duration-200",
                        message.trim()
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-100"
                            : "bg-muted text-muted-foreground scale-95"
                    )}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
