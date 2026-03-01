import { prisma } from "@/util/Prisma";
import type { RentalRequestCartType, RequestedBooksForApprovel } from "@/types/databaseRoutesType";

/**
 * Fetch rental requests made by a user (books they rented).
 */
export async function getMyRentedBooks(
    userId: number,
    roomId?: number
): Promise<RentalRequestCartType[]> {
    return prisma.rentalRequest.findMany({
        where: {
            requesterId: userId,
            ...(roomId && {
                book: { room: { some: { roomId: roomId } } },
            }),
        },
        include: {
            book: {
                select: {
                    bookname: true,
                    cover: true,
                },
            },
            owner: {
                select: {
                    name: true,
                },
            },
        },
    }) as Promise<RentalRequestCartType[]>;
}

/**
 * Fetch rental requests for a book owner to approve/reject.
 */
export async function getRentalRequestsForApproval(
    ownerId: number,
    roomId?: number
): Promise<RequestedBooksForApprovel[]> {
    return prisma.rentalRequest.findMany({
        where: {
            ownerId: ownerId,
            ...(roomId && {
                book: { room: { some: { roomId: roomId } } },
            }),
        },
        include: {
            book: {
                select: {
                    bookname: true,
                    cover: true,
                },
            },
            requester: {
                select: {
                    name: true,
                },
            },
        },
    }) as Promise<RequestedBooksForApprovel[]>;
}
