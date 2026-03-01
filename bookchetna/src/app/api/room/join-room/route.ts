import { AppError } from "@/util/AppError";
import { handleApiError } from "@/util/HandleError";
import { prisma } from "@/util/Prisma";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const session = await getServerSession(authOptions)
        if (!session?.user.id) {
            throw new AppError("Envalied session", 400)

        }
        console.log("......................................................", body.roomId)
        if (!body.roomId) {
            throw new AppError("room id is missing", 402)
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
            message: "joined room", success: true,
            data: respons
        }, {
            status: 200
        })

    } catch (error) {
        return handleApiError(error)

    }

}       }
return NextResponse.json({
    message: "joined room", success: true,
    data: respons
}, {
    status: 200
})
        
    } catch (error) {
    return handleApiError(error)

}

}