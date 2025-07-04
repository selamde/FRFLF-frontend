import React, { useState, useEffect } from 'react'
import { IoTerminal } from 'react-icons/io5';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoLocationOutline } from "react-icons/io5";
import { TiInfoOutline } from "react-icons/ti";
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners';

const SeeReport = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({
    check: null,
    delete: null,
    display: null
  });
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get('https://frflf-backend.onrender.com/getreport');
      setReports(result.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load reports. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCheck = async (e, id) => {
    e.preventDefault();
    try {
      setActionLoading({...actionLoading, check: id});
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
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error"
      });
    } finally {
      setActionLoading({...actionLoading, check: null});
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      setActionLoading({...actionLoading, delete: id});
      const response = await axios.delete(
        `https://frflf-backend.onrender.com/checkreport/${id}`,
        { params: { adminId: user.id, adminName: user.name } }
      );
      
      if (response.status === 200) {
        Swal.fire({
          title: "Report Deleted Successfully!",
          icon: "success",
          timer: 3000
        });
        setReports(reports.filter(report => report._id !== id));
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error"
      });
    } finally {
      setActionLoading({...actionLoading, delete: null});
    }
  };

  const handleDisplay = async (e, id) => {
    e.preventDefault();
    try {
      setActionLoading({...actionLoading, display: id});
      const result = await axios.get(`https://frflf-backend.onrender.com/fetchreport/${id}`);
      
      Swal.fire({
        title: "Report Details",
        imageUrl: `https://frflf-backend.onrender.com/${result.data.photo}`,
        html: `
          <div style="text-align:left; font-size:16px;">
            <p><strong>📍 Location:</strong> ${result.data.location}</p>
            <p><strong>📝 Description:</strong> ${result.data.description}</p>
            <p><strong>📅 Date:</strong> ${new Date(result.data.createdAt).toLocaleString()}</p>
          </div>
        `,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "Report image"
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Failed to load report details",
        icon: "error"
      });
    } finally {
      setActionLoading({...actionLoading, display: null});
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ClipLoader size={50} color="#3B82F6" />
          <p className="mt-4 text-xl font-semibold text-gray-700">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (error && reports.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
          <p className="text-red-600 font-semibold">{error}</p>
          <button 
            onClick={fetchReports}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mt-32">
        <h1 className="md:text-5xl text-3xl font-bold text-center text-blue-600 mb-10">Reports</h1>

        {reports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl duration-300 border relative"
              >
                {actionLoading.display === report._id && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <ClipLoader size={30} color="#FFFFFF" />
                  </div>
                )}

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
                  <div className="flex justify-between pt-4">
                    <button
                      onClick={(e) => handleDelete(e, report._id)}
                      disabled={actionLoading.delete === report._id}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                    >
                      {actionLoading.delete === report._id ? (
                        <>
                          <ClipLoader size={15} color="#FFFFFF" />
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                    <button
                      onClick={(e) => handleCheck(e, report._id)}
                      disabled={report.checked || actionLoading.check === report._id}
                      className={`px-4 py-2 rounded-lg transition duration-300 font-semibold flex items-center gap-2 ${
                        report.checked
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      {actionLoading.check === report._id ? (
                        <>
                          <ClipLoader size={15} color="#FFFFFF" />
                          Processing...
                        </>
                      ) : report.checked ? (
                        'Checked'
                      ) : (
                        'Mark as Checked'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <h1 className="text-4xl font-bold text-gray-500">No Reports Found</h1>
            <div className="flex justify-center mt-4">
              <IoTerminal className="text-8xl text-gray-300" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeReport;
