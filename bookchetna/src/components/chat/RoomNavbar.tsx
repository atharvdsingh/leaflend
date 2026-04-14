import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";

export default function RoomNavbar({
  roomId,
  roomName,
  member,
}: {
  roomId: string;
  roomName?: string;
  member?: number;
}) {
  return (
    <div className="relative m-3 border-b border-border p-5 flex justify-between items-center">
      <div className="flex gap-2">
        <div className="flex gap-3 items-center " >
          {/* <Button asChild>
            <Link className=" sm:flex hidden "  href={`/home?page=1&room=${roomId}`}>
              <ArrowLeft /> back
            </Link>
          </Button> */}
          <div className="flex gap-2 ">
        
            <MessageCircle />
            Group Chat
          </div>
        </div>
        <h1>{roomName}</h1>
      </div>
      <div className="flex gap-2">members</div>
    </div>
  );
}
