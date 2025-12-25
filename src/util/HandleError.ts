// utils/handleError.ts
import { NextResponse } from "next/server";

export function handleApiError(error: {
  message:string | "something went wrong" ,
  status:number | 500
}) {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }

  console.error("Unknown Error:", error);
  return NextResponse.json(
    { message: "Something went wrong", success: false },
    { status: error?.status }
  );
}
