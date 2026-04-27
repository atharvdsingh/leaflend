import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
    to: string;
    subject: string;
    react: ReactElement;
}

/**
 * Fire-and-forget email sender.
 * Errors are logged but never thrown — API responses are unaffected.
 */
export function sendEmail({ to, subject, react }: SendEmailOptions) {
    resend.emails
        .send({
            from: "BookChetna <onboarding@resend.dev>",
            to,
            subject,
            react,
        })
        .then((result) => {
            if (result.error) {
                console.error("[Email] Failed to send:", result.error);
            } else {
                console.log("[Email] Sent successfully:", result.data?.id);
            }
        })
        .catch((err) => {
            console.error("[Email] Unexpected error:", err);
        });
}
