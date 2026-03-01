import { api } from "@/lib/axios";
import type { roomTypeForCardWithName } from "@/types/databaseRoutesType";

/**
 * Create a new room (POST /room/create-room).
 */
export async function createRoom(roomName: string, description: string) {
    const res = await api.post("/room/create-room", {
        roomName: roomName,
        discription: description,
    });
    return res;
}

/**
 * Join a room by code (POST /room/join-room).
 */
export async function joinRoomByCode(roomId: number) {
    const res = await api.post("/room/join-room", { roomId });
    return res;
}

/**
 * Join a public room (POST /room/public).
 */
export async function joinPublicRoom(roomId: number) {
    const res = await api.post("/room/public", { roomId });
    return res;
}

/**
 * Fetch public rooms with pagination (GET /room/public).
 */
export async function fetchPublicRooms(
    offset: number,
    limit: number
): Promise<roomTypeForCardWithName[]> {
    const res = await api.get(
        `/room/public?offset=${offset}&limit=${limit}`
    );
    return res.data.data as roomTypeForCardWithName[];
}
