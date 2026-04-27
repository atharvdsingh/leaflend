import { prisma } from "@/util/Prisma";
import { AppError } from "@/util/AppError";
import { handleApiError } from "@/util/HandleError";

/**
 * Create a room and assign the user as ADMIN.
 */
export async function createRoom(
    roomName: string,
    description: string,
    userId: number,
    visibility: "SHOW" | "HIDE" = "SHOW"
) {
    const room = await prisma.$transaction(async (tx) => {
        const newRoom = await tx.room.create({
            data: {
                roomName: roomName,
                discription: description,
                visibility: visibility,
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

export async function deleteRoomById({

    roomId, memberId
}: {
    roomId: number, memberId: number
}
) {

    console.log(roomId)
    console.log(memberId)
    const user = await prisma.roomMembership.findFirst({
        where: {
            roomId: roomId,
            memberId: memberId

        }
    })
    if (!(user?.roomRole === "ADMIN")) {
        throw new AppError("only admin can delete the room", 403)
    }
    return await prisma.room.delete({
        where: {
            id: roomId
        }

    }
    )



}

export async function leaveRoomByRoomid({ roomId, userId }: { roomId: number, userId: number }) {
    const user = await prisma.roomMembership.findFirst({
        where: {
            roomId: roomId,
            memberId: userId
        }
    })
    if (!user) {
        throw new AppError("User does not belonges to room ", 403)
    }
    if (user.roomRole == "ADMIN") {
        throw new AppError("Admin can't leave its own room ", 403)
    }
    return await prisma.roomMembership.delete({
        where: {
            memberId_roomId: {
                roomId: roomId,
                memberId: userId
            }
        }
    })

}

export async function removeMemberFromRoom({ roomId, adminId, memberIdToRemove }: { roomId: number, adminId: number, memberIdToRemove: number }) {
    // Check if the requester is an ADMIN
    const requester = await prisma.roomMembership.findFirst({
        where: {
            roomId: roomId,
            memberId: adminId
        }
    });

    if (!requester || requester.roomRole !== "ADMIN") {
        throw new AppError("Only an admin can remove members", 403);
    }

    // Verify the member to remove actually exists in the room
    const memberToRemove = await prisma.roomMembership.findFirst({
        where: {
            roomId: roomId,
            memberId: memberIdToRemove
        }
    });

    if (!memberToRemove) {
        throw new AppError("User does not belong to the room", 404);
    }

    if (memberToRemove.roomRole === "ADMIN") {
        throw new AppError("Cannot remove an admin from the room", 403);
    }

    return await prisma.roomMembership.delete({
        where: {
            memberId_roomId: {
                roomId: roomId,
                memberId: memberIdToRemove
            }
        }
    });
}

/**
 * Toggle room visibility (SHOW <-> HIDE). Only admins can toggle.
 */
export async function toggleRoomVisibility(roomId: number, userId: number) {
    const membership = await prisma.roomMembership.findFirst({
        where: {
            roomId: roomId,
            memberId: userId,
        },
    });

    if (!membership || membership.roomRole !== "ADMIN") {
        throw new AppError("Only admin can change room visibility", 403);
    }

    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
        throw new AppError("Room not found", 404);
    }

    const newVisibility = room.visibility === "SHOW" ? "HIDE" : "SHOW";

    const updated = await prisma.room.update({
        where: { id: roomId },
        data: { visibility: newVisibility },
    });

    return updated;
}
