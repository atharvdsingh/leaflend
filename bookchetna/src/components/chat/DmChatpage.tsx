"use client";
import React, { useEffect, useRef, useState } from "react";
import CenterComponent from "../CenterComponent";
import { DmMessage } from "@/types/chat.types";
import { useSocketStatus } from "../providers/ChatContextProvider";
import { useDmChat } from "@/hooks/useDmChat";
import { Input } from "../ui/input";
import { ArrowLeft, Loader, MessageSquareDashed, Send, Wifi, WifiOff } from "lucide-react";
import { Button } from "../ui/button";
import { ChatService } from "@/services/chat.srvice";
import Link from "next/link";

export default function DmChatpage({
    userId,
    recipientId,
    recipientName,
}: {
    userId: number;
    recipientId: number;
    recipientName: string;
}) {
    const { isConnected } = useSocketStatus();
    const { messages, sendDm, setMessages } = useDmChat(userId, recipientId);
    const [input, setInput] = useState<string>("");
    const [isLoadingChats, setIsLoadingChats] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input?.trim().length == 0) return;
        sendDm(input!);
        setInput("");
    };

    useEffect(() => {
        async function GetInitiallyChat() {
            try {
                const chat = await ChatService.getDmMessages(userId, recipientId);
                if (chat) {
                    setMessages(chat);
                }
            } finally {
                setIsLoadingChats(false);
            }
        }
        GetInitiallyChat();
    }, []);

    // Auto-scroll to the bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const isReady = isConnected && !isLoadingChats;

    return (
        <>
            <CenterComponent className="border border-border rounded-2xl my-10 overflow-hidden shadow-sm">
                {/* ── DM Header ── */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-card">
                    <Link href="/home" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div className="relative w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0 overflow-hidden bg-gradient-to-br from-primary/80 to-primary">
                        <span>{recipientName?.charAt(0).toUpperCase() || "?"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{recipientName}</span>
                        <span className="text-[10px] text-muted-foreground">Direct Message</span>
                    </div>
                </div>

                {/* ── Connection status indicator ── */}
                <div className={`flex items-center gap-2 px-5 py-1.5 text-xs transition-colors duration-300 ${isConnected
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                    : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                    }`}>
                    {isConnected ? (
                        <><Wifi size={12} /> Connected</>
                    ) : (
                        <><WifiOff size={12} className="animate-pulse" /> Reconnecting…</>
                    )}
                </div>

                {/* ── Messages area ── */}
                <div
                    ref={scrollRef}
                    className="h-[55vh] max-h-[55vh] overflow-y-auto px-4 py-4 space-y-1 bg-secondary/30 scrollbar-hide"
                >
                    {isLoadingChats ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full border-2 border-muted-foreground/20 border-t-foreground animate-spin" />
                            </div>
                            <p className="text-sm text-muted-foreground tracking-wide">
                                Loading messages…
                            </p>
                        </div>
                    ) : Array.isArray(messages) && messages.length > 0 ? (
                        messages.map((msg, index) => {
                            const isMine = msg.senderId === userId;
                            return (
                                <div
                                    key={msg.id || index}
                                    className={`flex ${isMine ? "justify-end" : "justify-start"} animate-fade-in-blur`}
                                    style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                                >
                                    <div
                                        className={`
                      relative max-w-[75%] px-3 pt-2 pb-1.5 text-sm leading-relaxed flex flex-col min-w-[80px]
                      ${isMine
                                                ? "bg-foreground text-background rounded-2xl rounded-br-sm"
                                                : "bg-card border border-border text-foreground rounded-2xl rounded-bl-sm"
                                            }
                    `}
                                    >
                                        <p className="break-words mb-2">{msg.messages}</p>
                                        {msg.createdAt && (
                                            <span className={`text-[9px] absolute bottom-1.5 right-3 font-medium tracking-wide ${isMine ? "text-background/60" : "text-muted-foreground/70"
                                                }`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
                            <MessageSquareDashed size={36} strokeWidth={1.5} />
                            <p className="text-sm">No messages yet</p>
                            <p className="text-xs text-muted-foreground/60">
                                Send a message to start the conversation
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Input area ── */}
                <div className="border-t border-border bg-card/50 px-4 py-3">
                    {!isReady ? (
                        <div className="flex items-center justify-center gap-3 py-1">
                            <Loader className="animate-spin text-muted-foreground" size={16} />
                            <p className="text-sm text-muted-foreground">
                                {!isConnected ? "Waiting for connection…" : "Loading…"}
                            </p>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleOnSubmit}
                            className="flex items-center gap-3"
                        >
                            <Input
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                                placeholder="Type a message…"
                                className="flex-1 rounded-full px-5 py-2.5 bg-secondary/50 border-border/50 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-shadow"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="rounded-full h-10 w-10 shrink-0 transition-transform hover:scale-105 active:scale-95"
                                disabled={!input.trim()}
                            >
                                <Send size={16} />
                            </Button>
                        </form>
                    )}
                </div>
            </CenterComponent>
        </>
    );
}
