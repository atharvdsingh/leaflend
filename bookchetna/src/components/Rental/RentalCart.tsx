import Image from "next/image";
import React from "react";
import type { RentalRequestCartType } from "@/types/databaseRoutesType";

function RentalCart(props: RentalRequestCartType) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 w-full p-4 bg-black border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-200 group">
      {/* Book Cover */}
      <div className="relative w-16 h-24 sm:w-20 sm:h-28 shrink-0 rounded-md overflow-hidden bg-zinc-900 border border-zinc-800">
        <Image
          src={props.book.cover || "/1.jpg"}
          alt={props.book.bookname || "Book Cover"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
        <h3 className="text-lg font-semibold text-white line-clamp-1 mb-1">
          {props.book.bookname}
        </h3>
        <p className="text-sm text-zinc-400 mb-3">
          Owner: <span className="text-zinc-300">{props.owner.name}</span>
        </p>

        {/* Status Badge */}
        <div className="mt-auto">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${props.status === "PENDING"
                ? "bg-zinc-900 border-zinc-700 text-zinc-300"
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
  );
}

export default RentalCart;
