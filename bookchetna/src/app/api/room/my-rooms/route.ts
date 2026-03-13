import { handleApiError } from "@/util/HandleError";
import { GetTheSession } from "@/util/GetTheSession";
import { AppError } from "@/util/AppError";
import { NextRequest, NextResponse } from "next/server";
import { getMyRooms,deleteRoomById } from "@/services/room.server.service";
import { Session } from "inspector/promises";
import { success } from "zod";

export async function GET() {
    try {
        const session = await GetTheSession();
        if (!session?.user.id) {
            throw new AppError("Unauthorized", 401);
        }

        const rooms = await getMyRooms(session.user.id);
        if (rooms.length === 0) {
            throw new AppError("No rooms found", 404);
        }

        return NextResponse.json(
            {
                success: true,
                message: "Rooms fetched successfully",
                data: rooms,
            },
            { status: 200 }
        );
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request:NextRequest){
    try {
        const body= await request.json()
        if(!body.roomId){
            throw new AppError("roomId not found",400)
        }
        console.log("tried deleting room")
        const session  = await GetTheSession()
        if(!session?.user.id){
            throw new AppError("Unauthorized",401)
        }
        const data= await deleteRoomById({roomId:body.roomId,
            memberId:session.user.id
            
        })
        if(!data){
            throw new AppError("something went wrong",501)
        }
        return NextResponse.json({
            message:"book deleted successfully",
            success:true
        },{status:200})
    } catch (error) {
        return handleApiError(error)
    }
}