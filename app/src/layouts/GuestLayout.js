import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');
        if (!user && username && jwt) {
            setUser({ jwt, username, userId });
        }
    }, []);

    return !user?.username || !user?.jwt || !user?.userId ? <Outlet /> : <Navigate to="/profile" />;
};

export default GuestLayout;
