import { AppError } from "@/util/AppError";
import { handleApiError } from "@/util/HandleError";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { joinRoom } from "@/services/room.server.service";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions);
        if (!session?.user.id) {
            throw new AppError("Invalid session", 400);
        }
        if (!body.roomId) {
            throw new AppError("room id is missing", 402);
        }

        const membership = await joinRoom(body.roomId, session.user.id);

        return NextResponse.json(
            {
                message: "joined room",
                success: true,
                data: membership,
            },
            { status: 200 }
        );
    } catch (error) {
        return handleApiError(error);
    }
}