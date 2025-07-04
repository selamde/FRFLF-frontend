import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners'; // Import spinner component

const Camera = () => {
  const [cameras, setCameras] = useState([]);
  const { user } = useAuth();
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://frflf-backend.onrender.com/fetch-cameras');
        setCameras(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cameras:', err);
        setError('Failed to load cameras. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const handleDeleteCamera = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://frflf-backend.onrender.com/delete-camera/${id}`, {
        params: { adminId: user?.id, adminName: user?.name }
      });
      setCameras(cameras.filter((camera) => camera._id !== id));
    } catch (error) {
      console.error('Error deleting camera:', error);
      setError('Failed to delete camera. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && cameras.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[100px]">
        <div className="text-center">
          <ClipLoader size={50} color="#3B82F6" />
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading cameras...</p>
        </div>
      </div>
    );
  }

  if (error && cameras.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[100px]">
        <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
          <p className="text-red-600 font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="test p-4 mt-[100px]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-semibold">List of Cameras</h1>
          {loading && (
            <div className="mt-2">
              <ClipLoader size={20} color="#3B82F6" />
            </div>
          )}
        </div>

        {error && (
          <div className="text-center p-4 bg-red-100 rounded-lg max-w-md mx-auto mt-4">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-5">
          {cameras.map((camera) => {
            const videoUrl = camera.port
              ? `http://${camera.ipAddress}:${camera.port}/video`
              : `http://${camera.ipAddress}/video`;

            return (
              <div
                key={camera._id}
                className="border p-4 shadow-lg text-center rounded-xl relative"
              >
                {loading && camera._id === selectedCamera?._id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                    <ClipLoader size={30} color="#FFFFFF" />
                  </div>
                )}
                
                <h3 className="text-2xl font-bold">{camera.cameraName}</h3>
                <p className="text-gray-600">Location: {camera.location}</p>
                <p className="text-gray-600">IP: {camera.ipAddress}</p>

                <div
                  className="cursor-pointer mt-3"
                  onClick={() => setSelectedCamera(camera)}
                >
                  <div className="overflow-hidden w-full h-[250px]">
                    <iframe
                      src={videoUrl}
                      className="w-[500%] h-[500%] scale-[0.2] transform origin-top-left border-none rounded-md"
                      allowFullScreen
                      scrolling="no"
                    ></iframe>
                  </div>
                  <p className="text-sm mt-1 text-blue-500 hover:underline">
                    Click to View
                  </p>
                </div>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2"
                  onClick={() => handleDeleteCamera(camera._id)}
                  disabled={loading}
                >
                  {loading && camera._id === selectedCamera?._id ? (
                    <ClipLoader size={15} color="#FFFFFF" />
                  ) : (
                    'Delete Camera'
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      {selectedCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-90 font-mono">
          <div className="relative bg-[#0f0f0f] border shadow-xl p-6 rounded-lg w-[95%] max-w-5xl">
            <button
              className="absolute right-4 text-white text-3xl transition"
              onClick={() => setSelectedCamera(null)}
              disabled={loading}
            >
              ×
            </button>

            <div className="text-center mb-4 border-b pb-2">
              <h2 className="text-3xl font-bold uppercase text-white tracking-wider">Surveillance Feed</h2>
              <p className="mt-2 text-sm text-white">
                Location: <span className="font-bold">{selectedCamera.location}</span> | IP:{" "}
                <span className="font-bold">{selectedCamera.ipAddress}</span>
              </p>
            </div>

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <ClipLoader size={50} color="#FFFFFF" />
              </div>
            )}

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
  );
};

export default Camera;
