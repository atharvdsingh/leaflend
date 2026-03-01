import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { NextResponse, type NextRequest } from "next/server";
import { createRoom } from "@/services/room.server.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await GetTheSession();
    if (!session?.user.id) {
      throw new AppError("Unauthorized", 400);
    }
    if (!body.roomName) {
      throw new AppError("room name is missing", 401);
    }

    const room = await createRoom(body.roomName, body.discription || "", session.user.id);

    return NextResponse.json(
      {
        message: "room created successfully",
        data: room,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
