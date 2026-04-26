import React from "react";
import { MessageCircle } from "lucide-react";
import JoinWithRoomId from "../JoinWithRoomId";

export default function RoomNavbar({
  roomId,
  roomName,
  member,
  inviteCode,
}: {
  roomId: string;
  roomName?: string;
  member?: number;
  inviteCode?: string;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
      {/* Left side: room info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground text-background">
          <MessageCircle size={16} />
        </div>
        <div>
          <h2 className="text-sm font-semibold leading-tight">
            {roomName || "Group Chat"}
          </h2>
          <p className="text-xs text-muted-foreground">
            Room · {roomId.slice(0, 8)}
          </p>
        </div>
      </div>

      {/* Right side: invite button */}
      <JoinWithRoomId roomId={roomId} roomName={roomName} />
    </div>
  );
}


