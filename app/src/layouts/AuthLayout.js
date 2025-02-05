import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user, setUser, checkUser } = useContext(AuthContext);
  const username = localStorage.getItem('username')
  useEffect(() => {
    if(user){
      const data = {
        username: user.username,
        jwtToken: user.jwt
      }
      checkUser(data)
    }
  }, [0]);



  
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
