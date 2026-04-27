"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Crown,
  Trash2,
  ArrowRight,
  Delete,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CopyRoomInviteButton from "./CopyRoomInviteButton";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import MyRoomDeleteButton from "./MyRoomDeleteButton";
import LeaveRoom from "./LeaveRoom";
import RemoveMemberButton from "./RemoveMemberButton";
import { toggleRoomVisibility } from "@/services/room.services";
import { toast } from "sonner";
import { handleClientError } from "@/util/clientError";

interface RoomCardProps {
  room: any;
  isAdmin?: boolean;
  userId?: number
}

export function RoomCard({ room, isAdmin = false, userId }: RoomCardProps) {
  // Mock data for missing fields as requested
  const mockDate = "2/18/2026";
  const inviteCode = room.id.toString().padStart(6, "0");

  const memberCount = room.members.length;
  const adminMember = room.members.find((m: any) => m.roomRole === "ADMIN");

  const [visibility, setVisibility] = useState<"SHOW" | "HIDE">(room.visibility || "SHOW");
  const [toggling, setToggling] = useState(false);

  async function handleToggleVisibility() {
    try {
      setToggling(true);
      const res = await toggleRoomVisibility(room.id);
      if (res.status === 200) {
        const newVisibility = res.data.data.visibility;
        setVisibility(newVisibility);
        toast.success(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      handleClientError(error);
    } finally {
      setToggling(false);
    }
  }

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
        {/* Members */}
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between group/row cursor-pointer hover:bg-muted/40 p-1.5 -mx-1.5 -mt-1.5 rounded-lg transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground group-hover/row:text-foreground transition-colors">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Members</span>
              </div>
              <div className="bg-muted/80 text-foreground/80 px-2.5 py-0.5 rounded-md text-sm font-mono min-w-[2rem] text-center border border-border/50 group-hover/row:border-border transition-colors">
                {memberCount}
              </div>
            </div>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Room Members</SheetTitle>
              <SheetDescription>
                People present in {room.roomName}
              </SheetDescription>
            </SheetHeader>
            <ul className="space-y-3 py-6 mt-2 list-none p-0 m-0">
              {room.members.map((m: any, index: number) => (
                <li
                  key={m.id}
                  className="group flex items-center justify-between p-3 rounded-2xl border border-border/40 bg-card hover:bg-muted/10 hover:border-border/80 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-right-8"
                  style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-11 h-11 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0 overflow-hidden shadow-inner bg-gradient-to-br from-primary/80 to-primary group-hover:scale-105 transition-transform duration-300">
                      <span className="relative z-10">{m.member?.name?.charAt(0).toUpperCase() || "?"}</span>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold tracking-tight text-foreground">{m.member?.name || "Unknown User"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center rounded-md bg-secondary/50 px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground capitalize">
                          {m.roomRole?.toLowerCase() || "member"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {m.memberId === userId ? (
                    <div className="shrink-0 pl-2">
                      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground ring-1 ring-inset ring-border/50 shadow-sm">
                        YOU
                      </span>
                    </div>
                  ) : isAdmin ? (
                    <div className="shrink-0 pl-2">
                      <RemoveMemberButton roomId={room.id} memberId={m.memberId} memberName={m.member?.name || "Unknown User"} />
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>

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

      {/* Visibility Toggle (Admin Only) */}
      {isAdmin && (
        <div className="mb-5">
          <button
            onClick={handleToggleVisibility}
            disabled={toggling}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2.5">
              {visibility === "SHOW" ? (
                <Globe className="w-4 h-4 text-green-500" />
              ) : (
                <Lock className="w-4 h-4 text-orange-500" />
              )}
              <span className="text-sm font-medium text-foreground">
                {visibility === "SHOW" ? "Public" : "Private"}
              </span>
            </div>
            <div
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${visibility === "SHOW" ? "bg-green-500" : "bg-muted-foreground/30"
                }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${visibility === "SHOW" ? "translate-x-5" : "translate-x-0.5"
                  }`}
              />
            </div>
          </button>
        </div>
      )}

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

        {

          isAdmin ? (<MyRoomDeleteButton userId={userId!} roomId={room.id} />) : (<LeaveRoom userId={userId!} roomId={room.id} />)
        }
      </div>
    </div>
  );
}
