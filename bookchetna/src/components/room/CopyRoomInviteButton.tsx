
"use client"
import copyToclipboad from "@/lib/copyToClipboard";
import { Copy } from "lucide-react";

export default function CopyRoomInviteButton({inviteCode}:{inviteCode:string}) {


const handleOneClick = ()=>{
    copyToclipboad({message:" Invite code copied successfully ",text:inviteCode})

}

  return (
    <div  onClick={handleOneClick}  className="bg-black/40 border border-zinc-800 rounded-lg px-3 py-1.5">
      <span className="text-white  flex  justify-center items-center cursor-pointer font-mono tracking-widest text-sm">
        {inviteCode}
        <Copy size={15} />
      </span>
    </div>
  );
}
