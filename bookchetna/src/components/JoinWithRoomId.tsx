"use client";
import React, { useState } from "react";
import { Copy, Check, Mail, Share2, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import copyToclipboad from "@/lib/copyToClipboard";

export default function JoinWithRoomId({ roomId, roomName }: { roomId: string | number, roomName?: string }) {
  const [copied, setCopied] = useState(false);
  const code = roomId ? String(roomId).slice(0, 6) : "------";

  const handleCopyCode = () => {
    copyToclipboad({ text: code, message: "Invite code copied!" });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyInviteText = () => {
    const text = `Join my room ${roomName ? `"${roomName}" ` : ""}on BookChetna!\nInvite Code: ${code}`;
    copyToclipboad({ text, message: "Invite text copied!" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 size={16} />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Invite Members</DialogTitle>
          <DialogDescription>
            Share this code with others to invite them to {roomName ? `"${roomName}"` : "your room"}
          </DialogDescription>
        </DialogHeader>

        {/* Invite code section */}
        <div className="space-y-3 pt-2">
          <label className="text-sm font-medium">Room Invite Code</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center justify-between bg-secondary/50 border border-border rounded-lg px-4 py-2.5">
              <span className="font-mono text-lg tracking-[0.3em] font-semibold">{code}</span>
              <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">6-digit</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="gap-1.5 h-[42px] px-4"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Anyone with this code can join your room
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* How to use */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">How to use</h3>
          <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
            <li>Copy the invite code above</li>
            <li>Share it with people you want to invite</li>
            <li>They can enter the code when joining a room</li>
          </ol>
        </div>

        {/* Footer */}
        <DialogFooter className="flex-row gap-2 sm:gap-2 pt-2">
          <Button
            variant="outline"
            onClick={handleCopyInviteText}
            className="flex-1 gap-2"
          >
            <Mail size={14} />
            Copy Invite Text
          </Button>
          <DialogClose asChild>
            <Button variant="default" className="flex-1">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
