import { api } from "@/lib/axios";

export default async function deleteMyRoomById(roomId: number, userId: number) {
  const respons = await api.delete("/room/my-rooms", {
    data:{roomId,userId}
  } );
  return respons.data
}
