// utils/handleApiError.ts
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export function handleApiError(error: unknown) {
  console.error("API ERROR:", error)

  // 1️⃣ Prisma known errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint failed
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "Request already exists",
          code: "DUPLICATE_REQUEST",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Database error",
        code: error.code,
      },
      { status: 400 }
    )
  }

  // 2️⃣ Custom application errors
  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        code: "APP_ERROR",
      },
      { status: 400 }
    )
  }

  // 3️⃣ Unknown errors (fallback)
  return NextResponse.json(
    {
      success: false,
      message: "Something went wrong",
      code: "UNKNOWN_ERROR",
    },
    { status: 500 }
  )
}
