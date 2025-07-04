import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import a spinner component

const Dashboard = () => {
  const [cameraCount, setCameraCount] = useState(0);
  const [fugitiveCount, setFugitiveCount] = useState(0);
  const [message, setMessage] = useState(0);
  const [criminalCount, setCriminalCount] = useState(0);
  const [countReport, setCountReport] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [policeCount, setPoliceCount] = useState(0);
  const [operatorCount, setOperator] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates after unmount

    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          messageRes,
          criminalRes,
          reportRes,
          cameraRes,
          adminRes,
          policeRes,
          operatorRes,
          fugitiveRes
        ] = await Promise.all([
          axios.get('https://frflf-backend.onrender.com/getmessage'),
          axios.get('https://frflf-backend.onrender.com/criminal-count'),
          axios.get('https://frflf-backend.onrender.com/report-count'),
          axios.get('https://frflf-backend.onrender.com/camera-count'),
          axios.get('https://frflf-backend.onrender.com/admin-count'),
          axios.get('https://frflf-backend.onrender.com/police-count'),
          axios.get('https://frflf-backend.onrender.com/operator-count'),
          axios.get('https://frflf-backend.onrender.com/matched-image-count')
        ]);

        if (isMounted) {
          setMessage(messageRes.data.countMessage);
          setCriminalCount(criminalRes.data.criminalCount);
          setCountReport(reportRes.data.reportCount);
          setCameraCount(cameraRes.data.count);
          setAdminCount(adminRes.data.countad);
          setPoliceCount(policeRes.data.countpl);
          setOperator(operatorRes.data.countop);
          setFugitiveCount(fugitiveRes.data.count);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAllData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <ClipLoader size={50} color="#3B82F6" />
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 mt-24 bg-gray-50">
      <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-7xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-4xl mt-4 font-bold uppercase text-gray-700">
          Facial <span className="text-blue-600">Recognition</span> For Legal Force
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {[
          { title: "Cameras", count: cameraCount ?? 0, link: "camera", linkText: "View Cameras" },
          { title: "Captured Data", count: fugitiveCount ?? 0, link: "matcheddata", linkText: "View Data" },
          { title: "Messages / Contacts", count: message ?? 0, link: "seeContact", linkText: "View Messages" },
          { title: "Number of Fugitives", count: criminalCount ?? 0, link: "criminallist", linkText: "View Fugitives" },
          { title: "Number of Reports", count: countReport ?? 0, link: "seeReport", linkText: "View Reports" },
          { title: "Number of Admins", count: adminCount ?? 0, link: "viewadmins", linkText: "View Admins" },
          { title: "Number of Police", count: policeCount ?? 0, link: "viewusers", linkText: "View Police" },
          { title: "Number of Operator", count: operatorCount ?? 0, link: "viewoperators", linkText: "view Operator" }
        ].map(({ title, count, link, linkText }, idx) => (
          <div
            key={idx}
            className="bg-blue-200 rounded-xl border-2 border-black shadow-md hover:shadow-xl transition-shadow flex flex-col justify-center items-center p-8 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4 ">{title}</h2>
            <p className="text-5xl font-extrabold mb-6 ">{count}</p>
            <Link
              to={link}
              className="text-lg font-medium text-blue-600 hover:underline hover:text-blue-800 transition-colors"
            >
              {linkText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard;
