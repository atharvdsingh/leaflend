import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new AppError("User is not logged in", 401, "UNAUTHORIZED");
        }

        const { searchParams } = new URL(request.url);
        const roomId = searchParams.get("room");

        const books: booksHave[] = await prisma.booksHave.findMany({
            where: roomId ? {
                room: { some: { roomId: Number(roomId) } }
            } : {}
        });
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
} return NextResponse.json(books, { status: 200 });
    } catch (error) {
    return handleApiError(error);
}
}