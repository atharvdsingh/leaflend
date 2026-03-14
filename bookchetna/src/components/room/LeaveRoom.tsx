"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent
} from "../ui/dialog";
import { LogOut, X } from "lucide-react";
import { LeaveRoomByRoomId } from "@/actions/RoomService";
import { toast } from "sonner";
import { handleClientError } from "@/util/clientError";
import { useRouter } from "next/navigation";
export default function LeaveRoom({
  roomId,
  userId,
}: {
  roomId: number;
  userId: number;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter()
  const handleLeaveRoom = async () => {
    try {
      setLoading(true);
      const res = await LeaveRoomByRoomId(roomId, userId);
      if (res) {
        setOpen(false);
        toast.success("Room Exited successfully");
        return router.refresh() 
      }
    } catch (error) {
      handleClientError(error);
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"destructive"}
            className="flex justify-between items-center"
            
          >
            <LogOut />
            Leave Room
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Room</DialogTitle>
            <DialogDescription>
              By leaving your room yo'll loose all of your books
            </DialogDescription>
          </DialogHeader>

          <DialogDescription className="flex items-center justify-between" >
              <DialogClose asChild >
                <Button variant={"outline"} >
                <X/> 
                    Cancel
                </Button>
              </DialogClose>
                <Button  onClick={handleLeaveRoom} > <LogOut/> Leave Room</Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
