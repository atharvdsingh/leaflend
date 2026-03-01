import { prisma } from "@/util/Prisma";
import { AppError } from "@/util/AppError";

/**
 * Create rental requests for a list of book IDs.
 */
export async function createRentalRequests(
    booksId: number[],
    userId: number
) {
    await prisma.$transaction(async (tx) => {
        for (const bookId of booksId) {
            const bookFromDatabase = await tx.booksHave.findUnique({
                where: { id: bookId },
                include: { room: true },
            });

            if (!bookFromDatabase) {
                throw new AppError("Book not Available", 404, "BOOK_NOT_FOUND");
            }

            // Validate room membership
            const bookRoomIds = bookFromDatabase.room.map((r) => r.roomId);
            if (bookRoomIds.length > 0) {
                const userMembership = await tx.roomMembership.findFirst({
                    where: {
                        memberId: userId,
                        roomId: { in: bookRoomIds },
                        status: "ACTIVE",
                    },
                });
                if (!userMembership) {
                    throw new AppError(
                        "You must join the room to rent this book",
                        403,
                        "NOT_ROOM_MEMBER"
                    );
                }
            }

            if (bookFromDatabase.status != "AVAILABLE") {
                throw new AppError("Book not Available", 409, "BOOK_UNAVAILABLE");
            }

            if (bookFromDatabase.ownerId === userId) {
                throw new AppError(
                    "You cannot rent your own book",
                    400,
                    "INVALID_OPERATION"
                );
            }

            const alreadyRequested = await tx.rentalRequest.findFirst({
                where: {
                    bookId: bookId,
                    requesterId: userId,
                },
            });

            if (alreadyRequested) {
                throw new AppError(
                    "Already requested this book",
                    409,
                    "DUPLICATE_REQUEST"
                );
            }

            await tx.rentalRequest.create({
                data: {
                    bookId: bookFromDatabase.id,
                    requesterId: userId,
                    ownerId: bookFromDatabase.ownerId,
                },
            });

            tx.booksHave.update({
                where: { id: bookFromDatabase.id },
                data: { status: "RESERVED" },
            });
        }

        return true;
    });
}

/**
 * Accept (approve) a rental request by its ID.
 */
export async function acceptRentalRequest(requestId: number) {
    const res = await prisma.$transaction(async (tx) => {
        const updated = await tx.rentalRequest.update({
            where: { id: requestId },
            data: { status: "ACCEPTED" },
        });

        await tx.booksHave.update({
            where: { id: updated.bookId },
            data: { status: "BORROWED" },
        });

        if (!updated) {
            throw new AppError("Could not proceed", 500);
        }

        return updated;
    });

    return res;
}

/**
 * Reject a rental request by its ID.
 */
export async function rejectRentalRequest(requestId: number) {
    const res = await prisma.$transaction(async (tx) => {
        const updated = await tx.rentalRequest.update({
            where: { id: requestId },
            data: { status: "REJECTED" },
        });

        if (!updated) {
            throw new AppError("Error from database... try again later", 500);
        }

        return updated;
    });

    return res;
}
