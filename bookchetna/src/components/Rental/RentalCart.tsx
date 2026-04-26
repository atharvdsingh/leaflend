"use client";
import Image from "next/image";
import React from "react";
import type { RentalRequestCartType } from "@/types/databaseRoutesType";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

import { toast } from "sonner";

function RentalCart(props: RentalRequestCartType) {
  const searchParams = useSearchParams();
  const currentParams = searchParams.toString();
  const dmHref = `/chat/dm/${props.ownerId}${currentParams ? `?${currentParams}` : ""}`;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: props.id }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        toast.error(orderData.error || "Failed to create order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "BookChetna",
        description: `Rental payment for ${props.book.bookname}`,
        order_id: orderData.order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              requestId: props.id,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok) {
            toast.success("Payment successful!");
            window.location.reload();
          } else {
            toast.error(verifyData.error || "Payment verification failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong during payment");
    }
  };

  return (
    <div className="flex items-center gap-4 sm:gap-6 w-full p-4 bg-card border border-border rounded-xl hover:border-border/80 hover:bg-muted/50 transition-all duration-200 group">
      <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
        {/* Book Cover */}
        <div className="relative w-16 h-24 sm:w-20 sm:h-28 shrink-0 rounded-md overflow-hidden bg-muted border border-border">
          <Image
            src={props.book.cover || "/1.jpg"}
            alt={props.book.bookname || "Book Cover"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1 mb-1">
            {props.book.bookname}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Owner: <span className="text-foreground/80">{props.owner.name}</span>
          </p>
          {props.book.price !== null && props.book.price !== undefined && (
            <p className="text-sm text-muted-foreground mb-3 -mt-2">
              Price: <span className="text-green-500/90 font-medium">₹{props.book.price}/week</span>
            </p>
          )}

          {/* Status Badge */}
          <div className="mt-auto flex items-center gap-3">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${props.status === "PENDING"
                ? "bg-muted border-border text-foreground/80"
                : props.status === "ACCEPTED" || props.status === "PAID"
                  ? "bg-green-500/10 border-green-500/20 text-green-500 font-semibold"
                  : "bg-red-500/10 border-red-500/20 text-red-500 font-semibold"
                }`}
            >
              {props.status.charAt(0) + props.status.slice(1).toLowerCase()}
            </span>

            {props.status === "ACCEPTED" && (
              <Button
                onClick={handlePayment}
                size="sm"
                className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Pay Now
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="shrink-0 pl-2">
        <Link href={dmHref}>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={`Chat with ${props.owner.name}`} title="Message Owner">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RentalCart;
