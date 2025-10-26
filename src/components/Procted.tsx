import { GetTheSession } from '@/util/GetTheSession'
import { redirect } from 'next/navigation'
import React, { type ReactNode } from 'react'



 async function Procted({children}:{children:ReactNode}) {
    const session=await GetTheSession()
    const _id=session?.user?.id
    if(_id){
     redirect("/")
    }
   return  (   <>
   {children}
   </>)
    

    
}

export default Procted
