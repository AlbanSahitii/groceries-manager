import React, { useContext, useEffect } from "react";
import {AuthContext} from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
    const {user, setUser} = useContext(AuthContext);
    const jwt = localStorage.getItem('jwt')
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    if(!user && username && jwt) {
        console.log(!user);
        setUser({jwt,username, userId})
    }
    
    return !user?.username || !jwt || !user?.userId ?  <Outlet/> :  <Navigate to="/profile" />
}

export default GuestLayout