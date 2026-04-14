"use client";
import React, { useId, useState } from "react";
import CenterComponent from "../CenterComponent";
import RoomNavbar from "./RoomNavbar";
import { Message } from "@/types/chat.types";
import { useSocketStatus } from "../providers/ChatContextProvider";
import { useChat } from "@/hooks/useChat";
import { Input } from "../ui/input";
import { Send } from "lucide-react";
import { Button } from "../ui/button";

export default function Chatpage({ roomId,userId }: { roomId: string,userId:number }) {
  const { isConnected } = useSocketStatus();
  const { message, sendMessage, setMessage } = useChat(roomId);
  const [input,setInput]=useState<string>()
  const handleOnSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(input?.trim().length==0) return ;
    sendMessage({content:input!,
      senderId:userId,
      roomId:roomId
    })
    setInput("")
    
  }
  

  return (
    <>
      <CenterComponent className="border border-border rounded-2xl my-10 ">
        <RoomNavbar roomId={roomId} />
        <div className="h-[50vh]  max-h-[50vh] overflow-y-scroll ">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.senderId === userId ? "justify-start" : "justify-end"}`}
            >
              <p className={`p-2 rounded-lg `}>{msg.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleOnSubmit} action="" className="flex items-center gap-4   m-6 justify-between ">
          <Input onChange={(e)=>setInput(e.target.value) } value={input} placeholder="Type a Message" className="flex-1 w-full" />
          
          <Button  type="submit" >

          <Send className="flex  justify-center items-center" />
          </Button>
        </form>
      </CenterComponent>
    </>
  );
}
