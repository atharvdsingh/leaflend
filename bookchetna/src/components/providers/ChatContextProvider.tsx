"use client"
import { socket } from "@/lib/Socket";
import { Children, createContext, useContext, useEffect, useState } from "react";

interface socketContextType {
    isConnected: boolean;
}

const socketContext = createContext<socketContextType>({ isConnected: false })

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    useEffect(() => {
        socket.connect()
        const onConnect = () => setIsConnected(true)
        const onDisconnect = () => setIsConnected(false)
        const onConnectError = (err: Error) => {
            console.error("[Socket] Connection error:", err.message)
            console.error("[Socket] Description:", (err as any).description)
            console.error("[Socket] Transport:", socket.io.engine?.transport?.name)
        }
        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("connect_error", onConnectError)
        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("connect_error", onConnectError)
            socket.disconnect()
        }
    }, [])
    return (
        <socketContext.Provider value={{ isConnected }}>
            {children}
        </socketContext.Provider>
    )
}
export const useSocketStatus = () => useContext(socketContext)