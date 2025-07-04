import React ,{useState} from 'react'
import { PiSecurityCameraDuotone } from "react-icons/pi";
import { GiWantedReward } from "react-icons/gi";
import { TbPhotoSensor3 } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import axios from 'axios'
import Swal from 'sweetalert2';
import { GiCctvCamera } from "react-icons/gi";

const Home = () => {

  const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [description, setDescription] = useState();
  
    const handleSubmit =async (e)=>{
      e.preventDefault();
      try{
        const response = await axios.post('http://localhost:3001/contact',{email, phone, description});
        if(response){
          Swal.fire({
                        title: "Fugitive Data added successfully!",
                        icon: "success",
                        draggable: true
                      }).then(()=>{
                        window.location.reload();
                      });

        }

      } catch(err){
        console.log(err);
        alert(err);
      }
  
    }
  
  return (
    <div className='mt-10'>
      <div className=' bg-hero h-screen bg-center w-full bg-cover bg-no-repeat 
      '>
        <div className=' gap-2 inset-10 bg-black/40 backdrop-blur-sm w-full h-full flex justify-center items-center text-white flex-col'>
        <h1 className='text-4xl md:text-8xl font-bold flex flex-row'>Wellcome to <span className='bg-blue-600 rounded-2xl p-2 md:text-5xl text-2xl flex'>FRFLR<GiCctvCamera /></span></h1>
        <h2 className='text-2xl md:text-6xl sm:mx-20 md:w-full text-center  font-bold'>The First Face Recognition System</h2>
        <h3 className='text-2xl md:text-6xl sm:mx-20 md:w-full text-center  font-bold'>In Ethiopia</h3>

        </div>
        
      </div>
      <div className='container mt-8'>
        <h1 className='text-center font-bold text-4xl'>FRFLF</h1>
        <div className='flex mt-4 gap-5 md:flex-row flex-col-reverse items-center'>
          <div className='flex-1'>
            <img className='rounded-lg' src="/frr.png" alt="" />
          </div>
          <div className=' flex-1 items-center justify-center flex flex-col'>
            <h1 className='text-3xl'>Facial Recognition For Legal Force</h1>
            <p className='text-wrap'>
              FRFLF is a cutting-edge technology that enables law enforcement
               agencies to identify suspects and victims more efficiently and securely.
               This system uses advanced facial recognition algorithms to
               identify criminals based on their unique features,
               making it more accurate and efficient than traditional methods.
            </p>
          </div>

        </div>
      </div>
      <div className='mt-8 bg-gray-100 py-2'>
        <h1 className='text-center font-bold text-4xl'>Our system</h1>
        <div className='flex md:flex-row flex-col items-center container py-4'>
          <div className='flex-1'>
            <img src="/face.png" className='md:w-[400px] md:h-[400px] w-[200px] h-[200px] rounded-2xl' alt="" />
          </div>
          <div className='flex-1 items-center'>
            <h2 className='mt-2 text-2xl md:text-4xl'>What our System does?</h2>
            <div className='mt-5 md:text-2xl text-xl py-2 gap-5'>
              <p className='flex items-center gap-2 mt-3'><PiSecurityCameraDuotone /> Supports Real-time IP Camera Feeds</p>
              <p className='flex items-center gap-2 mt-3'><GiWantedReward /> Identify Wanted Fugitives</p>
              <p className='flex items-center gap-2 mt-3'><TbPhotoSensor3 />
              Take the photo of Wanted Fugitives from real time camera </p>
              <p className='flex items-center gap-2 mt-3'><FaDatabase /> Store the captured data </p>
              <p className='flex items-center gap-2 mt-3'><FiAlertTriangle />Send Alert to the authorities </p>
            </div>

          </div>
        </div>
      </div>

      <div className='mt-8'>
      <h1 className='text-center font-bold text-4xl'>Demo</h1>
      </div>

      <div className='mt-8'>
      <h1 className='text-center font-bold text-4xl'>Testimonials</h1>
      <section className="bg-gray-100 py-16 mt-4 ">
      <div className="container mx-auto px-6 ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Users Say</h2>
        
        <div className="flex md:justify-center md:space-x-8 flex-col md:flex-row items-center gap-2">

          <div className="max-w-xs bg-white rounded-lg shadow-lg p-6">
            <img className="w-16 h-16 rounded-full mx-auto" src="ur1.png" alt="User 1" />
            <p className="text-center text-gray-700 mt-4">"This system has revolutionized how we track and identify individuals. It's efficient, reliable, and incredibly fast. The facial recognition feature is unmatched!"</p>
            <h4 className="mt-4 text-center font-semibold text-gray-900">Officer Lema Yadeta</h4>
            <p className="text-center text-gray-500">Police Officer</p>
          </div>

          <div className="max-w-xs bg-white rounded-lg shadow-lg p-6">
            <img className="w-16 h-16 rounded-full mx-auto" src="ur2.jpg" alt="User 2" />
            <p className="text-center text-gray-700 mt-4">"As an agent, the face recognition system has made it much easier to monitor and track criminal activities. It's intuitive and works seamlessly!"</p>
            <h4 className="mt-4 text-center font-semibold text-gray-900">Operator Abebe Alemu</h4>
            <p className="text-center text-gray-500">surveillance operator</p>
          </div>

          <div className="max-w-xs bg-white rounded-lg shadow-lg p-6">
            <img className="w-16 h-16 rounded-full mx-auto" src="ur3.jpg" alt="User 3" />
            <p className="text-center text-gray-700 mt-4">"The ability to verify suspects quickly with this system has saved valuable time. It’s an indispensable tool for our operations."</p>
            <h4 className="mt-4 text-center font-semibold text-gray-900">Admin Talegeta Biruk</h4>
            <p className="text-center text-gray-500">System Administrator</p>
          </div>
        </div>
      </div>
    </section>
      </div>

      <div className='mt-8'>
      <h1 className='text-center font-bold text-4xl'>contact</h1>
      <div className='container  '>
             
                  <div className='flex justify-center items-center mt-8'>
                     <form onSubmit={handleSubmit} className='border border-[#242234] flex md:flex-row flex-col p-8 gap-3 w-full rounded-2xl'>
                     <div className='flex-1'>
                     <label className='text-2xl font-semibold' htmlFor="">Enter your Email</label>
                       <input type="text" placeholder='example@gmail.com' onChange={(e)=>setEmail(e.target.value)} className='p-2 w-full border focus:outline-none' />
                       <label className='text-2xl font-semibold' htmlFor="">Phone</label>
                       <input type="tel" placeholder='+251-9xxxxxxxx' onChange={(e)=>setPhone(e.target.value)}  className=' p-2 w-full border focus:outline-none' />
                     </div>
                       <div className='flex-1'>
                       <label className='text-2xl font-semibold' htmlFor="">Description</label>
                       <textarea name="" placeholder='Enter details' id="" onChange={(e)=>setDescription(e.target.value)} className='p-2 w-full border focus:outline-none'></textarea>
                       <button className='bg-blue-500 w-full hover:bg-white hover:text-black py-3 font-bold text-white border-2 border-blue-500  rounded-2xl' type='submit'>Submit</button>
                       </div>
                     </form>
                  </div>
               
             </div>
      </div>
    </div>
  )
}

export default Home