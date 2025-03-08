// AuthLayout.js
import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {Outlet, Navigate} from "react-router-dom";
import Spinner from "../components/Spinner";
import {jwtDecode} from "jwt-decode";

const AuthLayout = () => {
  const {user, loading, logout} = useContext(AuthContext);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const isTokenExpired = token => {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        alert("Your session has expired");
        logout();
      }
      return;
    };
    isTokenExpired(jwt);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
