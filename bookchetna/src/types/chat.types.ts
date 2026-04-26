export interface Message {
    message: string;
    senderId: number;
    roomId: number | string;
    timestamp?: Date;
    createdAt?: Date;
}

export interface DmMessage {
    id?: string;
    senderId: number;
    receiverId: number;
    messages: string;   // field name from Prisma schema
    createdAt?: Date;
}

export interface serverToClient {
    receive_message: (message: Message) => void;
    receive_dm: (message: DmMessage) => void;
    error: (error: string) => void;
}
export interface clientToServer {
    send_message: (message: Message) => void;
    join_room: (roomId: number | string) => void;
    join_dm: (data: { senderId: number; receiverId: number }) => void;
    send_dm: (data: { senderId: number; receiverId: number; message: string }) => void;
}