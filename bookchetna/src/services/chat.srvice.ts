import { Message } from "@/types/chat.types";

export class chatService {
  async getChatsByRoomId(roomId: string): Promise<Message[]> {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/chat"!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: roomId }),
      });
      return res.json()
    } catch (error) {
      return []
    }
  }
}


export const ChatService = new chatService()