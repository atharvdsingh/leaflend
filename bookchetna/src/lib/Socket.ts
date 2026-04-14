import { io, Socket } from "socket.io-client"
import { clientToServer, serverToClient } from "@/types/chat.types";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const socket: Socket<serverToClient, clientToServer> = io(`${BACKEND_URL}/chat`, {
    autoConnect: false,
    reconnection: true,
    transports: ['websocket']
});