import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/util/Prisma";
import { sendEmail } from "@/lib/email";
import PaymentInvoice from "@/emails/PaymentInvoice";

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, requestId } = await req.json();

        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(text)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }

        // Update the request status
        const updatedRequest = await prisma.rentalRequest.update({
            where: { id: requestId },
            data: {
                status: "PAID",
                razorpayPaymentId: razorpay_payment_id
            },
            include: { book: true }
        });

        // Create the active borrow record
        await prisma.borrows.create({
            data: {
                bookId: updatedRequest.bookId,
                borrowerId: updatedRequest.requesterId,
                ownerId: updatedRequest.ownerId,
                status: "ACTIVE",
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14-day rental
            }
        });

        // Also change the book status to BORROWED
        await prisma.booksHave.update({
            where: { id: updatedRequest.bookId },
            data: { status: "BORROWED" }
        });

        // Fire-and-forget invoice email to the borrower
        const borrower = await prisma.users.findUnique({
            where: { id: updatedRequest.requesterId },
            select: { email: true },
        });

        if (borrower?.email) {
            sendEmail({
                to: borrower.email,
                subject: `Payment Receipt — ${updatedRequest.book.bookname}`,
                react: PaymentInvoice({
                    bookName: updatedRequest.book.bookname,
                    amount: updatedRequest.book.price || 0,
                    paymentId: razorpay_payment_id,
                    rentalDays: 14,
                    date: new Date().toLocaleDateString("en-IN"),
                }),
            });
        }

        return NextResponse.json({ message: "Payment verified completely" }, { status: 200 });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
    }
}
