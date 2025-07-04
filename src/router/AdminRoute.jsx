import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import { useAuth } from '../context/AuthContext';
import { CircleLoader  } from 'react-spinners';

const AdminRoute = ({children}) => {

  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
      return (
      
          <div className=' flex justify-center items-center h-screen w-full'>
          <CircleLoader color='#3b82f6' />
          
        </div>
      )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    // return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <AdminNav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminRoute
