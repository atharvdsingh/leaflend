"use client"
import React from 'react'
import { signIn,signOut, useSession } from 'next-auth/react'
import { json } from 'stream/consumers'

interface Props {}

function Apk() {
    const session=useSession()
    console.log(session)
    if(session.data?.user){
        return <div>
          {
            JSON.stringify(session.data.user)
            
          }
        </div>
    }
    else{

        return (
            <>
        <div>
            
            <button onClick={()=>signIn("google")} > signIn </button>
            <br />
            <button onClick={()=>signOut()} >logout</button>

        </div>
        </>
    )
}

}
export default Apk
