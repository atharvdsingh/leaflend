import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { RemoveFromCart } from "@/store/features/cartSlice";
import type { SerializableBook } from "@/types/bookstypeforRedux";

function CardCart(props: SerializableBook) {
  const dispatcher = useDispatch();

  const handleRemoveFromCart = () => {
    dispatcher(RemoveFromCart(props));
  };

  return (
    <div className="flex items-center gap-4 sm:gap-6 w-full p-4 bg-card border border-border rounded-xl hover:border-border/80 hover:bg-muted/50 transition-all duration-200 group relative">
      <div className="relative w-16 h-24 sm:w-20 sm:h-28 shrink-0 rounded-md overflow-hidden bg-muted border border-border">
        <Image
          src={props.cover || "/1.jpg"}
          alt={props.bookname}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 min-w-0 pr-8">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1 mb-1">{props.bookname}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted border border-border text-foreground/80">
            {props.bookType}
          </span>
          {props.price !== null && props.price !== undefined && (
            <span className="text-sm font-semibold text-green-500/90">
              ₹{props.price}/week
            </span>
          )}
        </div>
      </div>

      <button
        className="absolute top-4 right-4 sm:static sm:top-auto sm:right-auto p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all cursor-pointer"
        onClick={handleRemoveFromCart}
        aria-label="Remove from cart"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default CardCart;
