import React from 'react'
import Button from './Button/Button'

const GetStartedForm = () => {
  return (
    <form className='flex flex-col flexCenter lg:flex-row gap-3 w-full py-8 relative padding-container'>


              <input type="text" placeholder="Your Email" className=" relative w-full lg:w-[60%] h-14 px-4 pr-12 transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-0 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />

<div className='w-full lg:w-[30%]'>

<Button title={'Get Started For Free'}/>
</div>
    </form>
  )
}

export default GetStartedForm