import React from "react";
import Link from "next/link";
import {
    Users,
    Calendar,
    Crown,
    Trash2,
    ArrowRight,
    Delete,
    Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CopyRoomInviteButton from "./CopyRoomInviteButton";

interface RoomCardProps {
    room: any;
    isAdmin?: boolean;
}

export function RoomCard({ room, isAdmin = false }: RoomCardProps) {
    // Mock data for missing fields as requested
    const mockDate = "2/18/2026";
    const inviteCode = room.id.toString().padStart(6, '0');

    const memberCount = room.members.length;
    const adminMember = room.members.find((m: any) => m.roomRole === "ADMIN");

    return (
        <div className="w-full max-w-sm bg-[#09090b] border border-zinc-800/50 rounded-2xl p-5 relative group hover:border-zinc-700/50 transition-colors shadow-2xl shadow-black/40">
            {/* Top Section: Icon & Title */}
            <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center shrink-0">
                    {isAdmin ? (
                        <Crown className="w-5 h-5 text-white" />
                    ) : (
                        <Users className="w-5 h-5 text-zinc-400" />
                    )}
                </div>

                <div className="flex flex-col items-start gap-1.5">
                    <h3 className="text-lg font-medium text-white leading-none">
                        {room.roomName}
                    </h3>
                    {isAdmin ? (
                        <Badge className="bg-white text-black hover:bg-white/90 rounded-md px-2 py-0.5 text-[10px] font-bold border-0 h-5">
                            Creator
                        </Badge>
                    ) : (
                        <span className="text-xs text-zinc-500">
                            by {adminMember?.member.name || "Unknown"}
                        </span>
                    )}
                </div>
            </div>

            {/* Info Rows */}
            <div className="space-y-3 mb-5">
                {/* Members */}
                <div className="flex items-center justify-between group/row">
                    <div className="flex items-center gap-2 text-zinc-500 group-hover/row:text-zinc-400 transition-colors">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Members</span>
                    </div>
                    <div className="bg-zinc-900/80 text-zinc-300 px-2.5 py-0.5 rounded-md text-sm font-mono min-w-[2rem] text-center border border-zinc-800/50">
                        {memberCount}
                    </div>
                </div>

                {/* Created Date */}
                <div className="flex items-center justify-between group/row">
                    <div className="flex items-center gap-2 text-zinc-500 group-hover/row:text-zinc-400 transition-colors">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Created</span>
                    </div>
                    <span className="text-zinc-300 font-mono text-sm">{mockDate}</span>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-800/60 w-full mb-5" />

            {/* Invite Code (Admin Only) or Role Info */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-zinc-500 text-sm font-medium">
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

                {isAdmin && (
                    <Button
                    variant={"destructive"}
                    className="rounded-lg cursor-pointer text-black flex-1 transition-all">


                         <Trash2 className="w-5 h-5" />
                        Delete Room
                    </Button>
                )}
            </div>
        </div>
    );
}
