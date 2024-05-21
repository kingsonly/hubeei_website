import React from 'react'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Pricing from './sections/Pricing'
import Steps from './sections/Steps'

function Home() {
  return (
    <div className=' bg-white'>
    <Hero/>
    <Steps/>
<Pricing/>
<Footer/>
    </div>
  )
}

export default Home