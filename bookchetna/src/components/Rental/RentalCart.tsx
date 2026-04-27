"use client";
import Image from "next/image";
import React, { useState } from "react";
import type { RentalRequestCartType } from "@/types/databaseRoutesType";
import { MessageCircle, FileDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

function RentalCart(props: RentalRequestCartType) {
  const searchParams = useSearchParams();
  const currentParams = searchParams.toString();
  const dmHref = `/chat/dm/${props.ownerId}${currentParams ? `?${currentParams}` : ""}`;

  const [isReturning, setIsReturning] = useState(false);

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const activeBorrow = props.book.borrows?.[0]; // Uses the array directly if it exists

  function formatTimeLeft(dateInput: Date | string | null) {
    if (!dateInput) return "";
    const now = new Date();
    const diff = new Date(dateInput).getTime() - now.getTime();
    const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
    const isOverdue = diff < 0;
    if (days === 0) return isOverdue ? "Overdue today" : "Due today";
    return isOverdue ? `Overdue by ${days} day${days > 1 ? 's' : ''}` : `${days} day${days > 1 ? 's' : ''} left`;
  }

  const handleReturn = async () => {
    if (!activeBorrow) return;
    try {
      setIsReturning(true);
      const res = await fetch("/api/rentbook/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowId: activeBorrow.id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Book returned successfully!");
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to return book");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsReturning(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!newComment.trim()) {
      toast.error("Please add a comment");
      return;
    }
    setIsSubmittingReview(true);
    try {
      const res = await fetch("/api/books/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: props.bookId,
          rating: newRating,
          comment: newComment,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Review posted successfully!");
        setIsReviewOpen(false);
        setNewComment("");
        setNewRating(5);
      } else {
        toast.error(data.message || "Failed to post review");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleDownloadInvoice = () => {
    const invoiceDate = new Date(props.createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const dueDate = activeBorrow?.dueDate
      ? new Date(activeBorrow.dueDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      : "N/A";
    const startDate = activeBorrow?.startDate
      ? new Date(activeBorrow.startDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      : invoiceDate;

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${props.book.bookname}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111827; padding: 40px; }
          .invoice { max-width: 600px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
          .brand { font-size: 24px; font-weight: 700; }
          .brand span { color: #6b7280; font-weight: 400; font-size: 14px; display: block; margin-top: 4px; }
          .invoice-tag { background: #f0fdf4; color: #16a34a; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; border: 1px solid #bbf7d0; }
          .section { margin-bottom: 24px; }
          .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin-bottom: 8px; font-weight: 600; }
          .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
          .row:last-child { border-bottom: none; }
          .label { color: #6b7280; font-size: 14px; }
          .value { font-weight: 500; font-size: 14px; text-align: right; }
          .total-row { display: flex; justify-content: space-between; padding: 16px 0; border-top: 2px solid #111827; margin-top: 8px; }
          .total-label { font-size: 16px; font-weight: 700; }
          .total-value { font-size: 20px; font-weight: 700; color: #16a34a; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 12px; }
          @media print {
            body { padding: 20px; }
            @page { margin: 20mm; }
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <div>
              <div class="brand">BookChetna <span>Book Rental Invoice</span></div>
            </div>
            <div class="invoice-tag">PAID</div>
          </div>

          <div class="section">
            <div class="section-title">Invoice Details</div>
            <div class="row"><span class="label">Invoice Date</span><span class="value">${invoiceDate}</span></div>
            <div class="row"><span class="label">Payment ID</span><span class="value">${props.razorpayPaymentId || "N/A"}</span></div>
            <div class="row"><span class="label">Order ID</span><span class="value">${props.razorpayOrderId || "N/A"}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Rental Details</div>
            <div class="row"><span class="label">Book</span><span class="value">${props.book.bookname}</span></div>
            <div class="row"><span class="label">Owner</span><span class="value">${props.owner.name || "N/A"}</span></div>
            <div class="row"><span class="label">Rental Start</span><span class="value">${startDate}</span></div>
            <div class="row"><span class="label">Due Date</span><span class="value">${dueDate}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Payment Summary</div>
            <div class="row"><span class="label">Rental Fee</span><span class="value">₹${props.book.price || 0}</span></div>
            <div class="total-row">
              <span class="total-label">Total Paid</span>
              <span class="total-value">₹${props.book.price || 0}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for using BookChetna!</p>
            <p style="margin-top: 4px;">This is a computer-generated invoice and does not require a signature.</p>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
    } else {
      toast.error("Please allow popups to download the invoice");
    }
  };

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
          <div className="mt-auto flex items-center gap-3 flex-wrap">
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

            {props.status === "ACCEPTED" && !activeBorrow && (
              <Button
                onClick={handlePayment}
                size="sm"
                className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Pay Now
              </Button>
            )}

            {props.status === "PAID" && activeBorrow && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-xs font-semibold ${activeBorrow.dueDate && new Date(activeBorrow.dueDate).getTime() < Date.now() ? "text-red-500" : "text-yellow-600"}`}>
                  {formatTimeLeft(activeBorrow.dueDate)}
                </span>
                <Button
                  onClick={handleReturn}
                  disabled={isReturning}
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                >
                  {isReturning ? "Returning..." : "Return Book"}
                </Button>

                <Button
                  onClick={handleDownloadInvoice}
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                >
                  <FileDown className="mr-1.5 h-3 w-3" />
                  Invoice
                </Button>

                <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs bg-muted/30"
                    >
                      <Star className="mr-1.5 h-3 w-3 text-yellow-500" />
                      Write Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-card border-border">
                    <DialogHeader>
                      <DialogTitle>Write a Review for {props.book.bookname}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            onClick={() => setNewRating(star)}
                            className={`h-6 w-6 cursor-pointer ${star <= newRating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                      <Textarea
                        placeholder="What did you think of the book?"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="h-24 resize-none text-sm"
                      />
                      <div className="flex justify-end pt-2">
                        <Button disabled={isSubmittingReview} onClick={handleSubmitReview}>
                          {isSubmittingReview ? "Posting..." : "Post Review"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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
