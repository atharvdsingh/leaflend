
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
        <div onClick={handleOneClick} className="bg-card/40 border border-border rounded-lg px-3 py-1.5 hover:bg-muted/50 transition-colors">
          <span className="text-foreground flex justify-center items-center cursor-pointer font-mono tracking-widest text-sm gap-2">
            {inviteCode}
            <Copy size={15} />
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-popover-foreground text-popover">
        <p>Copy Invite Code</p>
      </TooltipContent>
    </Tooltip>
  );
}
