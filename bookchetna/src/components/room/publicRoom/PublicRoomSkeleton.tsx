import React from "react";
import AllPublicRoomCardSkeleton from "./SkeletonAllPublicRoomCard";

/**
 * PublicRoomSkeleton
 * 
 * Renders a list of skeleton cards for the public room page.
 * Reuses the existing 'AllPublicRoomCardSkeleton' component.
 */
function PublicRoomSkeleton() {
  return (
    <div className="flex gap-3 pt-20 mx-4 flex-col">
      {/* Show 5 skeletons while loading */}
      {Array.from({ length: 5 }).map((_, key) => (
        <AllPublicRoomCardSkeleton key={key} />
      ))}
    </div>
  );
}

export default PublicRoomSkeleton;
