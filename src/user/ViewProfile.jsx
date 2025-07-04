import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ViewProfile = () => {
    const [user, setUser] = useState();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`https://frflf-backend.onrender.com/getuData/${id}`)
        .then(result => {
            setUser(result.data);
            setLoading(false);
            console.log(result.data);
        })
        .catch(err => {console.log(err)
            setLoading(false);
        });
    },[]);

  return (
    <div className="p-4 md:m-[100px] mt-[100px]">
    <div className="flex flex-col   ">
        {
            loading ? (
                <div>Loading...</div>
            ):(
                <div className='w-full'>
                    <div className='flex md:flex-row  flex-col items-center  gap-10 border-b border-blue-500 p-2 mb-4'>
                        <div>
                            <img className='w-[200px] h-[200px] rounded-full' src={`http://localhost:3001/${user.image}`} alt="" />
                        </div>
                        <div>
                            <h1 className='md:text-4xl text-2xl font-bold'>{user.name}</h1>
                            <p>{user.role}</p>
                            </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <p className='text-2xl'><span className='font-bold text-blue-500'>Name: </span>{user.name}</p>
                        <p className='text-2xl'><span className='font-bold text-blue-500'>Role: </span>{user.role}</p>
                        <p className='text-2xl'><span className='font-bold text-blue-500 '>Password: </span>{user.password.slice(0,10)} <span className='text-red-500'>(Password encrypted)</span></p>
                        <Link to={`/updateprofile/${user._id}`} className='bg-green-600 w-[200px] text-center p-2 rounded-md text-xl hover:bg-white border hover:border-gray-600 hover:text-green-600 text-white font-bold'>Update profile</Link>
                    </div>
                </div>
            )
        }
    
    </div>

</div>
  )
}

export default ViewProfile
