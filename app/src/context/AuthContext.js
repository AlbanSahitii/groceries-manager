import React, { createContext, useState } from "react";
import { createPath, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const register = async (data) => {

      await axios.post('http://localhost:3080/api/user/register', data)
      .then()
      .catch(error => console.log(error))
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
    console.log(data);
      try {
        await axios.post('http://localhost:3080/api/user/validateUser', data)
        .then(response => { 
          if(response.data === "User doesnt exist" || response.data === "Information missing" || response.data === "Information is invalid"){
            setUser(null)
            localStorage.clear()
            alert('deleted succesfully')
            navigate('/login') 
          }
        })

    } catch (error) {
        console.log(error)
    }

  }


  const updateContext = (field, value) => {
      setUser(prevState => ({
        ...prevState,
        [field]: value
      }));
    };
  

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, updateContext, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};
