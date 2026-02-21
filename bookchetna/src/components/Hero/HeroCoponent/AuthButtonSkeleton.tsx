import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

/**
 * AuthButtonSkeleton
 * 
 * This is a "Placeholder" or "Skeleton" component.
 * It is shown to the user while the server is checking the session (logging in).
 * 
 * WHY? 
 * Because it is synchronous, it renders instantly, preventing the "white screen" 
 * while the real session data is being fetched.
 */
function AuthButtonSkeleton() {
  return (
    <Skeleton className="flex gap-5 animate-pulse">
      {/* Pure UI placeholder - no logic allowed here */}
      <div className="bg-muted w-[180px] h-[40px] rounded-md opacity-20"></div>
    </Skeleton>
  );
}

export default AuthButtonSkeleton;
