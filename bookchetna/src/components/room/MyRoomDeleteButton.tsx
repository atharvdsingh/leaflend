"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Cross, CrossIcon, Trash2, X } from "lucide-react";
import { handleClientError } from "@/util/clientError";
import { toast } from "sonner";
import { deleteMyRoomById } from "@/actions/RoomService";



export default function MyRoomDeleteButton({ roomId, userId }: {
  roomId: number, userId: number
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const handleRoomdelete = async () => {
    try {
      setLoading(true)
      console.log("userid", userId)
      console.log("roomid", roomId)
      const data = await deleteMyRoomById(roomId, userId)
      if (data) {
        toast.success("room deleted successfully ")
        setOpen(false)
      }

    } catch (error) {
      handleClientError(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}  >
        <DialogTrigger asChild>
          <Button
            variant={"destructive"}
            className="rounded-lg cursor-pointer  flex-1 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            Delete Room
          </Button>
        </DialogTrigger>
        <DialogContent className=" border border-muted-foreground " >
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              By deleting your room yo&apos;ll loss your users and their books
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center">
            <DialogClose asChild>
              <Button variant={"default"}>
                <X />
                Cancle</Button>
            </DialogClose>
            <Button disabled={loading} onClick={handleRoomdelete} variant={"destructive"}>
              <Trash2 />
              Delete Room
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
