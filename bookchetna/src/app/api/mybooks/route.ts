import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { GetTheSession } from "@/util/GetTheSession";
import { createBook, toggleBookVisibility } from "@/services/mybook.server.service";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }
    const formdata = await req.formData();

    const newBook = await createBook(formdata, session.user.id);

    return NextResponse.json(newBook, { status: 200 });
  } catch (error) {
    console.log(error)
    return handleApiError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const session = await GetTheSession();
    if (!session) throw new AppError("user id not authenticated", 400);
    if (!data.book.id) throw new AppError("book id is not given", 400);

    const res = await toggleBookVisibility(data.book.id);
    if (!res) {
      throw new AppError("SOMETHING WENT WRONG", 500);
    }

    return NextResponse.json({
      message: "status changed",
      status: 200,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
