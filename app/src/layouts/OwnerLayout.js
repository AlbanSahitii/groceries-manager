import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';

const OwnerLayout = () => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
      return <Spinner />
    }
  
    return user.userType === "Owner" ? <Outlet /> : <Navigate to="/profile" />;
  
}

export default OwnerLayout