import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";
import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }
    const data = await req.json();

    // Basic validation
    if (!data.bookname) {
      throw new AppError("Book name is required", 400, "INVALID_INPUT");
    }

    const newBook = await prisma.booksHave.create({
      data: {
        bookname: data.bookname,
        // author: data.author, // Schema missing author
        // genres: data.genres, // Schema uses bookType enum, needs mapping
        // price: Number(data.price), // Schema missing price
        ownerId: session.user.id,
        status: "AVAILABLE",
        cover: data.coverUrl || null, // Schema uses 'cover'
        // description: data.description || "" // Schema missing description
      },
    });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
