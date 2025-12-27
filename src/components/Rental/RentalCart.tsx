import Image from 'next/image'
import React from 'react'
interface Props {
    name:string

}

function RentalCart(props: Props) {
    const {} = props

    return (
        <>
        <div className='flex   justify-center items-center' >

        <div className=' h-35 bg-white max-w-7xl m-5 rounded flex flex-1  ' >

            <div className='flex  m-2 gap-2 bg-yellow-400 w-full  ' >
                {/* <Image
                            src={"/1.jpg"}
                            className="shrink-0 w-20 h-20 overflow-hidden "
                            alt={"dev"}
                            width={20}
                            height={28}
                          /> */}
                          <div className='shrink-0 w-20 h-20 rounded-2xl overflow-hidden' >

                          </div>
                          <div className='flex flex-1 bg-black ' >
                            

                          </div>

            </div>
            
        

        </div>
        </div>
        
        </>
        
    )
}

export default RentalCart
