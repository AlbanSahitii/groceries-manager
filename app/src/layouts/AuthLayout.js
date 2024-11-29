import React, { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import Login from "../components/LoginPage/Login";

const AuthLayout = () => {
    const {user} = useContext(AuthContext);
    const userData = localStorage.getItem('userData')
    return user || userData ? <Outlet/> : <Login/>
}

export default AuthLayout