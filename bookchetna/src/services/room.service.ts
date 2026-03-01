import { prisma } from "@/util/Prisma";
import type { roomTypeForCardWithName } from "@/types/databaseRoutesType";

/**
 * Fetch public rooms visible to all users.
 */
export async function getPublicRooms(
    take: number = 8
): Promise<roomTypeForCardWithName[]> {
    return prisma.room.findMany({
        where: {
            visibility: "SHOW",
        },
        take,
        orderBy: {
            id: "desc",
        },
        include: {
            members: {
                include: {
                    member: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    }) as Promise<roomTypeForCardWithName[]>;
}

/**
 * Fetch rooms a user has joined (with ACTIVE status).
 */
export async function getUserRooms(userId: number) {
    return prisma.room.findMany({
        where: {
            members: {
                some: {
                    memberId: userId,
                    status: "ACTIVE",
                },
            },
        },
        include: {
            members: {
                where: { status: "ACTIVE" },
                include: { member: true },
            },
            books: true,
        },
    });
}
