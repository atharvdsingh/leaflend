import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";

/**
 * Fetch all books. Optionally filter by roomId.
 */
export async function getBooks(roomId?: string | null): Promise<booksHave[]> {
    const books = await prisma.booksHave.findMany({
        where: roomId
            ? {
                room: { some: { roomId: Number(roomId) } },
            }
            : {},
    });
    return books;
}
