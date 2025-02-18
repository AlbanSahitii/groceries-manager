// AuthLayout.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
