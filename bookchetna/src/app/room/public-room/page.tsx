import CenterComponent from "@/components/CenterComponent";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AllPublicRoomCard from "@/components/room/publicRoom/AllPublicRoomCard";
import { prisma } from "@/util/Prisma";
import type { Prisma } from "@prisma/client";
import PublickRoomWrapper from "@/components/room/publicRoom/PublickRoomWrapper";
import type { roomTypeForCardWithName } from "@/types/databaseRoutesType";
import PublicRoomList from "@/components/room/publicRoom/PublicRoomList";
import PublicRoomSkeleton from "@/components/room/publicRoom/PublicRoomSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Reading Rooms | BookChetna",
  description: "Browse public reading rooms in your area. Join rooms to borrow books or share your own collection with neighbors.",
  keywords: ["public reading rooms", "book clubs", "local book sharing", "rent books locally"],
};

// Moved type to @/types/databaseRoutesType.ts to avoid circular deps
// export type roomTypeForCardWithName = Prisma.roomGetPayload<{ ... }>

async function Page() {
  const session = await getServerSession(authOptions);

  // ---------------------------------------------------------------------------
  // OLD CODE (Moved to PublicRoomList.tsx for Granular Loading / Suspense)
  // ---------------------------------------------------------------------------
  /*
  const rooms: roomTypeForCardWithName[] = await prisma.room.findMany({
    where: {
      visibility: "SHOW",
    },
    take: 8,
    orderBy: {
      id: "desc",
    },
    include: {
      members: {
        include: {
          member: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  console.log(rooms);
 
  return (
    <>
      <CenterComponent className="">
        <div className="max-w-7xl m-auto">
          <PublickRoomWrapper userId={session.user.id} rooms={rooms} />
        </div>
      </CenterComponent>
    </>
  );
  */

  // New Route-Level Loading implementation
  // PublicRoomList (Async Component) + loading.tsx
  return (
    <PublicRoomList />
  );
}

export default Page;
