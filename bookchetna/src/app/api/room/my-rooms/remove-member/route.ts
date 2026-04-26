import { removeMemberFromRoom } from "@/services/room.server.service";
import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const session = await GetTheSession();
        if (!session?.user.id) {
            throw new AppError("UnAuthorized", 403);
        }
        const body = await request.json();

        if (!body.roomId) {
            throw new AppError("Room Id required", 400);
        }
        if (!body.memberId) {
            throw new AppError("Member Id required to remove", 400);
        }

        await removeMemberFromRoom({
            roomId: body.roomId,
            adminId: session.user.id,
            memberIdToRemove: body.memberId
        });

        return NextResponse.json({ message: "Member removed from room successfully", success: true }, { status: 200 });
    } catch (error) {
        console.log(error);
        return handleApiError(error);
    }
}
