import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user, setUser } = useContext(AuthContext);
  const username = localStorage.getItem("username");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!user && username && jwt) {
      setUser({ username: username, jwt: jwt });
    }
  }, [user, username, jwt, setUser]);

  return user || username || jwt ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
