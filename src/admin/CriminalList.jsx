import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners';

const CriminalList = () => {
    const [criminal, setCriminal] = useState([]);
    const [query, setQuery] = useState('');
    const [result, setResults] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCriminals = async () => {
            try {
                setLoading(true);
                const result = await axios.get('https://frflf-backend.onrender.com/getCriminal');
                setCriminal(result.data || []);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to load criminals. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCriminals();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setResults([]);
            return;
        }

        try {
            setSearchLoading(true);
            const res = await axios.get(`https://frflf-backend.onrender.com/search?q=${query}`);
            setResults(res.data || []);
        } catch (err) {
            console.error("Search error", err);
            Swal.fire('Error', 'Search failed. Please try again.', 'error');
            setResults([]);
        } finally {
            setSearchLoading(false);
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            setDeleteLoading(id);
            const response = await axios.delete(`https://frflf-backend.onrender.com/delete-list/${id}`, {
                params: { adminId: user?.id, adminName: user?.name }
            });
            
            if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "List deleted successfully!",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    setCriminal(criminal.filter(item => item._id !== id));
                    setResults(result.filter(item => item._id !== id));
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire('Error', 'Failed to delete criminal.', 'error');
        } finally {
            setDeleteLoading(null);
        }
    }

    const displayData = result.length > 0 ? result : criminal;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-[100px]">
                <div className="text-center">
                    <ClipLoader size={50} color="#3B82F6" />
                    <p className="mt-4 text-xl font-semibold text-gray-700">Loading criminals...</p>
                </div>
            </div>
        );
    }

    if (error && criminal.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center mt-[100px]">
                <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
                    <p className="text-red-600 font-semibold">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 mt-[100px]">
            <h1 className="text-4xl font-semibold text-center">Fugitive Lists</h1>
            
            <div className='flex gap-2 items-center w-full justify-center mt-5'>
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
                        className="bg-white px-4 py-2 mt-2 outline-blue-500 rounded-2xl flex-2"
                    />
                    <button 
                        type="submit" 
                        onClick={handleSearch} 
                        className="bg-blue-500 rounded-full px-3 py-3 mt-2"
                        disabled={searchLoading}
                    >
                        {searchLoading ? (
                            <ClipLoader size={20} color="#FFFFFF" />
                        ) : (
                            <FiSearch className="text-white text-xl" />
                        )}
                    </button>
                </div>
            </div>

            {searchLoading && (
                <div className="text-center mt-4">
                    <ClipLoader size={30} color="#3B82F6" />
                    <p className="mt-2">Searching...</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 p-5">
                {displayData.length > 0 ? (
                    displayData.map((item) => (
                        <div key={item._id} className='border-2 border-red-700 p-4 rounded-2xl relative'>
                            {deleteLoading === item._id && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
                                    <ClipLoader size={30} color="#FFFFFF" />
                                </div>
                            )}
                            
                            <div className='flex gap-5 items-center border-b-2 p-2 mb-4'>
                                {item.imagePath && (
                                    <img 
                                        src={`https://frflf-backend.onrender.com/${item.imagePath}`}
                                        alt={item.fullName}
                                        className='w-[100px] h-[100px] object-cover'
                                    />
                                )}
                                <h1 className='text-md font-bold uppercase'>Name: {item.fullName}</h1>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-wrap gap-2'>
                                    <Link 
                                        to={`/dashboard/updateCriminal/${item._id}`} 
                                        className='text-md bg-green-500 text-white p-2 rounded-xl hover:bg-white hover:text-black border hover:border-green-500'
                                    >
                                        Update
                                    </Link>
                                    <Link 
                                        to={`/dashboard/fugitiveData/${item._id}`} 
                                        className='text-md px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-white hover:text-black border hover:border-blue-500'
                                    >
                                        View
                                    </Link>
                                    {!result.length > 0 && (
                                        <Link 
                                            to={`/dashboard/match/${item.fullName.toLowerCase()}`} 
                                            className='text-md px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-white hover:text-black border hover:border-blue-500'
                                        >
                                            Matched data
                                        </Link>
                                    )}
                                    <button 
                                        className='text-md bg-red-500 text-white p-2 rounded-xl hover:bg-white hover:text-black border hover:border-red-500'
                                        onClick={(e) => handleDelete(e, item._id)}
                                        disabled={deleteLoading === item._id}
                                    >
                                        {deleteLoading === item._id ? (
                                            <ClipLoader size={15} color="#FFFFFF" />
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center py-10">
                        {query ? 'No matching criminals found' : 'No criminals available'}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CriminalList;
