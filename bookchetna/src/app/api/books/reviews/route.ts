import { NextResponse } from "next/server";
import { prisma } from "@/util/Prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const bookId = searchParams.get("bookId");

        if (!bookId) {
            return NextResponse.json({ success: false, message: "bookId is required" }, { status: 400 });
        }

        const reviews = await prisma.review.findMany({
            where: {
                bookId: Number(bookId)
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        // Also calculate average rating
        const avg = reviews.reduce((acc: number, curr: any) => acc + curr.rating, 0) / (reviews.length || 1);

        return NextResponse.json({
            success: true,
            data: reviews,
            average: reviews.length > 0 ? Number(avg.toFixed(1)) : 0
        }, { status: 200 });

    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
