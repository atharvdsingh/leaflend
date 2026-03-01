import { api } from "@/lib/axios";

/**
 * Submit rental requests for a list of book IDs (POST /rentbook).
 */
export async function createRentalRequest(booksId: number[]) {
    const res = await api.post("/rentbook", booksId);
    return res;
}

/**
 * Accept a rental request (PUT /rentbook).
 */
export async function acceptRentalRequest(id: number) {
    const res = await api.put("/rentbook", { id });
    return res;
}

/**
 * Reject / cancel a rental request (POST /rentbook/delete).
 */
export async function rejectRentalRequest(id: number) {
    const res = await api.post("/rentbook/delete", { id });
    return res;
}
