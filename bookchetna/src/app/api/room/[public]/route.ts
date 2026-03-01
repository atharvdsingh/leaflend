import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { NextResponse, type NextRequest } from "next/server";
import { getPublicRooms, joinPublicRoom } from "@/services/room.server.service";

export async function GET(request: NextRequest) {
  try {
    const session = await GetTheSession();
    if (!session?.user.id) {
      throw new AppError("Unauthorized", 400);
    }

    const { searchParams } = new URL(request.url);
    const offset = Number(searchParams.get("offset") || "0");
    const limit = Number(searchParams.get("limit") || "10");

    const rooms = await getPublicRooms(offset, limit);
    return NextResponse.json({ data: rooms, success: true }, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const session = await GetTheSession();
    if (!session) {
      throw new AppError("unAuthorized user", 400);
    }
    if (!body.roomId) {
      throw new AppError("room id is required", 401);
    }

    const membership = await joinPublicRoom(body.roomId, session.user.id);

    return NextResponse.json(
      {
        data: membership,
        message: "user created successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}