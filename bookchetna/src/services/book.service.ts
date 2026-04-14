import { prisma } from "@/util/Prisma";
import type { booksHave } from "@prisma/client";

/**
 * Fetch available books for browsing (excludes the current user's own books).
 */
export async function getAvailableBooks(
    page: number,
    roomId: number,
    excludeOwnerId?: number
): Promise<booksHave[]> {
    return prisma.booksHave.findMany({
        where: {
            ownerId: {
                not: excludeOwnerId,
            },
            room: {
                some: {
                    roomId: roomId,
                },
            },
        },
        skip: page * 8 - 8,
        take: 8,
    });
}

/**
 * Count available books (for pagination).
 */
export async function getAvailableBooksCount(
    roomId: number,
    excludeOwnerId?: number
): Promise<number> {
    return prisma.booksHave.count({
        where: {
            ownerId: {
                not: excludeOwnerId,
            },
            room: {
                some: {
                    roomId: roomId,
                },
            },
        },
    });
}

/**
 * Fetch books posted by a specific user.
 */
export async function getMyPostedBooks(
    userId: number,
    roomId?: number
): Promise<booksHave[]> {
    return prisma.booksHave.findMany({
        where: {
            ownerId: userId,
            ...(roomId && {
                room: { some: { roomId: roomId } },
            }),
        },
    });
}
