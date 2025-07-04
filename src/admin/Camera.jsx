import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Camera = () => {
  const [cameras, setCameras] = useState([]);
  const { user } = useAuth();
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/fetch-cameras')
      .then((res) => setCameras(res.data))
      .catch((err) => console.error('Error fetching cameras:', err));
  }, []);

  const handleDeleteCamera = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete-camera/${id}`, {
        params: { adminId: user?.id, adminName: user?.name }
      });
      setCameras(cameras.filter((camera) => camera._id !== id));
    } catch (error) {
      console.error('Error deleting camera:', error);
    }
  };

  return (
    <>
      <div className="test p-4 mt-[100px]">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-semibold">List of Cameras</h1>
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-5">
          {cameras.map((camera) => {
            const videoUrl = camera.port
              ? `http://${camera.ipAddress}:${camera.port}/video`
              : `http://${camera.ipAddress}/video`;

            return (
              <div
                key={camera._id}
                className="border p-4 shadow-lg text-center rounded-xl"
              >
                <h3 className="text-2xl font-bold">{camera.cameraName}</h3>
                <p className="text-gray-600">Location: {camera.location}</p>
                <p className="text-gray-600">IP: {camera.ipAddress}</p>

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

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-2"
                  onClick={() => handleDeleteCamera(camera._id)}
                >
                  Delete Camera
                </button>
              </div>
            );
          })}
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
  );
};

export default Camera;
