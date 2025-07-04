import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Outlet } from "react-router-dom";

const FugitiveList = () => {
  const [fugitives, setFugitives] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/fetch-matched-fugitives")
      .then(result => setFugitives(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDisplay = (fugitive) => {
    Swal.fire({
      title: `<strong>${fugitive.name.toUpperCase()}</strong>`,
      html: `
        <img src="http://localhost:3001/matched_faces/${fugitive.folder}/${fugitive.file}" 
             alt="${fugitive.name}" 
             style="width:100%; height:auto; border-radius:10px; margin-bottom:15px;" />
        <p><strong>Camera:</strong> ${fugitive.camera}</p>
        <p><strong>Date:</strong> ${fugitive.date}</p>
        <p><strong>Time:</strong> ${fugitive.time}</p>
      `,
      showCloseButton: true,
      confirmButtonText: 'Close',
      width: '600px',
      background: '#1a1a1a',
      color: '#e0e0e0',
      customClass: {
        popup: 'border border-blue-500 shadow-lg rounded-xl',
        title: 'text-blue-400',
      },
      backdrop: `
        rgba(0,0,0,0.8)
        url("/cia-overlay.gif")
        left top
        no-repeat
      `
    });
  };

  return (
    <div className="p-4 mt-[100px]">
      <h1 className="text-4xl font-semibold text-center">All Matched Criminal Evidence</h1>
      <div className="grid grid-cols-3 gap-5 mt-5 p-5">
        {[...fugitives].reverse().map((fugitive, idx) => (
          <div
            key={idx}
            onClick={() => handleDisplay(fugitive)}
            className="border p-4 shadow-lg text-center cursor-pointer bg-white hover:shadow-2xl rounded-xl transition-all"
          >
            <img
              src={`http://localhost:3001/matched_faces/${fugitive.folder}/${fugitive.file}`}
              alt='matched fugitive'
              className="w-full h-60 object-cover rounded-lg mb-2"
            />
            <h1 className="text-md font-bold">Name: {fugitive.name}</h1>
            <h3 className="text-sm font-medium text-gray-600">Camera: {fugitive.camera}</h3>
            <h3 className="text-sm text-gray-600">Date: {fugitive.date}</h3>
            <p className="text-sm text-gray-500">Time: {fugitive.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FugitiveList;
