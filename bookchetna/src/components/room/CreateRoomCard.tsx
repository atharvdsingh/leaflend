"use client"
import React, { useState, type ReactEventHandler } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { handleClientError } from "@/util/clientError";
import { useRouter } from "next/navigation";

function CreateRoomCard() {
  const [name, setName] = useState<string>("")
  const [discription, setDiscription] = useState<string>("")
  const router = useRouter()

  async function handleSubmit() {
    try {
      if (name.length < 5) {
        return toast.error("Room name is required More then 5 words")
      }
      const body = await api.post("/room/create-room", {
        roomName: name,
        discription: discription
      })
      if (body.status != 200) {
        toast.error("Something Went Wrong")
      }
      toast.success("Room created successfully")
      router.push(`./home?room=${body.data.data.id}&page=1/`)


    } catch (error) {
      handleClientError(error)
    }
  }

  return (
    <>
      <Dialog  >
        <form  >
          <DialogTrigger className="w-full h-full" asChild>
            <Button
              variant="ghost"
              className="w-full h-auto py-8 hover:bg-black/50 border-gray-700 border hover:border-white/50 hover:border-2 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-gray-900/50 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-3 justify-center items-center">
                <Plus className="bg-gray-800 size-16 p-3 text-white rounded-full group-hover:scale-110 transition-transform duration-300" />

                <div className="text-center">
                  <p className="text-xl font-semibold mb-1">Create New Room</p>
                  <p className="text-gray-400 font-normal">
                    Start a new book sharing community
                  </p>
                </div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Room</DialogTitle>
              <DialogDescription>
                Start a new book sharing community. You`&apos;`ll be the room creator.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Room Name</Label>
                <Input id="name-1" onChange={(e) => setName(e.target.value)} name="room-name" defaultValue="eg. hostelclub " />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Discription</Label>
                <Input
                  id="discripttion"
                  name="discription"
                  defaultValue="eg. book renting for hostels name"
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmit} type="submit">Create Room <Plus /> </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export default CreateRoomCard;
