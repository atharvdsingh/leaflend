import { api } from "@/lib/axios";

export  async function deleteMyRoomById(roomId: number, userId: number) {
  const respons = await api.delete("/room/my-rooms", {
    data:{roomId,userId}
  } );
  return respons.data
}

export async function LeaveRoomByRoomId(roomId:number,userId:number){
  const respons= await api.delete("/room/my-rooms/leave-room",{
    data:{
      roomId,userId
    }
  })
  return respons.data
}