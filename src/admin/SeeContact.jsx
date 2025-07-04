import React, { useState, useEffect } from 'react'
import { IoTerminal } from 'react-icons/io5';
import axios from 'axios';
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import Swal from 'sweetalert2';

const SeeContact = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true); // ⏳ loader state

  useEffect(() => {
    axios.get('https://frflf-backend.onrender.com/getcontact')
      .then(result => {
        setContact(result.data);
        setLoading(false); // ✅ stop loading
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // ❌ also stop loading on error
      });
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`https://frflf-backend.onrender.com/delete/${id}`);
      if (response.status === 200) {
        Swal.fire({
          title: "Message Deleted Successfully!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDisplay = (e, id) => {
    e.preventDefault();
    axios(`https://frflf-backend.onrender.com/getmessage/${id}`)
      .then(result => {
        Swal.fire({
          title: "Message!",
          html: `<p><strong>Description:</strong> ${result.data.description}</p>
                 <p><strong>Email:</strong> ${result.data.email}</p>
                 <p><strong>Phone:</strong> ${result.data.phone}</p>`,
          imageUrl: "../message.svg",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image"
        });
      });
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mt-32">
        <h1 className="md:text-6xl text-4xl font-bold text-center text-blue-600 mb-8">Contacts</h1>

        {/* 🔁 Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {contact.length ? (
              contact.map((item, index) => (
                <div
                  key={item._id}
                  className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6 mb-6 flex justify-between items-start gap-4 border border-blue-100 hover:shadow-2xl transition duration-300"
                >
                  <div onClick={(e) => handleDisplay(e, item._id)} className="space-y-3 flex-1 cursor-pointer">
                    <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-3">
                      <MdAttachEmail className="text-2xl text-blue-500" />
                      {item.email}
                    </h2>
                    <p className="text-lg text-gray-700 flex items-center gap-3">
                      <FaPhoneVolume className="text-xl text-green-600" />
                      {item.phone}
                    </p>
                    <p className="text-base text-gray-600 flex items-center gap-3">
                      <MdOutlineMessage className="text-xl text-purple-500" />
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleDelete(e, item._id)}
                    className="bg-red-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-white hover:text-red-500 border border-red-500 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center mt-10">
                <h1 className="text-4xl font-bold text-gray-500">No Data Found</h1>
                <div className="flex justify-center mt-4">
                  <IoTerminal className="text-8xl text-gray-300" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeeContact;
