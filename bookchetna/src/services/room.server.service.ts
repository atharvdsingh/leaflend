import { prisma } from "@/util/Prisma";
import { AppError } from "@/util/AppError";

/**
 * Create a room and assign the user as ADMIN.
 */
export async function createRoom(
    roomName: string,
    description: string,
    userId: number
) {
    const room = await prisma.$transaction(async (tx) => {
        const newRoom = await tx.room.create({
            data: {
                roomName: roomName,
                discription: description,
            },
        });

        await tx.roomMembership.create({
            data: {
                memberId: userId,
                roomId: newRoom.id,
                roomRole: "ADMIN",
            },
        });

        return newRoom;
    });

    if (!room) {
        throw new AppError("Something went wrong", 500);
    }

    return room;
}

/**
 * Join a room by roomId.
 */
export async function joinRoom(roomId: number, userId: number) {
    const membership = await prisma.roomMembership.create({
        data: {
            memberId: userId,
            roomId: roomId,
        },
    });

    if (!membership) {
        throw new AppError("Something went wrong", 500);
    }

    return membership;
}

/**
 * Get all rooms the user is a member of.
 */
export async function getMyRooms(userId: number) {
    const rooms = await prisma.room.findMany({
        where: {
            members: {
                some: {
                    memberId: userId,
                },
            },
        },
    });

    return rooms;
}

/**
 * Get public rooms with pagination plus member info.
 */
export async function getPublicRooms(offset: number, limit: number) {
    const rooms = await prisma.room.findMany({
        where: {
            visibility: "SHOW",
        },
        skip: offset,
        take: limit,
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
    });

    return rooms;
}

/**
 * Join a public room by roomId.
 */
export async function joinPublicRoom(roomId: number, userId: number) {
    const membership = await prisma.roomMembership.create({
        data: {
            memberId: userId,
            roomId: roomId,
        },
    });

    if (!membership) {
        throw new AppError("Something went wrong", 500);
    }

    return membership;
}
