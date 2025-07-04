import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [cameraCount, setCameraCount] = useState(0);
  const [fugitiveCount, setFugitiveCount] = useState(0);
  const [message, setMessage] = useState(0);
  const [criminalCount, setCriminalCount] = useState(0);
  const [countReport, setCountReport] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [policeCount, setPoliceCount] = useState(0);
  const [operatorCount, setOperator] = useState(0);
  const [loading, setLoading] = useState(true); // 👈 Add loading state

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          messageRes,
          criminalRes,
          reportRes,
          cameraRes,
          adminRes,
          policeRes,
          operatorRes,
          matchedRes,
        ] = await Promise.all([
          axios.get('https://frflf-backend.onrender.com/getmessage'),
          axios.get('https://frflf-backend.onrender.com/criminal-count'),
          axios.get('https://frflf-backend.onrender.com/report-count'),
          axios.get('https://frflf-backend.onrender.com/camera-count'),
          axios.get('https://frflf-backend.onrender.com/admin-count'),
          axios.get('https://frflf-backend.onrender.com/police-count'),
          axios.get('https://frflf-backend.onrender.com/operator-count'),
          axios.get('https://frflf-backend.onrender.com/matched-image-count'),
        ]);

        setMessage(messageRes.data.countMessage);
        setCriminalCount(criminalRes.data.criminalCount);
        setCountReport(reportRes.data.reportCount);
        setCameraCount(cameraRes.data.count);
        setAdminCount(adminRes.data.countad);
        setPoliceCount(policeRes.data.countpl);
        setOperator(operatorRes.data.countop);
        setFugitiveCount(matchedRes.data.count);
      } catch (err) {
        console.error('Dashboard data fetch failed:', err);
      } finally {
        setLoading(false); // ✅ Stop loading in all cases
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="min-h-screen p-8 mt-24 bg-gray-50">
      <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-7xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-4xl mt-4 font-bold uppercase text-gray-700">
          Facial <span className="text-blue-600">Recognition</span> For Legal Force
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { title: "Cameras", count: cameraCount, link: "camera", linkText: "View Cameras" },
            { title: "Captured Data", count: fugitiveCount, link: "matcheddata", linkText: "View Data" },
            { title: "Messages / Contacts", count: message, link: "seeContact", linkText: "View Messages" },
            { title: "Number of Fugitives", count: criminalCount, link: "criminallist", linkText: "View Fugitives" },
            { title: "Number of Reports", count: countReport, link: "seeReport", linkText: "View Reports" },
            { title: "Number of Admins", count: adminCount, link: "viewadmins", linkText: "View Admins" },
            { title: "Number of Police", count: policeCount, link: "viewusers", linkText: "View Police" },
            { title: "Number of Operator", count: operatorCount, link: "viewoperators", linkText: "View Operator" }
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
      )}
    </div>
  );
};

export default Dashboard;
