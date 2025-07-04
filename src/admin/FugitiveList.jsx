import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Outlet } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

const FugitiveList = () => {
  const [fugitives, setFugitives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayLoading, setDisplayLoading] = useState(null);

  useEffect(() => {
    const fetchFugitives = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await axios.get("https://frflf-backend.onrender.com/fetch-matched-fugitives");
        setFugitives(result.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load matched fugitives. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFugitives();
  }, []);

  const handleDisplay = async (fugitive) => {
    try {
      setDisplayLoading(fugitive.file);
      await Swal.fire({
        title: `<strong>${fugitive.name.toUpperCase()}</strong>`,
        html: `
          <img src="https://frflf-backend.onrender.com/matched_faces/${fugitive.folder}/${fugitive.file}" 
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
        `,
        didOpen: () => {
          setDisplayLoading(null);
        }
      });
    } catch (err) {
      console.error(err);
      setDisplayLoading(null);
      Swal.fire({
        title: 'Error',
        text: 'Failed to load fugitive details',
        icon: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[100px]">
        <div className="text-center">
          <ClipLoader size={50} color="#3B82F6" />
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading matched fugitives...</p>
        </div>
      </div>
    );
  }

  if (error && fugitives.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[100px]">
        <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
          <p className="text-red-600 font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mt-[100px]">
      <h1 className="text-4xl font-semibold text-center">All Matched Criminal Evidence</h1>
      
      {fugitives.length === 0 && !loading ? (
        <div className="text-center mt-10">
          <p className="text-xl text-gray-500">No matched fugitives found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 p-5">
          {[...fugitives].reverse().map((fugitive, idx) => (
            <div
              key={idx}
              onClick={() => handleDisplay(fugitive)}
              className="border p-4 shadow-lg text-center cursor-pointer bg-white hover:shadow-2xl rounded-xl transition-all relative"
            >
              {displayLoading === fugitive.file && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                  <ClipLoader size={30} color="#FFFFFF" />
                </div>
              )}
              
              <img
                src={`https://frflf-backend.onrender.com/matched_faces/${fugitive.folder}/${fugitive.file}`}
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
      )}
    </div>
  );
};

export default FugitiveList;
