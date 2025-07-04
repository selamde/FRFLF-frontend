import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{

        const initializeAuth = async ()=>{
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        const image = localStorage.getItem('image');
        const id = localStorage.getItem('id');

        if(token && username && role){
            try{

                await axios.get('http://localhost:3001/validate-token', {
                    headers: { Authorization: `Bearer ${token}` }
                  });

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                  setUser({name: username, role, image,id});
                  setIsAuthenticated(true);


            }catch(err){
                logout();
            }

        }
        setLoading(false);

        }

        initializeAuth();

    },[]);

    const login = ({ token, username, role, image, id }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        localStorage.setItem('image', image);
        localStorage.setItem('id', id);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser({ name: username, role, image,id });
        setIsAuthenticated(true);
    };

    const logout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('isLoggedIn');
       delete axios.defaults.headers.common['Authorization'] ;
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();

    }

      const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, loading,updateUser }} >
            {children }
        </AuthContext.Provider>
    );
    

}
export const useAuth =()=> useContext(AuthContext);