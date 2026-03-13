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
import { Trash2 } from "lucide-react";
import { handleClientError } from "@/util/clientError";
import deleteMyRoomById from "@/actions/deleteMyRoom";
import { toast } from "sonner";




export default function MyRoomDeleteButton({roomId,userId}:{
    roomId:number,userId:number
}) {
    const [loading,setLoading]=useState<boolean>(false)
     const handleRoomdelete= async (roomId:number,userId:number)=>{
        try {
            setLoading(true)
            console.log("userid",userId)
            console.log("roomid",roomId)
            const data = await deleteMyRoomById(roomId,userId)
            if(data){
                toast.success("room deleted successfully ")
            }
            
        } catch (error) {
            handleClientError(error)
        }  finally{
            setLoading(false)
        }

     }

    return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"destructive"}
            className="rounded-lg cursor-pointer  flex-1 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            Delete Room
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Room</DialogTitle>
            <DialogDescription>
              By deleting your room yo&apos;ll loss your users and their books
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-between items-center">
            <DialogClose asChild>
              <Button variant={"default"}>cancle</Button>
            </DialogClose>
            <Button disabled={loading} onClick={()=>handleRoomdelete(userId,roomId)} variant={"destructive"}>
              delete room <Trash2 />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
