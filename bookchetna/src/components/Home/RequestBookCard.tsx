"use client";
import React from 'react'
import type { RequestedBooksForApprovel } from '@/types/databaseRoutesType'
import RequestBookCardCancelAndAcceptedButton from './RequestBookCardCancelAndAcceptedButton'
import Image from 'next/image'
import { MessageCircle, FileDown } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

function RequestBookCard(props: RequestedBooksForApprovel) {
  const searchParams = useSearchParams();
  const currentParams = searchParams.toString();
  const dmHref = `/chat/dm/${props.requesterId}${currentParams ? `?${currentParams}` : ""}`;

  const handleDownloadInvoice = () => {
    const invoiceDate = new Date(props.createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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
              <div class="brand">BookChetna <span>Rental Income Receipt</span></div>
            </div>
            <div class="invoice-tag">PAID</div>
          </div>

          <div class="section">
            <div class="section-title">Transaction Details</div>
            <div class="row"><span class="label">Date</span><span class="value">${invoiceDate}</span></div>
            <div class="row"><span class="label">Payment ID</span><span class="value">${props.razorpayPaymentId || "N/A"}</span></div>
            <div class="row"><span class="label">Order ID</span><span class="value">${props.razorpayOrderId || "N/A"}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Rental Details</div>
            <div class="row"><span class="label">Book</span><span class="value">${props.book.bookname}</span></div>
            <div class="row"><span class="label">Rented By</span><span class="value">${props.requester.name || "N/A"}</span></div>
          </div>

          <div class="section">
            <div class="section-title">Payment Summary</div>
            <div class="row"><span class="label">Rental Fee</span><span class="value">₹${props.book.price || 0}</span></div>
            <div class="total-row">
              <span class="total-label">Amount Received</span>
              <span class="total-value">₹${props.book.price || 0}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for sharing your books on BookChetna!</p>
            <p style="margin-top: 4px;">This is a computer-generated receipt and does not require a signature.</p>
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

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full p-4 bg-card border border-border rounded-xl hover:border-border/80 hover:bg-muted/50 transition-all duration-200 group">
      <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
        {/* Cover */}
        <div className="relative w-16 h-24 sm:w-20 sm:h-28 shrink-0 rounded-md overflow-hidden bg-muted border border-border">
          <Image
            src={props.book.cover || "/1.jpg"}
            alt={props.book.bookname || "Cover"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1 mb-1">{props.book.bookname}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
            Requester: <span className="text-foreground/80">{props.requester.name}</span>
          </p>
          {props.book.price !== null && props.book.price !== undefined && (
            <p className="text-sm text-muted-foreground mb-3 -mt-2">
              Price: <span className="text-green-500/90 font-medium">₹{props.book.price}/week</span>
            </p>
          )}

          <div className="mt-auto flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${props.status === "PENDING"
              ? "bg-muted border-border text-foreground/80"
              : props.status === "ACCEPTED" || props.status === "PAID"
                ? "bg-green-500/10 border-green-500/20 text-green-500 font-semibold"
                : "bg-red-500/10 border-red-500/20 text-red-500 font-semibold"
              }`}
            >
              {props.status.charAt(0) + props.status.slice(1).toLowerCase()}
            </span>

            {props.status === "PAID" && (
              <Button
                onClick={handleDownloadInvoice}
                size="sm"
                variant="outline"
                className="h-7 text-xs"
              >
                <FileDown className="mr-1.5 h-3 w-3" />
                Invoice
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='flex sm:flex-col justify-end sm:justify-center items-center gap-2 mt-2 sm:mt-0 shrink-0 sm:pl-6 pt-4 sm:pt-0 '>
        {props.status === "PENDING" && (
          <RequestBookCardCancelAndAcceptedButton id={props.id} />
        )}
        <Link href={dmHref}>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={`Chat with ${props.requester.name}`} title="Message Requester">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default RequestBookCard

