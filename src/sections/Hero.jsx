import React from 'react'
import GetStartedForm from '../components/GetStartedForm'
import Navbar from '../components/Navbar/Navbar'

const Hero = () => {
  return (
    <section className='max-container  w-full h-screen relative bg-hero-bg bg-cover bg-no-repeat bg-center' >
    <Navbar/>
    <div className="h-full w-full absolute bg-black opacity-85"/>


    <div className='padding_container'>
    <div className="hero-content text-center">
    <h1 className="hero-title">
            Help People Find Your Content
    </h1>
          <p className='font-sans mt-[10px] text-[20px] opacity-50'>Grow your business by increasing traffic to your most valuable content.</p>

          <div className='relative w-full lg:w-[80%]'>
          <GetStartedForm/>
          </div>
    </div>



    </div>


    </section>
  )
}

export default Hero