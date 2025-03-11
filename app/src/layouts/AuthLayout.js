import React, {useContext, useEffect} from "react";
import {AuthContext} from "../context/AuthContext";
import {Outlet, Navigate} from "react-router-dom";
import Spinner from "../components/Spinner";

const AuthLayout = () => {
  const {user, setUser, loading} = useContext(AuthContext);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt && (!user || user.jwt !== jwt)) {
      setUser(prevUser => ({
        ...prevUser,
        jwt: jwt,
      }));
    }
  }, [localStorage.getItem("jwt")]);

  if (loading) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthLayout;
