"use client"
import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderSymlink, Plus } from 'lucide-react'
import { handleClientError } from '@/util/clientError'
import { toast } from 'sonner'
import { api } from '@/lib/axios'
import { useRouter } from 'next/navigation'



function JoinRoomCard() {
  const [id, setId] = useState<number>()
  const router = useRouter()
  const handleClick = async () => {
    try {
      console.log(id?.toString.length)
      if (!id) {
        return toast.error("Room id is required")
      }
      if (id! < 100000 || id > 999999) {
        return toast.error("We only support 6 (six) digit number ")
      }
      const respons = await api.post("/room/join-room", {
        roomId: id
      })
      if (respons.status != 200) {
        return toast.error("something went wront")
      }
      toast.success(respons.data.message)
      router.push(`/home?room=${respons.data.data.id}&page= 1`)


    } catch (error) {
      handleClientError(error)
    }
  }


  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger className='w-full h-full' asChild>
            <Button variant="ghost" className='w-full h-auto py-8 hover:bg-black/50 border-gray-700 border hover:border-white/50 hover:border-2 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-gray-900/50 backdrop-blur-sm' >

              <div className='flex flex-col gap-3 justify-center items-center' >


                <FolderSymlink className='bg-gray-800 size-16 p-3 text-white rounded-full group-hover:scale-110 transition-transform duration-300' />

                <div className="text-center">
                  <p className='text-xl font-semibold mb-1' >Join with Code</p>
                  <p className='text-gray-400 font-normal' >Enter an invite code </p>
                </div>

              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Join Room</DialogTitle>
              <DialogDescription>
                Enter an invite code to join a room
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Invite Code</Label>
                <Input onChange={(e) => setId(Number(e.target.value))} id="name-1" name="name" type="number" defaultValue="Enter 6-digit code" />
              </div>
              {/* <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleClick} type="submit">Join</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  )
}

export default JoinRoomCard
