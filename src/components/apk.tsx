"use client"
import React, { useState, type FormEvent, type FormEventHandler } from 'react'
import { signIn,signOut, useSession } from 'next-auth/react'
import { json } from 'stream/consumers'

interface Props {}



function Apk() {
    const [name,setname]=useState("")
const [url,setul]=useState("")
    const session=useSession()
    console.log(session)
    
function  handlesumbit(e:FormEvent){
    e.preventDefault()
    console.log(name,url)

}
    if(session.data?.user){
        return <div>
          {
            JSON.stringify(session.data.user)
            
          }
           <button onClick={()=>signOut()} >logout</button>
          <form onSubmit={(e)=>handlesumbit} >
            <input  onChange={(e)=>setul(e.target.value)} placeholder='books name' type="text" />
            <input onChange={(e)=>setname(e.target.value)} placeholder='url' type="text" />
            <button type='submit' >submit</button>
          </form>

        </div>
    }
    else{

        return (
            <>
        <div>
            
            <button onClick={()=>signIn("google")} > signIn </button>
            <br />
           

        </div>
        </>
    )
}

}
export default Apk
