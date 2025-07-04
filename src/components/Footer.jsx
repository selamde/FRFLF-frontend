import React from 'react'
import { GiCctvCamera } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-[#242234]  mt-10 '>
       <div className='container flex gap-4 flex-col md:flex-row md:justify-between py-4'>
        
       <h1 className='font-bold text-4xl text-white flex items-center gap-2'>FRFLF<GiCctvCamera /></h1>
       <div className='text-white'>
        <h1 className='border-b border-white font-semiBold text-3xl'>Pages</h1>
       <div className='flex flex-col gap-2 mt-2'>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/fugitive">Fugitives</a>
        <a href="/report">Report</a>
       </div>
       </div>

       <div className='text-white'>
       <h1 className='border-b border-white font-semiBold text-3xl'>Social media</h1>
       <div className='flex flex-col gap-2 md:justify-center md:items-center mt-2 text-3xl'>
       <FaFacebook />
       <FaInstagram />
       <CiLinkedin />
       <FaGithubSquare />
       </div>

       </div>
       </div>
       <p className='text-white text-center'>
       &copy;copy 2025 FRFLF. All rights reserved.
       </p>

    </div>
  )
}

export default Footer