
"use client";
import copyToclipboad from "@/lib/copyToClipboard";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CopyRoomInviteButton({ inviteCode }: { inviteCode: string }) {
  const handleOneClick = () => {
    copyToclipboad({ message: " Invite code copied successfully ", text: inviteCode })
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div onClick={handleOneClick} className="bg-black/40 border border-zinc-800 rounded-lg px-3 py-1.5 hover:bg-zinc-800/50 transition-colors">
          <span className="text-white flex justify-center items-center cursor-pointer font-mono tracking-widest text-sm gap-2">
            {inviteCode}
            <Copy size={15} />
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-zinc-900  text-white">
        <p>Copy Invite Code</p>
      </TooltipContent>
    </Tooltip>
  );
}
