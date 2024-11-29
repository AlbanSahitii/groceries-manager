import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  const login = async (data) => {
        try {
          await axios.post('http://localhost:3080/api/user/login', data)
          .then(response => {  
            const userData = {
              username: data.username,
              jwt:response.data.jwt
            }
              setUser(userData)
              localStorage.setItem('userData', JSON.stringify(userData));
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
