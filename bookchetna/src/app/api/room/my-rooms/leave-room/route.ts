import { leaveRoomByRoomid } from "@/services/room.server.service";
import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest){
    try {
        const session= await GetTheSession()
        if(!session?.user.id){
            throw new AppError("UnAuthorized",403)
        }
        const body= await request.json()
        if(!body.roomId){
            throw new AppError("Room Id requried",403)
        }

        const respons= await leaveRoomByRoomid({roomId:body.roomId,userId:session?.user.id!})
        return NextResponse.json({message:"User Lived Room successfully",sucess:true},{status:200})
    } catch (error) {
        console.log(error)
        return handleApiError(error)
    }

}