import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { handleApiError } from "@/util/HandleError";
import { NextResponse, type NextRequest } from "next/server";
import { rejectRentalRequest } from "@/services/rentbook.server.service";

export async function POST(request: NextRequest) {
  try {
    const session = await GetTheSession();
    if (!session) {
      throw new AppError("not authenticated", 400);
    }
    const body: { id: number } = await request.json();
    if (!body) {
      throw new AppError("book id is not given", 411);
    }

    await rejectRentalRequest(body.id);

    return NextResponse.json(
      {
        message: "Request Reject successfully",
        success: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}
