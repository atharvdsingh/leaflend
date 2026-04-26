"use client";
import Image from "next/image";
import React from "react";
import type { RentalRequestCartType } from "@/types/databaseRoutesType";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

function RentalCart(props: RentalRequestCartType) {
  const searchParams = useSearchParams();
  const currentParams = searchParams.toString();
  const dmHref = `/chat/dm/${props.ownerId}${currentParams ? `?${currentParams}` : ""}`;
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
          <div className="mt-auto">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${props.status === "PENDING"
                ? "bg-muted border-border text-foreground/80"
                : props.status === "ACCEPTED"
                  ? "bg-green-500/10 border-green-500/20 text-green-500 font-semibold"
                  : "bg-red-500/10 border-red-500/20 text-red-500 font-semibold"
                }`}
            >
              {props.status.charAt(0) + props.status.slice(1).toLowerCase()}
            </span>
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
