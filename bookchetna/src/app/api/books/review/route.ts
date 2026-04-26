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

        const { bookId, rating, comment } = await req.json();

        if (!bookId || !rating || !comment) {
            throw new AppError("bookId, rating, and comment are required", 400);
        }

        // Validate the user has actually rented this book before (can be ACTIVE or RETURNED)
        const hasRented = await prisma.borrows.findFirst({
            where: {
                bookId: Number(bookId),
                borrowerId: session.user.id
            }
        });

        if (!hasRented) {
            throw new AppError("You can only review books you have actually rented", 403);
        }

        // Prevent multiple reviews on the same book
        const existingReview = await prisma.review.findFirst({
            where: {
                bookId: Number(bookId),
                userId: session.user.id
            }
        });

        if (existingReview) {
            throw new AppError("You have already reviewed this book", 409, "DUPLICATE_REVIEW");
        }

        // Create the review
        const newReview = await prisma.review.create({
            data: {
                rating: Number(rating),
                comment,
                bookId: Number(bookId),
                userId: session.user.id
            }
        });

        return NextResponse.json({ message: "Review posted successfully!", success: true, data: newReview }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
