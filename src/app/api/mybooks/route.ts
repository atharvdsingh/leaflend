import { prisma } from "@/util/Prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { handleApiError } from "@/util/HandleError";
import type { CreateBookType } from "@/app/types/databaseRoutesType";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId =  session?.user.id ;
  console.log(userId)

  const books = await prisma.booksHave.findMany({
    where: {
      ownerId: userId,
    },
  });

  return NextResponse.json({
    message: "all the books send",
    success: true,
    books,
    userId
  });
}

export async function POST(request: Request) {
try {
    const body:CreateBookType = await request.json();
    const session = await getServerSession(authOptions);
    if(!session?.user?.id){
      return NextResponse.json({
          message:"User is not logged in ",
          success:false,
          
      },{status:401})
    }
    
    const userId = Number(session?.user.id);
    const response = await prisma.booksHave.create({
      data: {
        bookname: body.bookname,
        cover: body.cover,
        status: "AVAILABLE",
        ownerId: userId,
        // author:body.author
      },
    });
    if (!response) {
      return NextResponse.json({
        message: "books is not created",
        success: false,
      });
    } else {
      return NextResponse.json({
        message: "books is created ",
        success: true,
      });
    }
} catch (error: unknown) {
    // 👇 safest way to handle any kind of error
    if (error instanceof Error) {
      console.error("Server Error:", error.message);
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 500 }
      );
    }

    console.error("Unknown Error:", error);
    return handleApiError(error)
  }
}