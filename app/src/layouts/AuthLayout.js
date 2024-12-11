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

    if (!user && username && jwt && userId) {
      setUser({ username, jwt, userId });
    }
    setIsLoading(false); // Mark loading as complete
  }, [user, setUser]);


  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
