import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { prisma } from "@/util/Prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {

    const session = await GetTheSession()
    if (!session?.user.id) {
      throw new AppError("Unauthrized", 400)
    }
    const { searchParams } = new URL(request.url)
    const offset = searchParams.get("offset")
    const limit = searchParams.get("limit")
    console.log(offset, limit)
    const rooms = await prisma.room.findMany({
      where: {
        visibility: "SHOW",
      },
      skip: Number(offset!),
      take: Number(limit)!,
      orderBy: {
        id: "desc"
      }
      ,
      include: {
        members: {
          include: {
            member: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    },);
    return NextResponse.json({ data: rooms, success: true }, { status: 200 })


  } catch (error) {
    return handleApiError(error)

  }

}
export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const session = await GetTheSession()
    if (!session) {
      throw new AppError("unAuthorized user", 400)
    }
    if (!body.roomId) {
      throw new AppError("room id is required", 401)

    }
    const respons = await prisma.roomMembership.create({
      data: {
        memberId: session.user.id,
        roomId: body.roomId
      }
    })
    if (!respons) {
      throw new AppError("something went wrong", 500)
    }
    return NextResponse.json({
      data: respons,
      message: "user created successfully",
      success: true
    }, {
      status: 200
    })

  } catch (error) {
    return handleApiError(error)
  }
} const body = await request.json();
const session = await GetTheSession()
if (!session) {
  throw new AppError("unAuthorized user", 400)
}
if (!body.roomId) {
  throw new AppError("room id is required", 401)

}
const respons = await prisma.roomMembership.create({
  data: {
    memberId: session.user.id,
    roomId: body.roomId
  }
})
if (!respons) {
  throw new AppError("something went wrong", 500)
}
return NextResponse.json({
  data: respons,
  message: "user created successfully",
  success: true
}, {
  status: 200
})
    
  } catch (error) {
  return handleApiError(error)
}
}