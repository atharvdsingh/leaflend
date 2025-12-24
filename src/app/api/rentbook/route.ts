import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";

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
    console.log("hello there ");
    const booksId: number[] = await req.json();
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session?.user.id) {
            return NextResponse.json(
        {
          message: "Bad Request",
          success: false,
        },
        { status: 400 }
      );
    }
    console.log(booksId);
    if (booksId.length == 0) {
      return NextResponse.json(
        {
          message: "Zero book",
          success: false,
        },
        { status: 400 }
      );
    }
    console.log(session);

    const response = await prisma.$transaction(async (tx) => {
      for (const books of booksId) {
        console.log(books);
        const bookFromDatabase: booksHave | null =
          await tx.booksHave.findUnique({
            where: {
              id: books,
            },
          });

        if (!bookFromDatabase) {
                return NextResponse.json(
        {
          message: "Book is not available",
          success: false,
        },
        { status: 400 }
      );
        }
        if (bookFromDatabase.status != "AVAILABLE") {
                return NextResponse.json(
        {
          message: "Book is not available",
          success: false,
        },
        { status: 300 }
      );
        }

        const UserAlreadyRequestedForBook= await tx.rentalRequest.findFirst({
            where:{
                bookId:books,
                requesterId:session.user.id
            }
        })
        if(UserAlreadyRequestedForBook){
            return new ApiError(400,"already added in process")
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

    if (response) {
      return NextResponse.json(
        {
          message: "Order have Been Placed",
          success: true,
        },
        {
          status: 200,
        }
      );
    }
          return NextResponse.json(
        {
          message: "Something went wrong",
          success: false,
        },
        { status: 500 }
      );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "some thing went wrong while deleting books",
      error,
    });
  }
}
