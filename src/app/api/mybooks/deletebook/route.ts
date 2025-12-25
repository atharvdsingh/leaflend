import type { SerializableBook } from "@/app/types/bookstypeforRedux";
import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { prisma } from "@/util/Prisma";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import type { CreateBookType } from "@/app/types/databaseRoutesType";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user.id) {
            throw new AppError("User is not logged in", 401, "UNAUTHORIZED");
        }

        const body = await request.json();

        if (!body.id) {
            throw new AppError("Book ID is required", 400, "INVALID_INPUT");
        }

        const book = await prisma.booksHave.findUnique({
            where: { id: body.id },
        });

        if (!book) {
            throw new AppError("Book not found", 404, "BOOK_NOT_FOUND");
        }

        if (book.ownerId !== session.user.id) {
            throw new AppError("You are not authorized to delete this book", 403, "FORBIDDEN");
        }

        const respons = await prisma.booksHave.delete({
            where: {
                id: body.id,
            },
        });

        return NextResponse.json(respons, { status: 200 });

    } catch (error) {
        return handleApiError(error);
    }
}