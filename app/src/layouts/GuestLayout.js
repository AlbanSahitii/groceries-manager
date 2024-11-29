import React, { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
    const {user} = useContext(AuthContext);
    const userData = localStorage.getItem('userData')

    return !user || !userData ? <Outlet/> : <Navigate to="/login"/>
}

export default GuestLayout