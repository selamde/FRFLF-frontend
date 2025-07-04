import React, { useEffect, useRef, useState } from 'react'
import Responsive from './Responsive'
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { GiCctvCamera } from "react-icons/gi";
import { Link, Links, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const { user, isAuthenticated, logout} = useAuth();
  const [pro, setPro]= useState(false); 
  const profileRef = useRef(null);
  
 useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setPro(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside); 

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, []);

return (
   <>
    <nav className='fixed flex top-0 left-0 z-[9999] bg-[#242234] w-full border-b border-amber-50 mb-9'>
      <div className=' container  flex justify-between items-center py-6  text-white'>
       <div className='font-bold text-2xl'><a href="/" className='flex gap-2 items-center'>FRFLF<GiCctvCamera /></a></div>
       <div className='font-semibold hidden md:block'>
         <ul className='flex gap-3'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/fugitive'>Fugitives</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/report'>Report</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            
         </ul>
       </div>
       
       <div className='md:hidden' onClick={()=>{
         setOpen(!open)
 
       }}>

        { 
          open? <IoMdClose className='text-4xl'/> : <IoMenuSharp className='text-4xl' />
        }

       </div>
      </div>
       {isAuthenticated && user && (
 
        <>
      
         <div ref={profileRef}   className='hidden md:block justify-center items-center border-2 border-white p-2 m-2 rounded-full ' onClick={()=>setPro(!pro)}>
           <img className='w-[50px] h-[50px] rounded-full' src={
            `http://localhost:3001/${user.image}`
            }alt='profile' />
           </div>
      {
        pro && (
           <div  ref={profileRef}   className='position absolute top-20 right-10 flex flex-col justify-center rounded items-center gap-2 bg-gray-200 border w-[200px]  h-[200px] border-blue-500'>
          <h1 className=' font-bold text-2xl'>{user.name}</h1>
          <Link to={`/viewProfile/${user.id}`} className=' font-semibold hover:underline hover:text-blue-600'>View profile</Link>
          <button className='bg-blue-500 text-white p-2 rounded-xl' onClick={()=> logout()}>Logout</button>
       </div>
        )
      }
        </>
       
       )}
    </nav>
    <Responsive open={open} />
     
   </>
  )
}

export default Navbar