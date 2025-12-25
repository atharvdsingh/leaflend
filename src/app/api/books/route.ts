import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new AppError("User is not logged in", 401, "UNAUTHORIZED");
        }
        const books: booksHave[] = await prisma.booksHave.findMany();
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}