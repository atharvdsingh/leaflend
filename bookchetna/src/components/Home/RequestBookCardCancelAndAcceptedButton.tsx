"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Check, Cross, X } from 'lucide-react'
import { rejectRentalRequest, acceptRentalRequest } from '@/services/rentbook.services'
import { handleClientError } from '@/util/clientError'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


interface props {
    id: number
}

function RequestBookCardCancelAndAcceptedButton({ id }: props) {
    const router = useRouter()
    const handlReject = async () => {
        try {
            const res = await rejectRentalRequest(id)

            if (res.status != 200) {
                return toast.error("somethinw went wrong")
            }
            toast.success(res.data.message)
            router.refresh()
        } catch (error) {
            handleClientError(error)
        }
    }

    const handleAccept = async () => {
        try {
            const res = await acceptRentalRequest(id)

            if (res.status != 200) {
                return toast.error("somethinw went wrong")
            }
            toast.success(res.data.message)
            router.refresh()
        } catch (error) {
            handleClientError(error)

        }
    }


    return (
        <>
            <div className='flex justify-center items-center gap-4'  >
                <Button onClick={handleAccept} >
                    <Check />

                </Button>
                <Button variant={"destructive"} onClick={handlReject} >

                    <X className='text-foreground' />
                </Button>

            </div>
        </>

    )
}

export default RequestBookCardCancelAndAcceptedButton
