// GuestLayout.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const GuestLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Replace with a loading spinner or placeholder
  }

  return !user ? <Outlet /> : <Navigate to="/profile" />;
};

export default GuestLayout;
