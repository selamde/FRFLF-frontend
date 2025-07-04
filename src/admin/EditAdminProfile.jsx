import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const EditAdminProfile = () => {

     const [name, setName] = useState('');
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [role, setRole] = useState('');
            const [image, setImage] = useState(null);
            const {id} = useParams();
            const [loading, setLoading] = useState(true);
            const { updateUser} = useAuth();
            const navigate = useNavigate();
              const { user, isAuthenticated, logout} = useAuth();
        
            useEffect(()=>{
                axios.get(`https://frflf-backend.onrender.com/getusData/${id}`)
                .then(result => {
                    setName(result.data.name);
                    setEmail(result.data.email);
                    setRole(result.data.role);
                    setLoading(false);
                    console.log(result.data);
                })
                .catch(err => {console.log(err)
                    setLoading(false);
                });
            },[]);
    
            const handleUpdate = async (e)=>{
            e.preventDefault();
             const formData = new FormData();
             formData.append('name', name);
             formData.append('email', email);
             formData.append('role', role);
             formData.append('password', password);
             
             if(image) {
                console.log("Image file to upload:", image);
                formData.append('image', image);
            } else {
                console.log("No new image selected");
            }
    
            try{
              const response = await axios.post(`https://frflf-backend.onrender.com/profile-update/${id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              if(response.status === 200){
                        const updatedUser = {
                            name: response.data.name,
                            role: response.data.role,
                            image: response.data.image,
                            id: response.data.id
                        };
                   
               
                Swal.fire({
                  title: "profile edited successfully!",
                  icon: "success",
                  draggable: true
                })
                logout();
                
              }
              console.log(response.data);
            }catch(err){
              console.log(err);
              Swal.fire({
                title: "Error updating profile",
                text: err.message,
                icon: "error"
            });
            }
    
    
          }


  return (
    <div className='container  '>
    <div className='mt-32 flex justify-center items-center'>
      <div className='border-2 border-[#242234] flex flex-col w-[500px] h-wrap p-5 rounded-2xl mb-5'>
          <h1 className='text-center font-bold text-2xl '>Update profile</h1>
          <form onSubmit={handleUpdate} action="" className='flex flex-col mt-5 gap-3 '>
              <label className='font-semibold text-xl' htmlFor="">Name</label>
              <input type="text" name="name" id="" className='p-2 border border-[#242234] w-full focus:outline-none focus:border-2' value={name} onChange={(e)=> setName(e.target.value)}/>
              <label className='font-semibold text-xl' htmlFor="">Email</label>
              <input type="email" name="email" id=""  className='p-2 border border-[#242234] w-full focus:outline-none focus:border-2'  value={email} onChange={(e)=> setEmail(e.target.value)} />
              <label className='font-semibold text-xl' htmlFor="">Password</label>
              <input type="password" name="password" id="" className='p-2 border border-[#242234] w-full focus:outline-none focus:border-2' value={password} onChange={(e)=> setPassword(e.target.value)}/>
              <label className='font-semibold text-xl' htmlFor="">Role</label>
              <select name="role" className='p-2 border border-[#242234] w-full focus:outline-none focus:border-2' disabled required value={role} onChange={(e)=> setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="police">Police</option>  
               <option value="operator">Operator</option>             
            </select>
              <label className='font-semibold text-xl' htmlFor="">profile</label>
              <input type="file" name="image" accept='image/*' id="" className='p-2 border border-[#242234] w-full focus:outline-none focus:border-2' onChange={(e) => setImage(e.target.files[0])}/>
            <button type='submit' className='bg-green-600 border text-white hover:text-black hover:border-green-600 hover:bg-white p-4 rounded-2xl text-xl  text-center'>Edit data</button>
          </form>
      </div>
    </div>
  </div>
  )
}

export default EditAdminProfile
