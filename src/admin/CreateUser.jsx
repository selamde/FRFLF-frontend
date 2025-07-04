import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
const CreateUser = () => {
  const {user} = useAuth();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [image, setImage] = useState();

     const handleSubmit = async (e)=>{
            e.preventDefault();
             const formData = new FormData();
             formData.append('name', name);
             formData.append('email', email);
             formData.append('password', password);
             formData.append('role', role);
             formData.append('adminId', user?.id);
             formData.append('adminName', user?.name);
             if(image){
               formData.append('image', image);
             }
    
            try{
              const response = await axios.post('https://frflf-backend.onrender.com/create-user', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              if(response.status === 200){
                Swal.fire({
                  title: "user added successfully!",
                  icon: "success",
                  draggable: true
                }).then(()=>{
                  window.location.reload();
                });
              }
              console.log(response.data);
            }catch(err){
                Swal.fire({
                    title: "Error!",
                    text: err.response?.data?.error || "Failed to create user",
                    icon: "error"
                  });
              console.log(err);
            }
    
    
          }
    
  return (
    <div className='container  '>
    <div className='mt-32 flex justify-center items-center'>
      <div className='border-2 border-[#242234] flex flex-col w-[500px] h-wrap p-5 rounded-2xl mb-5'>
          <h1 className='text-center font-bold text-2xl '>Create User</h1>
          <form onSubmit={handleSubmit} action="" className='flex flex-col mt-5 gap-3 '>
              <label className='font-semibold text-xl' htmlFor="">Name</label>
              <input type="text" name="name" id="" className='p-2 border border-blue-500 w-full focus:outline-none focus:border-2' value={name} onChange={(e)=> setName(e.target.value)}/>
              <label className='font-semibold text-xl' htmlFor="">Email</label>
              <input type="email" name="email" id="" className='p-2 border border-blue-500 w-full focus:outline-none focus:border-2'  value={email} onChange={(e)=> setEmail(e.target.value)} />
              <label className='font-semibold text-xl' htmlFor="">Password</label>
              <input type="password" name="password" id="" className='p-2 border border-blue-500 w-full focus:outline-none focus:border-2' value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <label className='font-semibold text-xl' htmlFor="">Role</label>
              <select name="role" className='p-2 border border-blue-500 w-full focus:outline-none focus:border-2' required value={role} onChange={(e)=> setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="police">Police</option>
              <option value="operator">Operator</option>
              
            </select>
              <label className='font-semibold text-xl' htmlFor="">profile</label>
              <input type="file" name="image" id="" className='p-2 border border-blue-500 w-full focus:outline-none focus:border-2' onChange={(e) => setImage(e.target.files[0])}  required/>
            <button type='submit' className='mt-6 bg-blue-600 text-white text-2xl font-bold py-4 rounded-3xl shadow-lg hover:bg-blue-700 transition'>Create</button>
          </form>
      </div>
    </div>
  </div>
  )
}

export default CreateUser
