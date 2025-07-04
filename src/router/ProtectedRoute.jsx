// ProtectedRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircleLoader } from 'react-spinners';

const ProtectedRoute = ({children}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen w-full'>
        <CircleLoader color='#3b82f6' />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;