// GuestLayout.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
const GuestLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />
  }

  return !user ? <Outlet /> : <Navigate to="/profile" />;
};

export default GuestLayout;
