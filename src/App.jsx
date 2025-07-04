import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './components/Footer'
import { useAuth } from './context/AuthContext';
import { CircleLoader  } from 'react-spinners';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {

    const { user, isAuthenticated, loading } = useAuth();
  
    if (loading) {
        return (
        
            <div className=' flex justify-center items-center h-screen w-full'>
         <CircleLoader color='#3b82f6' />
            
          </div>
        )
    }
  
     if (!isAuthenticated || user?.role !== 'police') {
       return <Navigate to="/login" replace />;
     }

  
  return (
    <>
     <div>

     <Header />

      <main className='min-h-screen'>
        <Outlet />
      </main>
      <footer>
       <Footer />
      </footer>
     </div>
        
    </>
  )
}

export default App
