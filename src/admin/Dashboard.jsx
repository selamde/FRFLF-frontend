import React, { useEffect, useState } from 'react'
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

  useEffect(()=>{

    const fetchMessage = async ()=>{
      try{
        const res = await axios.get('http://localhost:3001/getmessage');
        setMessage(res.data.countMessage);
        console.log(res.data.countMessage);

      }catch(error){
        console.log(error);
      }

    }

    const fetchCriminalCount = async ()=>{
      try{
        const res = await axios.get('http://localhost:3001/criminal-count');
        setCriminalCount(res.data.criminalCount);
        console.log(res.data.criminalCount);

      }catch(error){
        console.log(error);
      }

    }

    const fetchReport = async ()=>{
      try{
        const res = await axios.get('http://localhost:3001/report-count');
        setCountReport(res.data.reportCount);
        console.log(res.data.reportCount);

      }catch(error){
        console.log(error)
      }

    }
    const fetchData= async()=>{
      try{
        const res = await axios.get('http://localhost:3001/camera-count');
        setCameraCount(res.data.count);
        console.log(res.data.count);

      }catch(error){
        console.log(error);

      }
    }

    const fetchAdmin = async ()=>{
      try{
        const res = await axios.get('http://localhost:3001/admin-count');
        setAdminCount(res.data.countad);
        console.log(res.data.countad);
      }catch(error){
        console.log(error);

      }
    }
    
    const fetchPolice = async ()=>{
      try{
        const res = await axios.get('http://localhost:3001/police-count');
        setPoliceCount(res.data.countpl);
        console.log(res.data.countpl);

      }catch(error){
        console.log(error);

      }
    }

    const fetchOperator = async ()=>{
      try{
        const res = await axios.get('http://localhost:3001/operator-count');
        setOperator(res.data.countop);
        console.log(res.data.countop);

      }catch(error){
        console.log(error);

      }
    }

    fetchData();  
    fetchMessage();
    fetchCriminalCount();
    fetchReport();
    fetchAdmin();
    fetchPolice();
    fetchOperator();

  },[]);


   useEffect(() => {
    axios.get('http://localhost:3001/matched-image-count')
      .then(res => setFugitiveCount(res.data.count))
      .catch(err => console.log('Error fetching matched image count:', err));
  }, []);
  
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

export default Dashboard