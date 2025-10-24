import { Badge } from '@/components/ui/badge'
import React from 'react'

interface Props {}

function SecondSection(props: Props) {
    const {} = props

    return (
        <>
        <div className='' >

        <div className='bg-primary border w-full h-10 sm:h-30 ' >  

        </div>
        <div className='w-full  flex flex-col justify-evenly items-center gap-2 ' >
            <div>
                <Badge className='text-primary bg-primary-foreground' variant="default" >
                    Features

                </Badge>
            </div>

        </div>
        </div>
        
        </>
    )
}

export default SecondSection
