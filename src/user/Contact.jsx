import React, { useState } from 'react'
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';

const Contact = () => {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [description, setDescription] = useState();

  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3001/contact',{email, phone, description});
      if(response){
        Swal.fire({
                      title: "Fugitive Data added successfully!",
                      icon: "success",
                      draggable: true
                    }).then(()=>{
                      window.location.reload();
                    });

      }

    } catch(err){
      console.log(err);
      alert(err);
    }
  }

  return (
     <div className='container  '>
         <div className='mt-32'>
           <h1 className='md:text-6xl text-2xl font-semibold text-center '>Contact</h1>
    
          <h2 className='flex gap-2 md:text-4xl text-2xl items-center  '> <MdOutlineConnectWithoutContact /> Contact us</h2>
            <div className='flex justify-center items-center mt-8'>
               <form onSubmit={handleSubmit} className='border border-[#242234] flex flex-col  p-8 gap-3 w-[500px]'>
                 <label className='text-2xl font-semibold' htmlFor="">Enter your Email</label>
                 <input type="text" placeholder='example@gmail.com' className='p-2 w-full border focus:outline-none' onChange={(e)=> setEmail(e.target.value)} />
                 <label className='text-2xl font-semibold' htmlFor="">Phone</label>
                 <input type="tel" placeholder='+251-9xxxxxxxx'  className=' p-2 w-full border focus:outline-none' onChange={(e)=> setPhone(e.target.value)} />
                 <label className='text-2xl font-semibold' htmlFor="">Description</label>
                 <textarea name="" placeholder='Enter details' id="" className='p-2 w-full border focus:outline-none' onChange={(e)=> setDescription(e.target.value)}></textarea>
                 <button className='bg-blue-500 hover:bg-white hover:text-black py-3 font-bold text-white border-2 border-blue-500  rounded-2xl' type='submit'>Submit</button>
               </form>
            </div>
         </div>
       </div>
  )
}

export default Contact