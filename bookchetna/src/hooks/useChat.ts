import { socket } from "@/lib/Socket";
import { Message } from "@/types/chat.types";
import { useCallback, useEffect, useState } from "react";

export const useChat = (roomID: string) => {
  const [message, setMessage] = useState<Message[]>([]);
  useEffect(() => {
    if (!roomID) return;
    socket.emit("join_room", roomID);
    
    const handleNewMessage = (message: Message) => {
      setMessage((prev) => [...prev, message]);
    };
    

    socket.on("receive_message", handleNewMessage);
    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [roomID]);

  const sendMessage=useCallback((content:Message)=>{
    socket.emit("send_message",content)

  },[message])
  return {message,sendMessage,setMessage}
};
