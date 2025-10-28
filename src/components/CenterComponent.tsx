import React, { type ReactNode } from 'react'

interface Props {
    children:ReactNode
}

function CenterComponent(props: Props) {
    const {children} = props

    return (
        <div className='max-w-7xl mx-auto px-4 ' >
            {children}
        </div>
        
    )
}

export default CenterComponent
