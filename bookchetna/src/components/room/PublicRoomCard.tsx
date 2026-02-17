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
            <Button variant="ghost" className='w-full h-auto py-8 hover:bg-black/50 border-gray-700 border hover:border-white/50 hover:border-2 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center gap-4 bg-gray-900/50 backdrop-blur-sm' >

              <div className='flex flex-col gap-3 justify-center items-center' >


                <FolderSymlink className='bg-gray-800 size-16 p-3 text-white rounded-full group-hover:scale-110 transition-transform duration-300' />

                <div className="text-center">
                  <p className='text-xl font-semibold mb-1' >Join Public Rooms</p>
                  <p className='text-gray-400 font-normal' >Explore open communities</p>
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
