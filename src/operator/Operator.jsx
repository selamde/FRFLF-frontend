import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';


const Operator = () => {
    const [cameras, setCameras] = useState([]);
    const { user, logout} = useAuth();
    const [selectedCamera, setSelectedCamera] = useState(null);
    const navigate = useNavigate();
    const [matchCount, setMatchCount] = useState(0);
    const [newMatches, setNewMatches] = useState(0);
    const audioRef = useRef(null);
    const [zoomLevels, setZoomLevels] = useState({});

    useEffect(() => {
      const fetchCount = async () => {
        try {
          const res = await axios.get('http://localhost:3001/matched-image-count');
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
    

    useEffect(() => {
      axios
        .get('http://localhost:3001/fetch-cameras')
        .then((res) => setCameras(res.data))
        .catch((err) => console.error('Error fetching cameras:', err));
    }, []);

    const handleZoom = (cameraId, direction) => {
      setZoomLevels(prev => {
        const current = prev[cameraId] || 1;
        let next = direction === 'in' ? current + 0.1 : current - 0.1;
        if (next < 0.2) next = 0.2;
        if (next > 3) next = 3;
        return { ...prev, [cameraId]: next };
      });
    };

    return (
      <>
      <div>
            <div className="test p-4 mt-20">
          

          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-5">
            {cameras.map((camera) => {
              const videoUrl = camera.port
                ? `http://${camera.ipAddress}:${camera.port}/video`
                : `http://${camera.ipAddress}/video`;

              return (
                <div
                  key={camera._id}
                  className="border p-1 shadow-lg text-center"
                >
                  <h3 className="text-2xl font-bold">{camera.cameraName}</h3>
                  <div
                    className="cursor-pointer mt-3"
                    onClick={() => setSelectedCamera(camera)}
                  >
                    <div className="overflow-hidden w-full h-[250px]">
                      <iframe
                        src={
                        videoUrl
                        }
                        className="w-[500%] h-[500%] scale-[0.2] transform origin-top-left border-none rounded-md"
                        allowFullScreen
                        scrolling="no"
                      ></iframe>
                    </div>
                    <p className="text-sm mt-1 text-blue-500 hover:underline">
                      Click to View
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

           {selectedCamera && (
     <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-90 font-mono">
       <div className="relative bg-[#0f0f0f] border shadow-xl p-6 rounded-lg w-[95%] max-w-5xl ">
         <button
           className="absolute  right-4 text-white text-3xl transition"
           onClick={() => setSelectedCamera(null)}
         >
           ×
         </button>

         <div className="text-center mb-4 border-b  pb-2">
           <h2 className="text-3xl font-bold uppercase text-white tracking-wider">Surveillance Feed</h2>
           <p className=" mt-2 text-sm text-white">
             Location: <span className="font-bold">{selectedCamera.location}</span> | IP:{" "}
             <span className="font-bold">{selectedCamera.ipAddress}</span>
           </p>
         </div>

         <div className="overflow-hidden w-full h-[500px]">
  <iframe
    src={
      selectedCamera.port
        ? `http://${selectedCamera.ipAddress}:${selectedCamera.port}/video`
        : `http://${selectedCamera.ipAddress}/video`
    }
    className="w-[500%] h-[250%] scale-[0.5] transform origin-top-left border-none rounded-md"
    allowFullScreen
    scrolling="no"
  ></iframe>
</div>

         <div className="mt-3 text-xs text-white text-right italic">[ FRLF Video FEED of {selectedCamera.cameraName} ]</div>
       </div>
     </div>
   )}
      </>
    )
  }

export default Operator