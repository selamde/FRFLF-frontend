import React from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar';
import AdminHeader from './admin/AdminHeader';
import OperatorHeader from './operator/OperatorHeader';

const Header = () => {
    const location = useLocation();
    const {pathname} = location;
  if(pathname.startsWith === ('/dashboard')){
    return <AdminHeader />
  }
  else if (pathname.startsWith === ('/dashboard')){
  return <OperatorHeader />
  }else {
    return <Navbar />
  }

}

export default Header