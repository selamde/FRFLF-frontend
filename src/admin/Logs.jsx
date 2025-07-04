import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const Logs = () => {
    const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/admin/logs') 
      .then(res => setLogs(res.data))
      .catch(err => console.error('Error fetching logs:', err));
  }, []);

  return (
   <div className='container mx-auto px-4 mt-32'>
  <h1 className='flex gap-3 items-center justify-center mb-8'>
    <p className='font-extrabold text-4xl text-gray-800'>Admin Logs</p>
    <img src="../log.png" alt="Log Icon" className='w-[40px] h-[40px]' />
  </h1>

  <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
  <div className="max-h-[400px] overflow-y-auto">
    <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
      <thead className="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th className="px-6 py-3 text-gray-600 font-semibold bg-gray-100 sticky top-0 z-10">Admin_id</th>
          <th className="px-6 py-3 text-gray-600 font-semibold bg-gray-100 sticky top-0 z-10">Admin_name</th>
          <th className="px-6 py-3 text-gray-600 font-semibold bg-gray-100 sticky top-0 z-10">Action</th>
          <th className="px-6 py-3 text-gray-600 font-semibold bg-gray-100 sticky top-0 z-10">Target</th>
          <th className="px-6 py-3 text-gray-600 font-semibold bg-gray-100 sticky top-0 z-10">Description</th>
          <th className="px-6 py-3 text-gray-600 font-semibold bg-gray-100 sticky top-0 z-10">Timestamp</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {logs.map((log, index) => (
          <tr key={index} className="hover:bg-gray-50 transition duration-200">
            <td className="px-6 py-4 text-gray-700">{log.adminId.slice(0,10)}...</td>
             <td className="px-6 py-4 text-gray-700">{log.adminName}</td>
            <td className="px-6 py-4 text-blue-600 font-medium">{log.action}</td>
            <td className="px-6 py-4 text-gray-700">{log.target}</td>
            <td className="px-6 py-4 text-gray-700">{log.description}</td>
            <td className="px-6 py-4 text-gray-500">
              {new Date(log.timestamp).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

</div>

  )
}

export default Logs