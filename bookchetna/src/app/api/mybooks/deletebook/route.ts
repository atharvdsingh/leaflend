import { handleApiError } from "@/util/HandleError";
import { AppError } from "@/util/AppError";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { deleteBook } from "@/services/mybook.server.service";

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

        const deleted = await deleteBook(body.id, session.user.id);

        return NextResponse.json({data:deleted}, { status: 200 });

    } catch (error) {
        return handleApiError(error);
    }
}