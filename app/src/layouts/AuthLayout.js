// AuthLayout.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import Spinner from '../components/Spinner';


const AuthLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
