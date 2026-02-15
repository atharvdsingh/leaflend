import React from "react";
import BookListSkeleton from "@/components/Home/BookListSkeleton";
import CenterComponent from "@/components/CenterComponent";
import HomeCardSkeleton from "@/components/Home/HomeCardSkeleton";

/**
 * Loading
 * 
 * Route-level loading state for /home.
 * Shows the full page skeleton while the route segment is loading.
 */
export default function Loading() {
  return (
    <CenterComponent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {
          Array.from({length:4}).map((_,index)=>(
            <HomeCardSkeleton key={index} />
          ))
        }
      </div>
    </CenterComponent>
  );
}
