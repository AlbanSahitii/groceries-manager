import React, { createContext, useEffect, useState } from "react";
import { createPath, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const familyId = localStorage.getItem('familyId');
    const userType = localStorage.getItem('userType')
   
    
    if (jwt && username && userId) {
      const fetchData = async () => {
        await checkUser({username:username, jwtToken: jwt})
      }
  
      fetchData()
      setUser({ jwt, username, userId, familyId, userType });
    }
    setLoading(false);
  }, []);


  const register = async (data) => {

      await axios.post('http://localhost:3080/api/user/register', data)
      .then()
      .catch(error => console.log(error))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    localStorage.removeItem('userType')
    localStorage.removeItem('familyId')
    navigate('/login')
  }

  const login = async (data) => {
        try {
          await axios.post('http://localhost:3080/api/user/login', data)
          .then(response => { 
              localStorage.setItem('username', data.username)
              localStorage.setItem('jwt', response.data.jwt)
              localStorage.setItem('userType', response.data.userType)
              localStorage.setItem('userId', response.data.userId)
              setUser({username: data.username, jwt: response.data.jwt, userType: response.data.userType, userId: response.data.userId})
              navigate('/profile') 
          })

      } catch (error) {
          console.log(error)
      }
  }

  const checkUser = async (data) => {
    setLoading(true)
      try {
        await axios.post('http://localhost:3080/api/user/validateUser', data)
        .then(response => { 
          if(response.data === "User doesnt exist" || response.data === "Information missing" || response.data === "Invalid JWT token"){
            logout()
          }
        })

    } catch (error) {
        console.log(error)
    }
    setLoading(false)

  }


  const updateContext = (field, value) => {
      setUser(prevState => ({
        ...prevState,
        [field]: value
      }));
    };
  

  return (
    <AuthContext.Provider value={{loading, logout, user, setUser, login, register, updateContext, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};
