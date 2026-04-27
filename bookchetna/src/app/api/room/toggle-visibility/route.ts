import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { NextResponse, type NextRequest } from "next/server";
import { toggleRoomVisibility } from "@/services/room.server.service";

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await GetTheSession();
        if (!session?.user.id) {
            throw new AppError("Unauthorized", 400);
        }
        if (!body.roomId) {
            throw new AppError("roomId is required", 400);
        }

        const updated = await toggleRoomVisibility(
            Number(body.roomId),
            session.user.id
        );

        return NextResponse.json(
            {
                message: `Room is now ${updated.visibility === "SHOW" ? "Public" : "Private"}`,
                data: updated,
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        return handleApiError(error);
    }
}
