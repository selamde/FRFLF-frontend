import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const FugitiveData = () => {
    const [fugitive, setFugitive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchFugitiveData = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await axios.get(`https://frflf-backend.onrender.com/get-criminal-list/${id}`);
                setFugitive(result.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load fugitive data. Please try again.');
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to load fugitive data',
                    icon: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchFugitiveData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-32">
                <div className="text-center">
                    <ClipLoader size={50} color="#dc2626" /> {/* Red color matching your theme */}
                    <p className="mt-4 text-xl font-semibold text-gray-700">Loading fugitive data...</p>
                </div>
            </div>
        );
    }

    if (error && !fugitive) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-32">
                <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
                    <p className="text-red-600 font-semibold">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!fugitive) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-32">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-700">No data available for this fugitive</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container border-4 border-red-600 md:h-[980px] p-5 md:w-[800px] mt-32 mx-auto'>
            <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center w-full gap-10 bg-red-600 mb-5 p-3'>
                    <img src="../../images.png" className='w-[100px] h-[100px]' alt="police_logo" />
                    <p className='font-secondary text-xl md:text-5xl text-white'>Wanted by the EFDRE police</p>
                </div>
                <h1 className='font-secondary md:text-7xl text-2xl'>Wanted</h1>  
            </div>
            
            <div>
                <div className='mb-7 flex flex-col md:gap-5 justify-center items-center font-secondary'>
                    <h1 className='text-5xl w-full text-center text-red-500'>{fugitive.fullName}</h1>
                    <p className='text-red-500 text-2xl'>{fugitive.charges}</p>
                    {fugitive.imagePath ? (
                        <img 
                            src={`https://frflf-backend.onrender.com/${fugitive.imagePath}`} 
                            className='w-[200px] h-[200px] rounded-2xl object-cover' 
                            alt={fugitive.fullName} 
                        />
                    ) : (
                        <div className='w-[200px] h-[200px] rounded-2xl bg-gray-200 flex items-center justify-center'>
                            <span className='text-gray-500'>No Image</span>
                        </div>
                    )}
                </div>
                
                <div className='mb-7'>
                    <p className='font-secondary text-2xl text-red-500 text-center'>Description:</p>
                    <table className='border-2 border-black w-full'>
                        <tbody>
                            <tr>
                                <td className='border p-0.5 border-black w-1/2'><span className='font-bold'>Full-Name:</span> {fugitive.fullName}</td>
                                <td className='border p-0.5 border-black w-1/2'><span className='font-bold'>Date of Birth:</span> {fugitive.dob}</td>
                            </tr>
                            <tr>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Hair:</span> {fugitive.hair}</td>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Height:</span> {fugitive.height}</td>
                            </tr>
                            <tr>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Gender:</span> {fugitive.gender}</td>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Weight:</span> {fugitive.weight}</td>
                            </tr>
                            <tr>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Place of Birth:</span> {fugitive.pob}</td>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Eyes:</span> {fugitive.eyes}</td>
                            </tr>
                            <tr>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Last Seen Location:</span> {fugitive.lastSeenLocation}</td>
                                <td className='border p-0.5 border-black'><span className='font-bold'>Nationality:</span> {fugitive.nationality}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div className='mb-5'>
                    <p className='font-secondary text-2xl text-red-500 text-center'>Caution</p>
                    <p className='text-center'>{fugitive.caution || 'No caution information available'}</p>
                </div>
                
                <div className='font-secondary text-right'>
                    <p>Date: {fugitive?.dateAdded?.slice(0, 10) || 'Unknown'}</p>
                </div>
            </div>
        </div>
    );
};

export default FugitiveData;
