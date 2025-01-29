import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const jwt = localStorage.getItem("jwt");
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem('userType')
    const familyId = localStorage.getItem('familyId')

    if (!user && username && jwt && userId && userType) {
      setUser({ username, jwt, userId,userType, familyId });
    }
    setIsLoading(false);
  }, [user, setUser]);


  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
