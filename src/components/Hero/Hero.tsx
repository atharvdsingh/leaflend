import React from 'react'
import { Button } from '../ui/button'
import FirstPage from './HeroCoponent/FirstPage'

interface Props {}

function Hero(props: Props) {
    const {} = props

    return (
        
        <>
        <div      className='min-h-screen w-full flex flex-wrap  '  >
            <FirstPage/>
        </div>
        </>
    )
}

export default Hero
