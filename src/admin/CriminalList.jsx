import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const CriminalList = () => {
    const [criminal, setCriminal] = useState([]);
    const [query, setQuery] = useState('');
    const [result, setResults] = useState([]);
    const {user} = useAuth();

    useEffect(()=>{
        axios.get('https://frflf-backend.onrender.com/getCriminal')
        .then(result => setCriminal(result.data))
        .catch(err => console.error(err));

    },[]);

    const handleSearch = async (e)=>{
      e.preventDefault();
      try{
     const res = await axios.get(`https://frflf-backend.onrender.com/search?q=${query}`);
     setResults(res.data);
      }catch(err){
        console.error("Search error", err);
      }

    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try{
          const response = await axios.delete(`https://frflf-backend.onrender.com/delete-list/${id}`, {params: { adminId: user?.id, adminName: user?.name } });
          console.log(response);
          if(response.status === 200){
           
            Swal.fire({
              position: "center",
              icon: "success",
              title: "list deleted successfully!",
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              window.location.reload();
            });
          }
    
        }catch(err){
          console.log(err);
        }
    }

  return (
    <div className="p-4 mt-[100px]">
     
      <h1 className="text-4xl font-semibold text-center">Fugitive Lists</h1>
      <div className='flex gap-2 items-center w-full justify-center mt-5  '>
        <div className='flex gap-3 items-center justify-center px-3 py-2 rounded-3xl w-[500px] bg-gray-100'>

           <input
                type="text"
                placeholder="Search criminal name..."
                value={query}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuery(value);
                  if (value.trim() === '') {
                    setResults([]);
            }
          }}      
         
          className="bg-white  px-4 py-2 mt-2 outline-blue-500 rounded-2xl flex-2"
        />
          <button type="submit" onClick={handleSearch} className="bg-blue-500 rounded-full px-3 py-3 mt-2 ">
          <FiSearch className="text-white text-xl   " />

        </button>

        </div>
        
      </div>
       
      {
      result.length > 0 ?  
      (
    <div className="grid grid-cols-3 gap-5 mt-5 p-5">
      {
        result.map((item, index) => (
          <div key={item._id || index} className='border-2 border-red-700 p-4 rounded-2xl'>
            <div className='flex gap-5 items-center border-b-2 p-2 mb-4 '>
              {item.imagePath && (
                <img 
                  src={`http://localhost:3001/${item.imagePath}`}
                  alt='data'
                  className='w-[100px] h-[100px] object-cover'
                />
              )}
              <h1 className='text-md font-bold uppercase '>Name: {item.fullName}</h1>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-3'>
                <Link to={`/dashboard/updateCriminal/${item._id}`} className='text-md bg-green-500 text-white p-2 rounded-xl  hover:bg-white hover:text-black border hover:border-green-500'>Update</Link>
                <Link to={`/dashboard/fugitiveData/${item._id}`} className='text-md px-3 py-2 bg-blue-500 text-white  rounded-xl  hover:bg-white hover:text-black border hover:border-blue-500'>View</Link>
                <button className='text-md bg-red-500 text-white p-2 rounded-xl hover:bg-white hover:text-black border hover:border-red-500' onClick={(e)=> handleDelete(e, item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
            :(
              <div className="grid grid-cols-3 gap-5 mt-5 p-5">

        {
            criminal? criminal.map((item, index)=>(
                <div key={index}  className='border-2 border-red-700 p-4'>
                <div className='flex gap-5 items-center border-b-2 p-2 mb-4'>
                    {
                        item.imagePath&& (
                            <img 
                            src={`http://localhost:3001/${item.imagePath}`}
                            alt='data'
                            className='w-[100px] h-[100px] object-cover' />

                        )
                    }
                    
                    <h1 className='text-md font-bold uppercase '>Name: {item.fullName}</h1>
                </div>
                <div className='flex flex-col gap-4'>
                   <div className='flex gap-4'>
                    <Link to={`/dashboard/updateCriminal/${item._id}`} className='text-md bg-green-500 text-white p-2 rounded-xl  hover:bg-white hover:text-black border hover:border-green-500'>Update</Link>
                    <Link to={`/dashboard/fugitiveData/${item._id}`} className='text-md px-3 py-2 bg-blue-500 text-white  rounded-xl  hover:bg-white hover:text-black border hover:border-blue-500'>View</Link>
                    <Link to={`/dashboard/match/${item.fullName.toLowerCase()}`} className='text-md px-3 py-2 bg-blue-500 text-white  rounded-xl  hover:bg-white hover:text-black border hover:border-blue-500'>Matched data</Link>
                    <button className='text-md bg-red-500 text-white p-2 rounded-xl hover:bg-white hover:text-black border hover:border-red-500' onClick={(e)=> handleDelete(e, item._id)}>Delete</button>
                   </div>
                   
                </div>
            </div>

            )):(<p className='mt-10'>No Data Available</p>)
        }


      </div>
            )
     }
      
    </div>
  )
}

export default CriminalList
