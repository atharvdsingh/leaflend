import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import React from "react";

/**
 * RentedBookSkeleton
 * 
 * Skeleton loader that mimics the structure of RentalCart.
 */
function RentedBookSkeleton() {
  return (
    <div className="flex justify-center m-auto flex-col items-center gap-4 max-w-7xl w-full">
      {/* Render a few skeleton items */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="flex flex-col w-full gap-6 p-4 rounded-[6px]">
          <div className="flex items-center space-x-2 gap-4">
            {/* Image Skeleton */}
            <Skeleton className="shrink-0 w-20 h-20 rounded-md bg-muted" />

            <div className="flex-1 min-w-0 space-y-2">
              {/* Book Name Skeleton */}
              <Skeleton className="h-4 w-1/3 bg-muted" />
              {/* Owner Name Skeleton */}
              <Skeleton className="h-3 w-1/4 bg-muted" />
            </div>

            <div>
              {/* Status Skeleton */}
              <Skeleton className="h-4 w-16 bg-muted" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default RentedBookSkeleton;
