import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({
    display: null,
    delete: null
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await axios.get('https://frflf-backend.onrender.com/allUsers');
        setUsers(result.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load police officers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDisplay = async (e, id) => {
    e.preventDefault();
    try {
      setActionLoading({...actionLoading, display: id});
      const result = await axios.get(`https://frflf-backend.onrender.com/Policeprofile/${id}`);
      
      Swal.fire({
        title: "Police Officer Details",
        html: `
          <div class="text-left">
            <p><strong>Name:</strong> ${result.data.name}</p>
            <p><strong>Email:</strong> ${result.data.email}</p>
            <p><strong>Role:</strong> ${result.data.role}</p>
          </div>
        `,
        imageUrl: `https://frflf-backend.onrender.com/${result.data.image}`,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Officer image",
        background: '#f8fafc',
        showConfirmButton: true,
        confirmButtonColor: '#3b82f6'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to load officer details",
        icon: "error"
      });
    } finally {
      setActionLoading({...actionLoading, display: null});
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      setActionLoading({...actionLoading, delete: id});
      const response = await axios.delete(`https://frflf-backend.onrender.com/pdelete/${id}`);
      
      if (response.status === 200) {
        Swal.fire({
          title: "Officer Deleted Successfully!",
          icon: "success",
          timer: 1500
        }).then(() => {
          setUsers(users.filter(user => user._id !== id));
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to delete officer",
        icon: "error"
      });
    } finally {
      setActionLoading({...actionLoading, delete: null});
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[100px]">
        <div className="text-center">
          <ClipLoader size={50} color="#3B82F6" />
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading police officers...</p>
        </div>
      </div>
    );
  }

  if (error && users.length === 0) {
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
    <div className="container mx-auto px-4">
      <div className="mt-32">
        <h1 className="md:text-6xl text-4xl font-extrabold text-center text-gray-800 mb-10">
          Police Officers
        </h1>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {users.length > 0 ? (
            users.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-gradient-to-r from-blue-950 to-blue-800 text-white rounded-2xl p-6 shadow-lg transition-transform hover:scale-[1.01] relative"
              >
                {(actionLoading.display === item._id || actionLoading.delete === item._id) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                    <ClipLoader size={30} color="#FFFFFF" />
                  </div>
                )}

                <div
                  onClick={(e) => handleDisplay(e, item._id)}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  {item.image ? (
                    <img
                      src={`https://frflf-backend.onrender.com/${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center border-2 border-white shadow">
                      <span className="text-gray-600 text-xl">?</span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold">Name: {item.name}</h2>
                    <p className="text-md">Email: {item.email}</p>
                    <p className="text-md">Role: {item.role}</p>
                  </div>
                </div>

                <div className='gap-2 flex justify-center'>
                  <Link 
                    to={`/dashboard/editprofile/${item._id}`}
                    className="bg-green-600 hover:bg-white hover:text-green-600 px-5 py-2 rounded-xl transition-all font-semibold"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-600 hover:bg-white hover:text-red-600 border border-red-600 px-5 py-2 rounded-xl transition-all font-semibold"
                    onClick={(e) => handleDelete(e, item._id)}
                    disabled={actionLoading.delete === item._id}
                  >
                    {actionLoading.delete === item._id ? (
                      <ClipLoader size={15} color="#FFFFFF" />
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-10">
              <h1 className="text-3xl font-bold text-gray-600">No Police Officers Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
