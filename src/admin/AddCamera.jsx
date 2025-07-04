import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const AddCamera = () => {
    const { user } = useAuth();
    const [cameraData, setCameraData] = useState({
        cameraName: '',
        ipAddress: '',
        port: '',
        location: ''
    });
    const [cameras, setCameras] = useState([]);

    const handleChange = (e) => {
        setCameraData({ ...cameraData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://frflf-backend.onrender.com/add-camera',{ 
                ...cameraData, 
                adminId:user?.id,
      
            });
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Camera added successfully!',
                timer: 2000,
                showConfirmButton: false
        });
            setCameras([...cameras, response.data.data]); 
            setCameraData({ cameraName: '', ipAddress: '', port: '', location: '' });
        } catch(error) {
            console.error("Error adding camera:", error);
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add camera.'
        });
        }
    };

    return (
        <div className="p-8 mt-24 container mx-auto max-w-lg">
  <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
    Add Camera
  </h1>

  <div className="bg-white border-2 border-[#242234] rounded-3xl p-10 shadow-lg mx-auto">
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <label className="text-2xl font-semibold text-gray-700">Camera Name</label>
      <input
        className="border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        type="text"
        placeholder="Enter Camera Name"
        name="cameraName"
        value={cameraData.cameraName}
        onChange={handleChange}
        required
      />

      <label className="text-2xl font-semibold text-gray-700">Camera IP Address</label>
      <input
        className="border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        type="text"
        placeholder="Enter IP Address"
        name="ipAddress"
        value={cameraData.ipAddress}
        onChange={handleChange}
        required
      />

      <label className="text-2xl font-semibold text-gray-700">Port Number (Optional)</label>
      <input
        className="border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        type="text"
        placeholder="Enter Port (e.g., 4747)"
        name="port"
        value={cameraData.port}
        onChange={handleChange}
      />

      <label className="text-2xl font-semibold text-gray-700">Location</label>
      <input
        className="border border-gray-300 rounded-lg p-3 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition mb-4"
        type="text"
        placeholder="Enter Location"
        name="location"
        value={cameraData.location}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white text-2xl font-bold py-4 rounded-3xl shadow-lg hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  </div>
</div>

    );
};

export default AddCamera;
