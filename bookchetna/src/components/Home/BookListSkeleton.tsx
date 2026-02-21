import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

/**
 * BookListSkeleton
 * 
 * Displays a grid of loading placeholders that match the size and layout 
 * of the actual HomeCard components.
 */
function BookListSkeleton() {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {/* Render 8 skeletons to match the default page size */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="max-w-64 w-full rounded-2xl bg-card border border-border overflow-hidden shadow-2xl">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-40 bg-muted" />

            <div className="p-2 space-y-2">
              {/* Title Skeleton */}
              <Skeleton className="h-4 w-3/4 bg-muted" />
              {/* Author Skeleton */}
              <Skeleton className="h-3 w-1/2 bg-muted" />
            </div>

            <div className="p-2">
              {/* Genre/Price Skeleton */}
              <div className="flex justify-between">
                <Skeleton className="h-3 w-1/4 bg-muted" />
                <Skeleton className="h-3 w-1/4 bg-muted" />
              </div>
            </div>

            <div className="p-2 grid grid-cols-2 gap-1.5">
              {/* Footer Buttons Skeleton */}
              <Skeleton className="h-8 bg-muted" />
              <Skeleton className="h-8 bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookListSkeleton;
