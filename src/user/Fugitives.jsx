import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FiSearch } from 'react-icons/fi';

const Fugitives = () => {
  const [fugitive, setFugitives] = useState([]);
  const [query, setQuery] = useState('');
      const [result, setResults] = useState([]);

  useEffect(()=>{
    axios.get(`https://frflf-backend.onrender.com/getCriminal`)
    .then(result => setFugitives(result.data))
    .catch((err) => console.log(err))
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
  
  return (
    <div className='container  '>
      <div className='mt-32'>
        <h1 className='md:text-6xl text-4xl font-bold text-center'>Wanted</h1>
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
                  <button type="submit" onClick={handleSearch} className="bg-red-500 rounded-full px-3 py-3 mt-2 ">
                  <FiSearch className="text-white text-xl   " />
        
                </button>
        
                </div>
                
              </div>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-2 mt-8 '>
          {
            result.length > 0 ? (result.map((fugitive, index) => (
              <div key={index} className='flex items-center flex-wrap bg-[#242234] mb-8 gap-4 p-4 rounded'>
                <div className='w-full h-[300px] flex flex-shrink-0 items-center justify-center overflow-hidden rounded'>
                  <img  src={`http://localhost:3001/${fugitive.imagePath}`} 
                  className='w-full h-full object-cover '
                  />
                </div>
                <div className='w-full flex justify-between items-center text-white'>
                  <h2 className='mt-4 mb-4 text-xl font-bold'>{fugitive.fullName}</h2>
                  <Link to={`/viewdetails/${fugitive._id}`} className='bg-white px-5 py-2 rounded-full text-black mt-4 hover:bg-blue-500 hover:shadow-2xl hover:text-white'>View details</Link>
                </div>
              </div>
            ))) : (
            fugitive.map((fugitive, index) => (
              <div key={index} className='flex items-center flex-wrap bg-[#242234] mb-8 gap-4 p-4 rounded'>
                <div className='w-full h-[300px] flex flex-shrink-0 items-center justify-center overflow-hidden rounded'>
                  <img  src={`http://localhost:3001/${fugitive.imagePath}`} 
                  className='w-full h-full object-cover '
                  />
                </div>
                <div className='w-full flex justify-between items-center text-white'>
                  <h2 className='mt-4 mb-4 text-xl font-bold'>{fugitive.fullName}</h2>
                  <Link to={`/viewdetails/${fugitive._id}`} className='bg-white px-5 py-2 rounded-full text-black mt-4 hover:bg-blue-500 hover:shadow-2xl hover:text-white'>View details</Link>
                </div>
              </div>
            ))
          )
          }
          
        </div>
      </div>
    </div>
  )
}

export default Fugitives
