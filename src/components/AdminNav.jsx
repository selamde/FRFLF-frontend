import React, { useEffect, useRef, useState } from 'react'
import { GiCctvCamera } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const AdminNav = () => {
  const { user, isAuthenticated, logout} = useAuth();
  const [pro, setPro]= useState(false);
  const profileRef = useRef(null);
  const [matchCount, setMatchCount] = useState(0);
  const [newMatches, setNewMatches] = useState(0);
  const audioRef = useRef(null);

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


  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get('http://localhost:3001/matched-image-count');
        const currentCount = res.data.count;
        let lastSeen = localStorage.getItem('lastSeenMatchCount');

        if (lastSeen === null) {
          localStorage.setItem('lastSeenMatchCount', currentCount);
          setNewMatches(0);
        } else {
          lastSeen = parseInt(lastSeen, 10);
          setMatchCount(currentCount);
          if (currentCount > lastSeen) {
            setNewMatches(currentCount - lastSeen);
            if (audioRef.current) {
              audioRef.current.play();
            }
          }
        }
      } catch (err) {
   
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 5000); 
    return () => clearInterval(interval);
  }, []);

  const handleBellClick = () => {
    localStorage.setItem('lastSeenMatchCount', matchCount);
    setNewMatches(0);
    window.location.href = '/dashboard/matcheddata';
  };

  return (
  <>
    <nav className='fixed top-0 left-0 bg-[#242234] w-full border-b border-amber-50 mb-9'>
      <div className=' container  flex justify-between items-center py-6  text-white'>
       <div className='font-bold text-2xl'><a href="/dashboard" className='flex gap-2 items-center'>FRFLF<GiCctvCamera /> /Admin</a></div>
       <div   className='font-semibold '>
         <ul className='flex gap-3'>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><Link to='addfugitive'>Add-Fugitives</Link></li>
            <li><Link  to='matcheddata'>MatchedData</Link></li>
            <li><Link to='camera'>Camera</Link></li>
            <li><Link to ='addcamera'>AddCamera</Link></li>
            <li><Link to ='criminallist'>Criminal-list</Link></li>
            <li><Link to ='seeReport'>Reports</Link></li>
            <li><Link to ='seeContact'>Contact</Link></li>
            <li><Link to ='createusers'>Create-user</Link></li>
             <li><Link to ='logshow'>Logs</Link></li>
         </ul>
       </div>
       {isAuthenticated && user && (
               <>
                <div className='flex items-center gap-4'>
                  <div className='relative cursor-pointer' onClick={handleBellClick} title="New Matches">
                    <FaBell size={28} />
                    {newMatches > 0 && (
                      <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5'>
                        {newMatches}
                      </span>
                    )}
                    <audio ref={audioRef} src="/notification.mp3" preload="auto" />
                  </div>
                  <div ref={profileRef}   className=' border-2 border-white rounded-full ' onClick={()=>setPro(!pro)}>
                    <img className='w-[50px] h-[50px] rounded-full' src={
                     `https://frflf-backend.onrender.com/${user.image}`
                     }alt='profile' />
                  </div>
                </div>
             {
               pro && (
                  <div  ref={profileRef}   className='position absolute top-20 right-10 flex flex-col justify-center rounded text-black items-center gap-2 bg-gray-200 border w-[200px]  h-[200px] border-blue-500'>
                 <h1 className=' font-bold text-2xl'>{user.name}</h1>
                 <Link to={`adminprofile/${user.id}`} className=' font-semibold hover:underline hover:text-blue-600'>View profile</Link>
                 <button className='bg-blue-500 text-white p-2 rounded-xl' onClick={()=> logout()}>Logout</button>
              </div>
               )
             }
               </>
              )}
      </div>
    </nav>
  </>
  )
}

export default AdminNav
