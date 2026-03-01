import { api } from "@/lib/axios";

/**
 * Fetch all books, optionally filtered by room.
 */
export async function fetchBooks(roomId?: string | null) {
    const params = roomId ? `?room=${roomId}` : "";
    const res = await api.get(`/books${params}`);
    return res.data;
}
