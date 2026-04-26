import { socket } from "@/lib/Socket";
import { DmMessage } from "@/types/chat.types";
import { useCallback, useEffect, useState } from "react";

export const useDmChat = (senderId: number, receiverId: number) => {
    const [messages, setMessages] = useState<DmMessage[]>([]);

    useEffect(() => {
        if (!senderId || !receiverId) return;

        socket.emit("join_dm", { senderId, receiverId });

        const handleNewDm = (message: DmMessage) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("receive_dm", handleNewDm);
        return () => {
            socket.off("receive_dm", handleNewDm);
        };
    }, [senderId, receiverId]);

    const sendDm = useCallback(
        (message: string) => {
            socket.emit("send_dm", { senderId, receiverId, message });
        },
        [senderId, receiverId]
    );

    return { messages, sendDm, setMessages };
};
