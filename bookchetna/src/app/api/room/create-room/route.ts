import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { prisma } from "@/util/Prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await GetTheSession();
    if (!session?.user.id) {
      throw new AppError("Unauthrized", 400);
    }
    if (!body.roomName) {
      throw new AppError("room name is missing", 401);
    }

    const respons = await prisma.$transaction(async (tx) => {
      const respons = await tx.room.create({
        data: {
          roomName: body.roomName,
          discription: body.discription!,
        },
      });
      await tx.roomMembership.create({
        data: {
          memberId: session.user.id,
          roomId: respons.id,
          roomRole: "ADMIN",
        },
      });
      return respons;
    });

    if (!respons) {
      throw new AppError("something went wront", 500);
    }
    return NextResponse.json(
      {
        message: "room created successfully",
        data: respons,
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
return respons;
    });

if (!respons) {
  throw new AppError("something went wront", 500);
}
return NextResponse.json(
  {
    message: "room created successfully",
    data: respons,
    success: true,
  },
  { status: 200 },
);
  } catch (error) {
  return handleApiError(error);
}
}
