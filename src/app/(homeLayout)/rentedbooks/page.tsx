import CenterComponent from '@/components/CenterComponent'
import CreateBook from '@/components/CreateBook'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface Props {}

function Page(props: Props) {
    const {} = props

    return (
        <>

        <CenterComponent>
        <div className='flex justify-center flex-col gap-3  items-center' >
            <BookOpen className=' opacity-50 scale-200' />
            <p className='opacity-50' >You haven't rented any book</p>

        <Button asChild >
            <Link href={"/home"} >Browse Book</Link>
              </Button>
        </div>
        </CenterComponent>
        </>
        
    )
}

export default Page
