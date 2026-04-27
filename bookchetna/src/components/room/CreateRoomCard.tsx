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
import { Plus, Globe, Lock } from "lucide-react";
import { toast } from "sonner";
import { createRoom } from "@/services/room.services";
import { handleClientError } from "@/util/clientError";
import { useRouter } from "next/navigation";

function CreateRoomCard() {
  const [name, setName] = useState<string>("")
  const [discription, setDiscription] = useState<string>("")
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const router = useRouter()

  async function handleSubmit() {
    try {
      if (name.length < 5) {
        return toast.error("Room name is required More then 5 words")
      }
      const visibility = isPublic ? "SHOW" : "HIDE" as const;
      const body = await createRoom(name, discription, visibility)
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
              className="w-full h-auto py-8 hover:bg-muted border-border border hover:border-border/80 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-card"
            >
              <div className="flex flex-col gap-3 justify-center items-center">
                <Plus className="bg-primary size-16 p-3 text-primary-foreground rounded-full group-hover:scale-110 transition-transform duration-300" />

                <div className="text-center">
                  <p className="text-xl text-foreground font-semibold mb-1">Create New Room</p>
                  <p className="text-muted-foreground font-normal">
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
              {/* Visibility Toggle */}
              <div
                onClick={() => setIsPublic(!isPublic)}
                className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 cursor-pointer hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  {isPublic ? (
                    <Globe className="w-4 h-4 text-green-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-orange-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {isPublic ? "Public Room" : "Private Room"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isPublic
                        ? "Anyone can discover and join this room"
                        : "Only people with invite code can join"}
                    </p>
                  </div>
                </div>
                <div
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isPublic ? "bg-green-500" : "bg-muted-foreground/30"
                    }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${isPublic ? "translate-x-5" : "translate-x-0.5"
                      }`}
                  />
                </div>
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
