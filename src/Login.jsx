import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import axios from 'axios';

const Login = () => {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const {login} = useAuth();
    
    const handleLogin = async (e)=>{
      e.preventDefault();

    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL }/login`,{name, password});
      console.log("Response:", response);
      if(response.status === 200){
  
        const {token, name, role, image, id} = response.data;
        login({token, username:name, role, image, id});
  

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
     
        if(role === 'admin'){
            navigate('/dashboard', { replace: true });
        }else if (role === 'police'){
            navigate('/', { replace: true });
        }else if (role === 'operator') {
            navigate('/operator', { replace: true });
        }
        
      }
    
    }catch(error){
      console.log("Error:", error.response?.data);
      alert(error.response?.data?.message || 'Login Failed');
  
    }
  
    }
  return (
     <div className='container  '>
          <div className='mt-32 flex justify-center items-center'>
            <div className='border-2 border-blue-500 flex flex-col w-[500px] h-wrap p-5 rounded-2xl'>
                <h1 className='text-center font-bold text-2xl '>Login</h1>
                <form action="" onSubmit={handleLogin} className='flex flex-col mt-5 gap-3'>
                    <label className='font-semibold text-xl' htmlFor="">Name</label>
                    <input type="text" name="name" id="" className='p-2 border border-blue-500 w-full focus:outline-none focus:border-2' value={name} onChange={(e)=> setName(e.target.value)} />
                    <label className='font-semibold text-xl' htmlFor="">Password</label>
                    <input type="password" name="password" id="" className='p-2 border border-blue-500 w-full focus:outline-none focus:border-2' value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <button type='submit' className='bg-blue-500 border text-white hover:text-black hover:border-blue-500 hover:bg-white p-4 rounded-2xl text-xl'>Login</button>
                </form>
            </div>
          </div>
        </div>
  )
}

export default Login
