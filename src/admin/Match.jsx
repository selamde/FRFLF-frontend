
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const Match = () => {
  const { name } = useParams();
  const [images, setImages] = useState([]);
   const [loading, setLoading] = useState(true);
  const [noMatch, setNoMatch] = useState(false);

  useEffect(() => {
    axios.get(`https://frflf-backend.onrender.com/matched_photos/${name}`)
      .then((res) => {
        if (res.data.length === 0) {
          setNoMatch(true);
        } else {
          setImages(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load images:", err);
        setNoMatch(true); 
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  const handleImageClick = (criminalName, cameraName, date, time, imageUrl) => {
  Swal.fire({
  title: `<div style="font-family: 'Orbitron', sans-serif; color: #00ffcc; font-size: 24px;">
            <i class="fa-solid fa-user-secret mr-2"></i>${criminalName.toUpperCase()}
          </div>`,
  html: `
    <div style="
      font-family: 'Share Tech Mono', monospace;
      background-color: #0d1117;
      color: #00ffcc;
      border: 1px solid #00ffcc;
      padding: 15px;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0, 255, 204, 0.3);
    ">
      <img src="${imageUrl}" alt="${criminalName}" style="width:100%; height: auto; border-radius: 8px; margin-bottom: 15px; border: 2px solid #00ffcc;" />
      <p><strong>Camera:</strong> ${cameraName}</p>
      <p><strong> Date:</strong> ${date}</p>
      <p><strong> Time:</strong> ${time.replace(/-/g, ':')}</p>
    </div>
  `,
  background: '#0d1117',
  showCloseButton: true,
  focusConfirm: false,
  confirmButtonText: '<span style="font-family: monospace; color: #0ff;">Close</span>',
  customClass: {
    popup: 'cia-alert-popup',
  },
  width: '500px'
});

};

  return (
    <div className="p-8 mt-24 bg-gray-50 min-h-screen">
  <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Matched Data</h1>

  <div className="bg-white rounded-2xl shadow-xl p-6 max-w-7xl mx-auto">
    <h2 className="text-2xl font-semibold text-center text-blue-700 mb-8">
      Matched Criminal: <span className="uppercase">{name}</span>
    </h2>
    {
      loading ? (
          <p className="text-center text-gray-500 text-lg">Loading...</p>
      ): noMatch ? (
        <p className="text-center text-red-500 text-lg font-semibold">No matched data by this name</p>
      ):(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
{
  images.map((file, index)=>{
    const [criminalName, cameraName, date, timeWithExt] = file.split('_');
    const time = timeWithExt.replace('.jpg', '');
    return(
      <div
          key={index}
          className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={`https://frflf-backend.onrender.com/matched_faces/${name}/${file}`}
            
            alt={`${name}-${index}`}
            className="w-full h-64 object-cover"
            onClick={()=>{
              handleImageClick(
              criminalName,
              cameraName,
              date,
              time,
              `https://frflf-backend.onrender.com/matched_faces/${name}/${file}`
    )
            }}
          />
          <div className="p-3  bg-gray-100">
            <p className="text-sm text-gray-700 font-medium">Evidence #{index + 1}</p>
            <div className="p-4  bg-gray-100 space-y-1">
                  <p className="  text-gray-800 text-md"><span className="font-bold text-black">Name:</span> {criminalName}</p>
                  <p className=" text-gray-600 text-md"><span className="font-bold text-black">Camera:</span> {cameraName}</p>
                  <p className=" text-gray-600 text-md"><span className="font-bold text-black">Date:</span> {date}</p>
                  <p className=" text-gray-600 text-md"><span className="font-bold text-black">Time:</span> {time.replace(/-/g, ':')}</p>
                </div>
          </div>
        </div>
    );

  })
}
    </div>
      )}


  </div>
</div>
   
  );
};

export default Match;
