"use client"
import { socket } from "@/lib/Socket";
import { Children, createContext, useContext, useEffect, useState } from "react";

interface socketContextType{
    isConnected:boolean;   
}

const socketContext=createContext<socketContextType>({isConnected:false})

export const socketProvider=({Children}:{Children:React.ReactNode})=>{
    const [isConnected,setIsConnected] = useState<boolean>(false);
    useEffect(()=>{
        socket.connect()
        const onConnect=()=>setIsConnected(true)
        const onDisconnect=()=>setIsConnected(false)
        socket.on("connect",onConnect)
        socket.on("disconnect",onDisconnect)
        return ()=>{
            socket.off("connect",onConnect)
            socket.off("disconnect",onDisconnect)
            socket.disconnect()
        }
    },[])
    return (
        <socketContext.Provider value={{isConnected}}>
            {Children}
        </socketContext.Provider>
    )
}
export const useSocketStatus= ()=>useContext(socketContext)