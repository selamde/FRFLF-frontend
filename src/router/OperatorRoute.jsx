import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircleLoader  } from 'react-spinners';
import OperatorHeader from '../operator/OperatorHeader';

const OperatorRoute = () => {
   const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
      return (
          <div className=' flex justify-center items-center h-screen w-full'>
          <CircleLoader color='#3b82f6' />
        </div>
      )
  }

  if (!isAuthenticated || user?.role !== 'operator') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <OperatorHeader />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default OperatorRoute
