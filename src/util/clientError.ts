import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface ApiErrorResponse {
    success: boolean;
    message: string;
    code?: string;
}

export function handleClientError(error: unknown): string {
    let message = "Something went wrong. Please try again.";

    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response?.data?.message) {
            message = axiosError.response.data.message;
        } else if (axiosError.message) {
            message = axiosError.message;
        }
    } else if (error instanceof Error) {
        message = error.message;
    }

    toast.error(message);
    return message;
}
