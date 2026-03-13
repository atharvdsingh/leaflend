import React from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Crown,
  Trash2,
  ArrowRight,
  Delete,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CopyRoomInviteButton from "./CopyRoomInviteButton";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import MyRoomDeleteButton from "./MyRoomDeleteButton";

interface RoomCardProps {
  room: any;
  isAdmin?: boolean;
  userId?:number
}

export function RoomCard({ room, isAdmin = false ,userId }: RoomCardProps) {
  // Mock data for missing fields as requested
  const mockDate = "2/18/2026";
  const inviteCode = room.id.toString().padStart(6, "0");

  const memberCount = room.members.length;
  const adminMember = room.members.find((m: any) => m.roomRole === "ADMIN");

  return (
    <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-5 relative group hover:border-border/80 transition-colors shadow-2xl shadow-black/40">
      {/* Top Section: Icon & Title */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-muted/50 border border-border flex items-center justify-center shrink-0">
          {isAdmin ? (
            <Crown className="w-5 h-5 text-foreground" />
          ) : (
            <Users className="w-5 h-5 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-col items-start gap-1.5">
          <h3 className="text-lg font-medium text-foreground leading-none">
            {room.roomName}
          </h3>
          {isAdmin ? (
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-2 py-0.5 text-[10px] font-bold border-0 h-5">
              Creator
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground">
              by {adminMember?.member.name || "Unknown"}
            </span>
          )}
        </div>
      </div>

      {/* Info Rows */}
      <div className="space-y-3 mb-5">
        {/* Members */}
        <div className="flex items-center justify-between group/row">
          <div className="flex items-center gap-2 text-muted-foreground group-hover/row:text-muted-foreground/80 transition-colors">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Members</span>
          </div>
          <div className="bg-muted/80 text-foreground/80 px-2.5 py-0.5 rounded-md text-sm font-mono min-w-[2rem] text-center border border-border/50">
            {memberCount}
          </div>
        </div>

        {/* Created Date */}
        <div className="flex items-center justify-between group/row">
          <div className="flex items-center gap-2 text-muted-foreground group-hover/row:text-muted-foreground/80 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Created</span>
          </div>
          <span className="text-foreground/80 font-mono text-sm">
            {mockDate}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/60 w-full mb-5" />

      {/* Invite Code (Admin Only) or Role Info */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-muted-foreground text-sm font-medium">
          {isAdmin ? "Invite Code" : "Room ID"}
        </span>

        <CopyRoomInviteButton inviteCode={inviteCode} />
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-3">
        <Button
          asChild
          className=" flex-1 rounded-xl  text-sm f transition-all"
        >
          <Link href={`/home?room=${room.id}&page=1`}>
            <ArrowRight className="w-4 h-4 mr-2" />
            Enter Room
          </Link>
        </Button>

        {/* 
        here is the logic */} 
        {
          isAdmin && <MyRoomDeleteButton userId={userId!} roomId={room.roomId} />
        }
      </div>
    </div>
  );
}
