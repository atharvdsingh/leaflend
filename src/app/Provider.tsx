"use client"
import React, { type ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'


function Provider({children}:{children:ReactNode}) {
    

    return (


        <SessionProvider>

        {
            children
        }
        </SessionProvider>
        
    )
}

export default Provider
