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
    <div className="flex items-center gap-4 sm:gap-6 w-full p-4 bg-black border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-200 group relative">
      <div className="relative w-16 h-24 sm:w-20 sm:h-28 shrink-0 rounded-md overflow-hidden bg-zinc-900 border border-zinc-800">
        <Image
          src={props.cover || "/1.jpg"}
          alt={props.bookname}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 min-w-0 pr-8">
        <h3 className="text-lg font-semibold text-white line-clamp-1 mb-1">{props.bookname}</h3>
        <p className="text-sm text-zinc-400">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
            {props.bookType}
          </span>
        </p>
      </div>

      <button
        className="absolute top-4 right-4 sm:static sm:top-auto sm:right-auto p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-all cursor-pointer"
        onClick={handleRemoveFromCart}
        aria-label="Remove from cart"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default CardCart;
