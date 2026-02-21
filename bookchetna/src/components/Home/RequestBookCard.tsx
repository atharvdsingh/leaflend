import React from 'react'
import type { RequestedBooksForApprovel } from '@/types/databaseRoutesType'
import RequestBookCardCancelAndAcceptedButton from './RequestBookCardCancelAndAcceptedButton'
import Image from 'next/image'

function RequestBookCard(props: RequestedBooksForApprovel) {
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

          <div className="mt-auto">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${props.status === "PENDING"
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

      {/* Action Buttons */}
      {props.status === "PENDING" && (
        <div className='flex sm:flex-col justify-end sm:justify-center items-center gap-2 mt-2 sm:mt-0 shrink-0 sm:border-l sm:border-border sm:pl-6 pt-4 sm:pt-0 border-t border-border/50'>
          <RequestBookCardCancelAndAcceptedButton id={props.id} />
        </div>
      )}
    </div>
  )
}

export default RequestBookCard
