"use client";
import React, { useEffect, useId, useState } from "react";
import CenterComponent from "../CenterComponent";
import RoomNavbar from "./RoomNavbar";
import { Message } from "@/types/chat.types";
import { useSocketStatus } from "../providers/ChatContextProvider";
import { useChat } from "@/hooks/useChat";
import { Input } from "../ui/input";
import { Image, Loader, Send } from "lucide-react";
import { Button } from "../ui/button";
import { ChatService } from "@/services/chat.srvice";

export default function Chatpage({
  roomId,
  userId,
}: {
  roomId: string;
  userId: number;
}) {
  const { isConnected } = useSocketStatus();
  const { message, sendMessage, setMessage } = useChat(roomId);
  const [input, setInput] = useState<string>("");
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input?.trim().length == 0) return;
    sendMessage({
      message: input!,
      senderId: userId,
      roomId: roomId,
    });
    setInput("");
  };
  useEffect(() => {
    async function GetInitiallyChat() {
      const chat = await ChatService.getChatsByRoomId(roomId);
      if (chat) {
        setMessage(chat);
      }
    }
    GetInitiallyChat();
  }, []);
  console.log(userId);

  return (
    <>
      <CenterComponent className="border border-border rounded-2xl my-10 ">
        <RoomNavbar roomId={roomId} />
        <div className="h-[50vh]  max-h-[50vh] overflow-y-scroll ">
          {Array.isArray(message) && message.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 ${msg.senderId !== userId ? "justify-start " : "justify-end    "}`}
            >
              <p
                className={`px-2 my-2 rounded-[2px]  text-background bg-foreground `}
              >
                {msg.message}
              </p>
              {msg.timestamp && (
                <p className="text-xs text-muted-foreground">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              )}
            </div>
          ))}
        </div>
        {!isConnected ? (
          <div className="flex justify-between px-4 py-2 items-center border-t border-border">
            <p>Connecting to server...</p>

            <Loader className="animate-spin text-red-500 " />
          </div>
        ) : (
          <form
            onSubmit={handleOnSubmit}
            action=""
            className="flex items-center gap-4   m-6 justify-between "
          >
            <Input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Type a Message"
              className="flex-1 w-full"
            />

            <Button type="submit">
              <Send className="flex  justify-center items-center" />
            </Button>
          </form>
        )}
      </CenterComponent>
    </>
  );
}
