import { prisma } from "@/util/Prisma";
import { createBookSchema } from "@/schema/books.schema";
import type { SerializableBook } from "@/types/bookstypeforRedux";

/**
 * Create a new book and optionally link it to a room.
 */
export async function createBook(formdata: FormData, ownerId: number) {
    const rawData = {
        bookname: formdata.get("bookname"),
        author: formdata.get("author"),
        price: Number(formdata.get("price")),
        bookType: formdata.get("bookType"),
        cover: formdata.get("cover"),
        roomId: Number(formdata.get("roomId")),
    };

    const parsedFormData = createBookSchema.parse(rawData);

    const newBook = await prisma.booksHave.create({
        data: {
            bookname: parsedFormData.bookname,
            author: parsedFormData.author,
            bookType: parsedFormData.bookType,
            ownerId: ownerId,
            status: "AVAILABLE",
            cover: "",
        },
    });

    // Link book to room if roomId provided
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

/**
 * Toggle the visibility status of a book.
 */
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

/**
 * Delete a book owned by the given user.
 */
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
