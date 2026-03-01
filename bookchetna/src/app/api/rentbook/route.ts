import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import {
  createRentalRequests,
  acceptRentalRequest,
} from "@/services/rentbook.server.service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const _id = session?.user.id;
    if (!_id) {
      throw new AppError("User is not logged in", 401, "UNAUTHORIZED");
    }

    return NextResponse.json({ message: "Not implemented" });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const booksId: number[] = await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      throw new AppError("Bad Request: User not logged in", 401, "UNAUTHORIZED");
    }
    if (booksId.length == 0) {
      throw new AppError("Zero books requested", 400, "INVALID_INPUT");
    }

    await createRentalRequests(booksId, session.user.id);

    return NextResponse.json(
      {
        message: "Order have Been Placed",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await GetTheSession();
    if (!session?.user.id) {
      throw new AppError("not authenticated", 400);
    }

    const body: { id: number } = await request.json();

    const res = await acceptRentalRequest(body.id);
    if (!res) {
      throw new AppError("Something went wrong", 500);
    }

    return NextResponse.json(
      { message: "Book have been given", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}