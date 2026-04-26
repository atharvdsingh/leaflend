import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/util/Prisma";
import { GetTheSession } from "@/util/GetTheSession";

export async function POST(req: Request) {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "",
        });

        const session = await GetTheSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { requestId } = await req.json();
        if (!requestId) {
            return NextResponse.json({ error: "Missing requestId" }, { status: 400 });
        }

        const request = await prisma.rentalRequest.findUnique({
            where: { id: requestId },
            include: { book: true }
        });

        if (!request || request.status !== "ACCEPTED") {
            return NextResponse.json({ error: "Invalid or unaccepted request" }, { status: 400 });
        }

        if (!request.book.price) {
            return NextResponse.json({ error: "Book does not have a price" }, { status: 400 });
        }

        const amountInPaise = request.book.price * 100;

        const orderOptions = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_order_${request.id}`,
        };

        const order = await razorpay.orders.create(orderOptions);

        await prisma.rentalRequest.update({
            where: { id: requestId },
            data: { razorpayOrderId: order.id }
        });

        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
