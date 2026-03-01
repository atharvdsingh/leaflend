import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { prisma } from "@/util/Prisma";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await GetTheSession();
    if (!session) {
      throw new AppError("not authenticated", 400);
    }
    const body: { id: number; } = await request.json();
    if (!body) {
      throw new AppError("book id is not given", 411)
    }
    const res = await prisma.$transaction(async (tx) => {
      const res = await tx.rentalRequest.update({
        where: {
          id: body.id
        }, data: {
          status: "REJECTED"
        }
      })
      if (!res) {
        throw new AppError("error from database ...try again latter", 50)

      }
      return res
    })
    return NextResponse.json({
      message: "Request Reject successfully", success: false
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    return handleApiError(error)

  }
}
return res
     })
return NextResponse.json({
  message: "Request Reject successfully", success: false
}, { status: 200 })
 } catch (error) {
  console.log(error)
  return handleApiError(error)

}
}
