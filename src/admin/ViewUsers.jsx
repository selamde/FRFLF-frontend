import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewUsers = () => {
  const [users, setUsers] = useState();
  
       useEffect(()=>{
          axios.get('https://frflf-backend.onrender.com/allUsers')
          .then(result => setUsers(result.data))
          .catch(err => console.log(err))
      },[]);

     const handleDisplay = (e, id)=>{
              e.preventDefault();
              axios(`https://frflf-backend.onrender.com/Policeprofile/${id}`)
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
                      imageUrl: `https://frflf-backend.onrender.com/${result.data.image}`,
                      imageWidth: 200,
                      imageHeight: 200,
                      imageAlt: "Custom image"
                    });
              })
             
          }
    const handleDelete = async(e, id)=>{
        e.preventDefault();
         try{
             const response = await axios.delete(`https://frflf-backend.onrender.com/pdelete/${id}`);
             console.log(response);
             if(response.status ===200){
                 Swal.fire({
                     title: "police Deleted Successfully!",
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
      Police Officers
    </h1>

    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {users?.length ? (
        users.map((item, index) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-gradient-to-r from-blue-950 to-blue-800 text-white rounded-2xl p-6 shadow-lg transition-transform hover:scale-[1.01]"
          >
            <div
              onClick={(e) => handleDisplay(e, item._id)}
              className="flex items-center gap-4 cursor-pointer"
            >
              <img
                src={`https://frflf-backend.onrender.com/${item.image}`}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
              />
              <div>
                <h2 className="text-xl font-bold"> Name: {item.name}</h2>
                <p className="text-md"> Email: {item.email}</p>
                <p className="text-md"> Role: {item.role}</p>
              </div>
            </div>

           <div className='gap-2 flex justify-center'>
             <Link to={`/dashboard/editprofile/${item._id}`}
              className="bg-green-600 hover:bg-white hover:text-green-600  px-5 py-2 rounded-xl transition-all font-semibold"
              
            >
              Edit
            </Link>
            <button
              className="bg-red-600 hover:bg-white hover:text-red-600 border border-red-600 px-5 py-2 rounded-xl transition-all font-semibold"
              onClick={(e) => handleDelete(e, item._id)}
            >
              Delete
            </button>
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

export default ViewUsers
