import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import About from '../user/About';
import Fugitives from '../user/Fugitives'
import Home from '../user/Home';
import Contact from '../user/Contact';
import Report from '../user/Report';
import Dashboard from '../admin/Dashboard';
import FugitiveList from '../admin/FugitiveList';
import AddCamera from '../admin/AddCamera';
import Camera from '../admin/Camera'
import AdminRoute from './AdminRoute';
import AddFugitive from '../admin/AddFugitive';
import SeeContact from '../admin/SeeContact';
import CriminalList from '../admin/CriminalList';
import ViewDetails from '../user/ViewDetails';
import SeeReport from '../admin/SeeReport';
import UpdateCriminal from '../admin/UpdateCriminal';
import FugitiveData from '../admin/FugitiveData';
import Login from '../Login';
import CreateUser from '../admin/CreateUser';
import ViewProfile from '../user/ViewProfile';
import UpdateProfile from '../user/UpdateProfile';
import ViewAdmins from '../admin/ViewAdmins';
import ViewUsers from '../admin/ViewUsers';
import ViewAdminProfile from '../admin/ViewAdminProfile';
import Logs from '../admin/Logs';
import Match from '../admin/Match';
import Operator from '../operator/Operator';
import OperatorRoute from './OperatorRoute';
import EditProfile from '../admin/EditProfile';
import ViewOperator from '../admin/ViewOperator';
import EditAdminProfile from '../admin/EditAdminProfile';
import MatchedForOp from '../operator/MatchedForOp';

const router = createBrowserRouter([
   {
     path: '/',
     element: <App />,
     children: [
       {
        path: '/',
        element: <Home />
       },
       {
        path: '/about',
        element: <About />
       },
       {
        path: '/fugitive',
        element: <Fugitives />
       },
       {
        path:'/contact',
        element: <Contact />
       },
       {
        path: '/report',
        element: <Report />
       },
       {
        path:'/viewdetails/:id',
        element: <ViewDetails />
       },
       {
        path: '/viewprofile/:id',
        element: <ViewProfile />
       },
       {
        path: '/updateprofile/:id',
        element: <UpdateProfile />

       }
   

     ]
   },
   {
    path: '/dashboard',
    element: <AdminRoute />,
    children: [
      {
        path: '', 
        element: <Dashboard />
      },
      {
        path: 'matcheddata', 
        element: <FugitiveList />
      },
      {
        path: 'addfugitive', 
        element: <AddFugitive />
      },
      {
        path: 'camera',
        element: <Camera />
      },
      {
        path: 'addcamera',
        element: <AddCamera />
      },
      {
        path:'seeContact',
        element: <SeeContact />
      },
      {
        path:'criminallist',
        element: <CriminalList />
      },
      {
        path:'seeReport',
        element: <SeeReport />
      },
      {
        path:'updateCriminal/:id',
        element: <UpdateCriminal />
      },
      {
        path:'fugitiveData/:id',
        element: <FugitiveData />
      },
      {
        path:'createusers',
        element: <CreateUser />
      },
      {
        path:'viewadmins',
        element: <ViewAdmins />
      },
      {
        path: 'adminprofile/:id',
        element: <ViewAdminProfile />
      },
      {
        path:'viewusers',
        element: <ViewUsers />
      },
      {
        path:'logshow',
        element: <Logs />
      },
      {
        path:'match/:name',
        element: <Match />
      },
      {
        path: 'editprofile/:id',
        element: <EditProfile />
      },
      {
        path:'viewoperators',
        element:<ViewOperator />
      },
      {
       path: 'editadminprofile/:id',
       element: <EditAdminProfile />
      }
      
    ]
  },
  {
    path:'/operator',
    element: <OperatorRoute />,
    children:[
     {
       path: '',
       element: <Operator />
     },
     { 
      path: 'matchedop', 
      element: <MatchedForOp />
    }
    ]
  },
  {
    path:'/login',
    element: <Login />
  }
  

])


export default router;

