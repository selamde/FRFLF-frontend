import React,{useState} from 'react'
import { MdReportGmailerrorred } from "react-icons/md"
import axios from 'axios';
import Swal from 'sweetalert2';

const Report = () => {
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [des, setDes] = useState("");

  const  handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('location', location);
    formData.append('description', des);
    if(photo){
      formData.append('photo', photo);
    }

    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-report`, formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.status === 200){
       Swal.fire({
                     title: "Report sent successfully!",
                     icon: "success",
                     draggable: true
                   }).then(()=>{
                     window.location.reload();
                   });
      }
      console.log(response.data);
    }catch(err){
      console.log(err);
    }

  }

  return (
    <div className='container  '>
      <div className='mt-32'>
        <h1 className='md:text-6xl text-2xl font-semibold text-center '>Report</h1>
       <h2 className='flex gap-2 text-4xl items-center '><MdReportGmailerrorred />Report Suspects</h2>
         <div className='flex justify-center items-center mt-8'>
            <form onSubmit={ handleSubmit} className='border border-[#242234] flex flex-col  p-8 gap-3 w-[500px]'>
              <label className='text-2xl font-semibold' htmlFor="">Location</label>
              <input type="text" placeholder='Enter the location' value={location} onChange={(e)=> setLocation(e.target.value)} className='p-2 w-full border focus:outline-none' />
              <label className='text-2xl font-semibold' htmlFor="">Photo</label>
              <input type="file" accept=".jpg, .jpeg, .png" name='photo' onChange={(e)=> setPhoto(e.target.files[0])} className='bg-blue-300  hover:text-black text-white hover:bg-white p-2  border-black border ' />
              <label className='text-2xl font-semibold' htmlFor="">Description</label>
              <textarea name="" id="" placeholder='enter details' value={des} onChange={(e)=> setDes(e.target.value)} className='p-2 w-full border focus:outline-none'></textarea>
              <button className='bg-blue-500 hover:bg-white hover:text-black py-3 font-bold text-white border-2 border-blue-500  rounded-2xl' type='submit'>Submit</button>
            </form>
         </div>
      </div>
    </div>
  )
}

export default Report
