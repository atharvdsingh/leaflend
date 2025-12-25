import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";
import { handleApiError } from "@/util/HandleError";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const _id = session?.user.id;
    if (!_id) {
      return NextResponse.json(
        {
          message: "user is not logged in",
        },
        { status: 401 }
      );
    }

    // const response = await prisma.borrowsBooks.findMany({
    //   where: {
    //     id: _id,
    //   },
    // });
    // return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: `error ${error} ` });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const booksId: number[] = await req.json();
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json(
        {
          message: "Bad Request",
          success: false,
        },
        { status: 400 }
      );
    }
    if (booksId.length == 0) {
      return NextResponse.json(
        {
          message: "Zero book",
          success: false,
        },
        { status: 400 }
      );
    }

try {
        await prisma.$transaction(async (tx) => {
          for (const books of booksId) {
            const error: {
              message: string;
              status: boolean;
              count: number;
            } = {
              message: "hehe",
              status: false,
              count: 0,
            };
            const bookFromDatabase: booksHave | null =
              await tx.booksHave.findUnique({
                where: {
                  id: books,
                },
              });
    
            if (!bookFromDatabase) {
              error.status = true;
              error.count++;
              throw new ApiError(400, "Book not Available");
            }
            console.log("asldkfjalskdfjlaskdjf");
            if (bookFromDatabase.status != "AVAILABLE") {
              error.status = true;
              throw new ApiError(400, "Book not Available");
            }
            console.log("asldkfjalskdfjlaskdjf");
    
            const UserAlreadyRequestedForBook = await tx.rentalRequest.findFirst({
              where: {
                bookId: books,
                requesterId: session.user.id,
              },
            });
            console.log("asldkfjalskdfjlaskdjf");
    
            if (UserAlreadyRequestedForBook) {
              console.log("already exit");
              console.log(UserAlreadyRequestedForBook);
              throw new ApiError(400, "already added in process");
            }
            console.log(UserAlreadyRequestedForBook);
            console.log("asldkfjalskdfjlaskdjf");
    
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
    throw new ApiError(500,"something went wrongyyyy")
    
}
  } catch (error) {
    console.log(error);
return NextResponse.json({message:"something went wrong",success:false},{status:500})
  }
}
