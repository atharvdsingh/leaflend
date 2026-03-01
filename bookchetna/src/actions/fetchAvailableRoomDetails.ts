import type { roomTypeForCardWithName } from "@/types/databaseRoutesType";
import { fetchPublicRooms as fetchPublicRoomsService } from "@/services/room.services";

export async function fetchPublicRooms(
  offset: number,
  limit: number
): Promise<roomTypeForCardWithName[]> {
  try {
    return await fetchPublicRoomsService(offset, limit);
  } catch (error) {
    console.error("Failed to fetch public rooms", error);
    return [];
  }
}
