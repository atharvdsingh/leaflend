import { api } from "@/lib/axios";
import type { SerializableBook } from "@/types/bookstypeforRedux";

/**
 * Create a new book (POST /mybooks) with FormData.
 */
export async function createBook(formdata: FormData) {
    const res = await api.post("/mybooks", formdata);
    return res;
}

/**
 * Delete a book by its ID (POST /mybooks/deletebook).
 */
export async function deleteMyBook(bookId: number) {
    const res = await api.post("/mybooks/deletebook", { id: bookId });
    return res;
}

/**
 * Toggle book visibility status (PUT /mybooks).
 */
export async function toggleMyBookVisibility(book: SerializableBook) {
    const res = await api.put("/mybooks", { book });
    return res;
}
