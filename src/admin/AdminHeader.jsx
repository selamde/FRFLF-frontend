import React, { useEffect, useRef, useState } from 'react';
import { GiCctvCamera } from "react-icons/gi";
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

const AdminHeader = () => {
  const [matchCount, setMatchCount] = useState(0);
  const [newMatches, setNewMatches] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // Poll for new matches
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get('https://frflf-backend.onrender.com/matched-image-count');
        const currentCount = res.data.count;
        const lastSeen = parseInt(localStorage.getItem('lastSeenMatchCount') || '0', 10);
        setMatchCount(currentCount);
        if (currentCount > lastSeen) {
          setNewMatches(currentCount - lastSeen);
          if (audioRef.current) {
            audioRef.current.play();
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
    navigate('/dashboard/matcheddata');
  };

  return (
    <nav className='fixed top-0 left-0 z-[9999] bg-[#242234] w-full border-b border-amber-50 mb-9'>
      <div className='container flex justify-between items-center py-6 text-white'>
        <div className='font-bold text-2xl'>
          <a href="/" className='flex gap-2 items-center'>FRFLPF<GiCctvCamera /></a>
        </div>
        <div className='flex items-center gap-6'>
          <div className='font-semibold hidden md:block'>
            <ul className='flex gap-3'>
              <li><a href='/'>Home</a></li>
              <li><a href='/Fugetive'>Fugitives</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/report'>Report</a></li>
              <li><a href='/contact'>Contact</a></li>
            </ul>
          </div>
          <div className='relative cursor-pointer' onClick={handleBellClick} title="New Matches">
            <FaBell size={28} />
            {newMatches > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5'>
                {newMatches}
              </span>
            )}
          </div>
          <audio ref={audioRef} src="/notification.mp3" preload="auto" />
        </div>
      </div>
    </nav>
  );
}

export default AdminHeader

export const AdminLayout = () => (
  <>
    <Header />
    <main className='min-h-screen'>
      <Outlet />
    </main>
  </>
);
