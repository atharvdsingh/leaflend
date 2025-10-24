"use client"
import React, { type ReactNode } from 'react'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'


function Provider({children}:{children:ReactNode}) {
    

    return (


        <SessionProvider>
            <ThemeProvider attribute="class" >


        {
            children
        }
        </ThemeProvider>
        </SessionProvider>
        
    )
}

export default Provider
