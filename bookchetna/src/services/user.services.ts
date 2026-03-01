import { api } from "@/lib/axios";

/**
 * Fetch the currently authenticated user's ID (GET /user).
 */
export async function fetchCurrentUser() {
    const res = await api.get("/user");
    return res.data;
}
