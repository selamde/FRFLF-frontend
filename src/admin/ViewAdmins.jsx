import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewAdmins = () => {
    const [admins, setAdmins] = useState();

     useEffect(()=>{
        axios.get('http://localhost:3001/getAdmins')
        .then(result => setAdmins(result.data))
        .catch(err => console.log(err))
    },[]);
     const handleDisplay = (e, id)=>{
              e.preventDefault();
              axios(`http://localhost:3001/Adminprofile/${id}`)
              .then(result=>{
                  console.log(result.data);
                  Swal.fire({
                      title: "Massage!",
                     html: `
                      <div className="justify-center items-center flex-start">
                      <p><strong>Name:</strong> ${result.data.name}</p>
                      <p><strong>Email:</strong> ${result.data.email}</p>
                      <p><strong>Role:</strong> ${result.data.role}</p></div>
                    `,
                      imageUrl: `http://localhost:3001/${result.data.image}`,
                      imageWidth: 200,
                      imageHeight: 200,
                      imageAlt: "Custom image"
                    });
              })
             
          }
               const handleDelete = async(e, id)=>{
        e.preventDefault();
        try{
            const response = await axios.delete(`http://localhost:3001/admindelete/${id}`);
            console.log(response);
            if(response.status ===200){
                Swal.fire({
                    title: "Admin Deleted Successfully!",
                    icon: "success",
                    draggable: true
                  }).then(()=>{
                    window.location.reload();
                  });
            }

        }catch(err){
            console.log(err);

        }

      }

  return (
  <div className="container mx-auto px-4">
  <div className="mt-32">
    <h1 className="md:text-6xl text-4xl font-extrabold text-center text-gray-800 mb-10">
      Admins
    </h1>

    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {admins?.length ? (
        admins.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-gradient-to-r from-blue-950 to-blue-800 text-white rounded-2xl p-6 shadow-lg transition-transform hover:scale-[1.03] cursor-pointer"
          >
            <div
              onClick={(e) => handleDisplay(e, item._id)}
              className="flex items-center gap-5"
            >
              <img
                src={`http://localhost:3001/${item.image}`}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <h2 className="text-xl font-bold">Name: {item.name}</h2>
                <p className="text-md">Email: {item.email}</p>
                <p className="text-md">Role: {item.role}</p>
              </div>
            </div>

            
          </div>
        ))
      ) : (
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold text-gray-600">No Data Found</h1>
        </div>
      )}
    </div>
  </div>
</div>

  )
}

export default ViewAdmins