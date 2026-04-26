import { prisma } from "@/util/Prisma";
import { createBookSchema } from "@/schema/books.schema";
import type { SerializableBook } from "@/types/bookstypeforRedux";
import { cloudinaryServies } from "@/util/cloudinary";
import { UploadApiResponse } from "cloudinary";


export async function createBook(formdata: FormData, ownerId: number) {

    const rawData = {
        bookname: formdata.get("bookname"),
        author: formdata.get("author") || undefined,
        price: formdata.has("price") ? Number(formdata.get("price")) : undefined,
        bookType: formdata.get("bookType"),
        cover: formdata.get("cover"),
        roomId: formdata.has("roomId") ? Number(formdata.get("roomId")) : undefined,
    };

    const parsedFormData = createBookSchema.parse(rawData);

    const cover: UploadApiResponse = await cloudinaryServies.getCloudinaryInstace().uploadImage(parsedFormData.cover) as UploadApiResponse
    console.log("cover", cover)
    const newBook = await prisma.booksHave.create({
        data: {
            bookname: parsedFormData.bookname,
            author: parsedFormData.author,
            bookType: parsedFormData.bookType,
            price: parsedFormData.price,
            ownerId: ownerId,
            status: "AVAILABLE",
            cover: cover.secure_url,
        },
    });

    const roomId = formdata.get("roomId");
    if (roomId) {
        await prisma.roomAndBook.create({
            data: {
                bookId: newBook.id,
                roomId: Number(roomId),
            },
        });
    }

    return newBook;
}


export async function toggleBookVisibility(bookId: number) {
    const book = await prisma.booksHave.findUnique({ where: { id: bookId } });
    if (!book) return null;

    const newStatus: SerializableBook["visibilityStatus"] =
        book.visibilityStatus === "HIDE" ? "SHOW" : "HIDE";

    const updated = await prisma.booksHave.update({
        where: { id: bookId },
        data: { visibilityStatus: newStatus },
    });

    return updated;
}




export async function deleteBook(bookId: number, userId: number) {
    const book = await prisma.booksHave.findUnique({ where: { id: bookId } });
    console.log(book)

    if (!book) {
        throw new Error("Book not found");
    }

    if (book.ownerId !== userId) {
        throw new Error("You are not authorized to delete this book");
    }

    const deleted = await prisma.booksHave.delete({ where: { id: bookId } });
    return deleted;
}
