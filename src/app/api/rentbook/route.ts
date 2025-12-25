import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const _id = session?.user.id;
    if (!_id) {
      throw new AppError("User is not logged in", 401, "UNAUTHORIZED");
    }

    // const response = await prisma.borrowsBooks.findMany({
    //   where: {
    //     id: _id,
    //   },
    // });
    // return NextResponse.json(response);
    return NextResponse.json({ message: "Not implemented" }); // Placeholder to avoid empty response if uncommented
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
    await prisma.$transaction(async (tx) => {
      for (const books of booksId) {

        const bookFromDatabase: booksHave | null =
          await tx.booksHave.findUnique({
            where: {
              id: books,
            },
          });

        if (!bookFromDatabase) {
          throw new AppError("Book not Available", 404, "BOOK_NOT_FOUND");
        }

        if (bookFromDatabase.status != "AVAILABLE") {
          throw new AppError("Book not Available", 409, "BOOK_UNAVAILABLE");
        }

        if (bookFromDatabase.ownerId === session.user.id) {
          throw new AppError("You cannot rent your own book", 400, "INVALID_OPERATION");
        }

        const UserAlreadyRequestedForBook = await tx.rentalRequest.findFirst({
          where: {
            bookId: books,
            requesterId: session.user.id,
          },
        });

        if (UserAlreadyRequestedForBook) {
          throw new AppError("Already requested this book", 409, "DUPLICATE_REQUEST");
        }

        await tx.rentalRequest.create({
          data: {
            bookId: bookFromDatabase.id,
            requesterId: session.user.id,
            ownerId: bookFromDatabase.ownerId,
          },
        });
      }
      return true;
    });

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
