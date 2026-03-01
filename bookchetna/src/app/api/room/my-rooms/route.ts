import { handleApiError } from "@/util/HandleError";
import { GetTheSession } from "@/util/GetTheSession";
import { AppError } from "@/util/AppError";
import { NextResponse } from "next/server";
import { getMyRooms } from "@/services/room.server.service";

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