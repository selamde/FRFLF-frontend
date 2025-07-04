import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Responsive = ({open}) => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div>
      {
        open && (
          <div className='z-50'>
              <div className='fixed top-20 left-0 w-full h-[50%] z-50 bg-blue-500 text-white p-5'>
         <ul className='flex flex-col z-50 gap-4 mt-3 justify-center items-center font-semibold text-xl'>
            <li><a href='/'>Home</a></li>
            <li><a href='/fugitive'>Fugitives</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/report'>Report</a></li>
            <li><a href='/contact'>Contact</a></li>
            {
              isAuthenticated && user && (
                <Link to={`/viewProfile/${user.id}`} className='bg-blue-500 text-white p-2 rounded-xl '>View profile</Link>  
              )
            }
            
         </ul>
 
       </div>
          </div>
        )
      }
    </div>
  )
}

export default Responsive