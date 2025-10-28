import React from 'react'
import { Button } from '../ui/button'
import FirstPage from './HeroCoponent/FirstPage'
import SecondSection from './HeroCoponent/SecondSection'

interface Props {}

function Hero(props: Props) {
    const {} = props

    return (
        
        <>
        <div   >
            <FirstPage/>
            <SecondSection/>    
        </div>
        </>
    )
}

export default Hero
