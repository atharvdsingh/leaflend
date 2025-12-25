import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { AppError } from "@/util/AppError";
import { handleApiError } from "@/util/HandleError";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
        }
        const userId = session.user.id;
        return NextResponse.json({ userId }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}