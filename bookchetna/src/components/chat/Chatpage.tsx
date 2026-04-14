"use client"
import React from "react";
import CenterComponent from "../CenterComponent";
import RoomNavbar from "./RoomNavbar";
import { Message } from "@/types/chat.types";

export default function Chatpage({ roomId }: { roomId: string }) {
  console.log(roomId);
  const message: Message[] = [
    {
      content: "hello",
      senderId: "2",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
    {
      content: "hello",
      senderId: "1",
      roomId: roomId,
      timestamp: new Date()
    },
  ]

  return (
    <>
      <CenterComponent className="border border-border rounded-2xl my-10 ">
        <RoomNavbar roomId={roomId} />
        <div className="h-[50vh]  max-h-[50vh] overflow-y-scroll ">
          {message.map((msg, index) => (
            <div key={index} className={`flex ${msg.senderId === "1" ? "justify-start" : "justify-end"}`}>
              <p className={`p-2 rounded-lg `}>{msg.content}</p>
            </div>
          ))}

        </div>
      </CenterComponent>
    </>
  );
}
