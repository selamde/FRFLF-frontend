import React, { useState, useEffect } from 'react'
import { IoTerminal } from 'react-icons/io5';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoLocationOutline } from "react-icons/io5";
import { TiInfoOutline } from "react-icons/ti";
import { useAuth } from '../context/AuthContext';

const SeeReport = () => {
  const {user} = useAuth();
  const [reports, setReports] = useState();

  const fetchReports = async () => {
  try {
    const result = await axios.get('https://frflf-backend.onrender.com/getreport');
    setReports(result.data);
  } catch (err) {
    console.log(err);
  }
};


  useEffect(() => {
  fetchReports();
}, []);
   
     
     const handleCheck = async (e, id) => {
  e.preventDefault();
  try {
    const response = await axios.patch(`https://frflf-backend.onrender.com/checkreport/${id}`);
    if (response.status === 200) {
      Swal.fire({
        title: "Marked as Checked!",
        icon: "success",
        timer: 3000
      });
      fetchReports(); 
    }
  } catch (err) {
    console.log(err);
    Swal.fire({
      title: "Error",
      text: err.message,
      icon: "error"
    });
  }
};
 
  
      const handleDelete = async(e, id)=>{
          e.preventDefault();
          const adminId = user.id;
          try{
              const response = await axios.delete(`https://frflf-backend.onrender.com/checkreport/${id}`, { params: { adminId, adminName: user.name } });
              console.log(response);
              if(response.status ===200){
                  Swal.fire({
                      title: "Report Deleted Successfully!",
                      icon: "success",
                      draggable: true,
                      timer: 5000,  
                    }).then(()=>{
                      window.location.reload();
                    });
              }
  
          }catch(err){
              console.log(err);
  
          }
      }
      const handleDisplay = (e, id)=>{
          e.preventDefault();
          axios(`https://frflf-backend.onrender.com/fetchreport/${id}`)
          .then(result=>{
              console.log(result.data);
              Swal.fire({
                  title: "Report!",
                  imageUrl:`https://frflf-backend.onrender.com/${result.data.photo}`,
                  html: ` <div style="text-align:left; font-size:16px;">
                    <p style="textSize=10px"><strong>📍 Location:</strong> ${result.data.location}</p>
                    <p><strong>📝 Description:</strong> ${result.data.description}</p>
                </div> `,
                  imageWidth: 200,
                  imageHeight: 200,
                  imageAlt: "Custom image"
                });
          })
         
      }
  
    return (
     <div className="container mx-auto px-4">
  <div className="mt-32">
    <h1 className="md:text-5xl text-3xl font-bold text-center text-blue-600 mb-10">Reports</h1>

    {reports?.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl duration-300 border"
          >
            <div onClick={(e) => handleDisplay(e, report._id)} className="cursor-pointer">
              <img
                src={`https://frflf-backend.onrender.com/${report.photo}`}
                alt="Report"
                className="w-full h-60 object-cover"
              />
            </div>
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <IoLocationOutline className="text-2xl text-blue-500" />
                {report.location}
              </h2>
              <p className="text-gray-600 text-base flex items-start gap-2 line-clamp-3">
                <TiInfoOutline className="text-xl text-indigo-500 mt-1" />
                {report.description}
              </p>
              <div className="flex justify-end pt-4">
                <button
                  onClick={(e) => handleCheck(e, report._id)}
                  disabled={report.checked}
                  className={`px-4 py-2 rounded-lg transition duration-300 font-semibold ${
                    report.checked
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500"
                  }`}
                >
                  {report.checked ? "Checked" : "Check"}
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-500">No Data Found</h1>
        <div className="flex justify-center mt-4">
          <IoTerminal className="text-8xl text-gray-300" />
        </div>
      </div>
    )}
  </div>
</div>

    )
}

export default SeeReport
