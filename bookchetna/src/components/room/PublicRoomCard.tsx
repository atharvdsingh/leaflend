"use client"


import { Button } from "@/components/ui/button"
import {
  Dialog,

  DialogTrigger,
} from "@/components/ui/dialog"

import { FolderSymlink, Plus } from 'lucide-react'

import { useRouter } from 'next/navigation'



function PublicRoomCard() {

  const router = useRouter()



  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger onClick={() => router.push("./room/public-room")} className='w-full h-full' asChild>
            <Button variant="ghost" className='w-full h-auto py-8 hover:bg-zinc-900 border-zinc-800 border hover:border-zinc-700 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-black' >

              <div className='flex flex-col gap-3 justify-center items-center' >


                <FolderSymlink className='bg-white size-16 p-3 text-black rounded-full group-hover:scale-110 transition-transform duration-300' />

                <div className="text-center">
                  <p className='text-xl text-white font-semibold mb-1' >Join Public Rooms</p>
                  <p className='text-zinc-400 font-normal' >Explore open communities</p>
                </div>

              </div>
            </Button>
          </DialogTrigger>

        </form>
      </Dialog>
    </>
  )
}

export default PublicRoomCard
