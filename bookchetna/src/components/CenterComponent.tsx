
import React, { type ReactNode } from 'react'

interface Props {
    children:ReactNode,
    className?:string
}

function CenterComponent(props: Props) {
    const {children,className} = props

    return (
        <div className={` ${className}  animate-fade-in-blur max-w-7xl mx-auto px-4  `}   >
            {children}
        </div>
        
    )
}

export default CenterComponent
