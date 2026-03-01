import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PublickRoomWrapper from "@/components/room/publicRoom/PublickRoomWrapper";
import CenterComponent from "@/components/CenterComponent";
import { getPublicRooms } from "@/services/room.service";

/**
 * PublicRoomList (Server Component)
 * 
 * Handles fetching the initial list of public rooms.
 */
async function PublicRoomList() {
  const session = await getServerSession(authOptions);

  // Artificial delay for Suspense demo
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  const rooms = await getPublicRooms();

  return (
    <CenterComponent className="">
      <div className="max-w-7xl m-auto">
        <PublickRoomWrapper userId={Number(session?.user?.id) || 0} rooms={rooms} />
      </div>
    </CenterComponent>
  );
}

export default PublicRoomList;
