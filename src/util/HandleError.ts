import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { AppError } from "./AppError"

export function handleApiError(error: unknown) {
  console.error("API ERROR:", error)

  // 1️⃣ OUR custom errors → send to frontend as-is
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        status: error.status,
      },
      { status: error.status }
    )
  }

  // 2️⃣ Prisma errors → map to safe message
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          success: false,
          message: "You have already requested this book",
          code: "DUPLICATE_REQUEST",
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Database operation failed",
        code: "DATABASE_ERROR",
      },
      { status: 400 }
    )
  }

  // 3️⃣ EVERYTHING ELSE → generic error
  return NextResponse.json(
    {
      success: false,
      message: "Something went wrong. Please try again.",
      code: "INTERNAL_ERROR",
    },
    { status: 500 }
  )
}
