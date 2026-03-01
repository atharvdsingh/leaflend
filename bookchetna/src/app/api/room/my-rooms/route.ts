import { handleApiError } from "@/util/HandleError";
import { authOptions } from "../../auth/[...nextauth]/route";
import { GetTheSession } from "@/util/GetTheSession";
import { AppError } from "@/util/AppError";
import { prisma } from "@/util/Prisma";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        const session = await GetTheSession()
        if (!session?.user.id) {
            throw new AppError("Unauthorized", 401)
        }

        const rooms = await prisma.room.findMany({
            where: {
                members: {
                    some: {
                        memberId: session.user.id
                    }
                }
            }
        })
        if (rooms.length === 0) {
            throw new AppError("No rooms found", 404)
        }
        return NextResponse.json({
            success: true,
            message: "Rooms fetched successfully",
            data: rooms
        }, { status: 200 })

    } catch (error) {
        return handleApiError(error)
    }

}               }
            }
        })
if (rooms.length === 0) {
    throw new AppError("No rooms found", 404)
}
return NextResponse.json({
    success: true,
    message: "Rooms fetched successfully",
    data: rooms
}, { status: 200 })
        
    } catch (error) {
    return handleApiError(error)
}
    
}