import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/util/Prisma";
import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { cloudinaryServies } from "@/util/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { createBookSchema } from "@/schema/books.schema";
import { GetTheSession } from "@/util/GetTheSession";
import { ApiError } from "next/dist/server/api-utils";
import { log } from "node:console";
import type { SerializableBook } from "@/types/bookstypeforRedux";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }
    const formdata = await req.formData()
    console.log(formdata)

    const rawData = {
      bookname: formdata.get("bookname"),
      author: formdata.get("author"),
      price: Number(formdata.get("price")),
      bookType: formdata.get("bookType"),
      cover: formdata.get("cover"),
      roomId:formdata.get("roomId")
    }
    console.log(rawData)
    const parsedFormData = createBookSchema.parse(rawData)

    // const uploadResult:UploadApiResponse = await cloudinaryServies
    //   .getCloudinaryInstace()
    //   .uploadImage(parsedFormData.cover) as UploadApiResponse



    // const uploadResult: UploadApiResponse = await instance.uploadImage(parsedFormData.cover) as UploadApiResponse
    // console.log(uploadResult)



    const newBook = await prisma.booksHave.create({
      data: {
        bookname: parsedFormData.bookname,
        author: parsedFormData.author, // Schema missing author
        bookType: parsedFormData.bookType, // Schema uses bookType enum, needs mapping
        // price: Number(formdata.get("price")), // Schema missing price
        ownerId: session.user.id,
        status: "AVAILABLE",
        cover:"",
        // cover: uploadResult.secure_url, // Schema uses 'cover'
      },
    });

    // Link book to room if roomId provided
    const roomId = formdata.get("roomId");
    if (roomId) {
      await prisma.roomAndBook.create({
        data: {
          bookId: newBook.id,
          roomId: Number(roomId)
        }
      });
    }

    return NextResponse.json(newBook, { status: 200 })
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {

    const data = await req.json()
    const session = await GetTheSession()
    if (!session) throw new AppError("user id not authenticated", 400)
    if (!data.book.id) throw new AppError("book id is not given", 400)
    console.log(data)

    const res = await prisma.booksHave.update({
      where: {
        id: data.book.id
      },
      data: {
        visibilityStatus: showVisiblelity(data.book.visibilityStatus)
      }
    })
    if (!res) {
      throw new AppError("SOMETHING WENT WRONG", 500)
    }
    return NextResponse.json({
      message: "statuc changed",
      status: 200
    })
  } catch (error) {
    handleApiError(error)

  }
}


const showVisiblelity = (currentStatus: SerializableBook["visibilityStatus"]): SerializableBook["visibilityStatus"] => {

  if (currentStatus == "HIDE") {
    return "SHOW"
  }
  return "HIDE"
}
