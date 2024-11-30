import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const login = async (data) => {
        try {
          await axios.post('http://localhost:3080/api/user/login', data)
          .then(response => {  
              localStorage.setItem('username', data.username)
              localStorage.setItem('jwt', response.data.jwt)
              setUser({username: data.username, jwt: response.data.jwt})
              navigate('/profile') 
          })

      } catch (error) {
          console.log(error)
      }

    }

  return (
    <AuthContext.Provider value={{ user, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
