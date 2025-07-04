import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ViewDetails = () => {
    const [fugitive, setFugitive] = useState(null);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`https://frflf-backend.onrender.com/get-criminal-list/${id}`)
        .then(result => {
            setFugitive(result.data)
            console.log(result)
        })
        .catch(err => console.log(err))
    },[]);

  return (
    <div className='container border-4 border-red-600 md:h-[980px] p-5  md:w-[800px] mt-32'>
        <div className='flex flex-col items-center justify-center '>
           <div className='flex items-center w-full gap-10  bg-red-600 mb-5 p-3'>
           <img src="../images.png" className='w-[100px] h-[100px]' alt="police_logo" />
           <p className='font-secondary text-xl md:text-5xl text-white' >Wanted by the EFDRE police</p>
           </div>
            <h1 className='font-secondary md:text-7xl text-2xl'>Wanted</h1>  
        </div>
        
        {
           fugitive? (
        <div className='' >
            <div className=' mb-7 flex flex-col md:gap-5 justify-center items-center font-secondary'>
            <h1 className='text-5xl w-full text-center text-red-500'>{fugitive.fullName}</h1>
            <p className='text-red-500 text-2xl'>{fugitive.charges}</p>
            <img src={`https://frflf-backend.onrender.com/${fugitive.imagePath}`} className='w-[200px] h-[200px] rounded-2xl' alt="fugitive" />
               
        </div>
        <div className='mb-7'>
            <p className='font-secondary text-2xl text-red-500 text-center'>Description:</p>
            <table className='border-2  border-black w-full' >
          
                <tbody>
                <tr>
                    <td className='border p-0.5 border-black w-1/2 '><span className='font-bold'>Full-Name:</span> {fugitive.fullName}</td>
                    <td className='border p-0.5 border-black w-1/2 '><span className='font-bold'>Date of Birth:</span> {fugitive.dob}</td>
                </tr>
                <tr>
                    <td className='border p-0.5 border-black'><span className='font-bold'>Hair:</span> {fugitive.hair}</td>
                    <td className='border p-0.5 border-black'><span className='font-bold'>Height:</span> {fugitive.height} </td>
                </tr>
                <tr>
                    <td className='border p-0.5 border-black'> <span className='font-bold'>Gender: </span>{fugitive.gender}</td>
                    <td className='border p-0.5 border-black'><span className='font-bold'>Weight:</span> {fugitive.weight} </td>
                </tr>
                <tr>
                    <td className='border p-0.5 border-black'><span className='font-bold'>Palce of Birth: </span> {fugitive.pob}</td>
                    <td className='border p-0.5 border-black'><span className='font-bold'>Eyes: </span>  {fugitive.eyes} </td>
                </tr>
                <tr>
                    <td className='border p-0.5 border-black'><span className='font-bold'>Last Seen Location: </span>  {fugitive.lastSeenLocation}</td>
                    <td className='border p-0.5 border-black'><span className='font-bold'>Nationality: </span>  {fugitive.nationality} </td>
                </tr>
                </tbody>            
            </table>

        </div>
        <div className='mb-5'>
            <p className='font-secondary text-2xl text-red-500 text-center'>Caution</p>
            <p>{fugitive.caution}</p>
        </div>
        <div className='font-secondary '>
            <p>Date:{fugitive?.dateAdded?.slice(0, 10)}</p>
        </div>
        </div>
           ):(<p>No Data in the system!</p>)

        
        }

    </div>
  )
}

export default ViewDetails
