import { NextResponse } from "next/server";
import { prisma } from "@/util/Prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { AppError } from "@/util/AppError";
import { handleApiError } from "@/util/HandleError";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            throw new AppError("Unauthorized", 401);
        }

        const { borrowId } = await req.json();
        if (!borrowId) {
            throw new AppError("borrowId is missing", 400);
        }

        // Fetch the borrow record
        const borrowRecord = await prisma.borrows.findUnique({
            where: { id: borrowId },
        });

        if (!borrowRecord) {
            throw new AppError("Borrow record not found", 404);
        }

        if (borrowRecord.borrowerId !== session.user.id) {
            throw new AppError("You do not have permission to return this book", 403);
        }

        if (borrowRecord.status === "RETURNED") {
            throw new AppError("Book is already returned", 400);
        }

        // Transaction to update both borrow record and book status, and delete old RentalRequest
        await prisma.$transaction([
            prisma.borrows.update({
                where: { id: borrowId },
                data: {
                    status: "RETURNED",
                    returnDate: new Date(),
                },
            }),
            prisma.booksHave.update({
                where: { id: borrowRecord.bookId },
                data: {
                    status: "AVAILABLE",
                },
            }),
            prisma.rentalRequest.deleteMany({
                where: {
                    bookId: borrowRecord.bookId,
                    requesterId: session.user.id
                }
            })
        ]);

        return NextResponse.json({ message: "Book returned successfully", success: true }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
