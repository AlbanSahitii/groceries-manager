import React, { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
    const {user, setUser} = useContext(AuthContext);
    const username =  localStorage.getItem('username')
    const jwt =  localStorage.getItem('jwt')
    const userId =  localStorage.getItem('userId')

    if(!user && username && jwt) {
        setUser({username: username, jwt:jwt, userId: userId})
    }
    if(user && !username & !jwt) {
        localStorage.setItem('jwt', user.jwt)
        localStorage.setItem('username', user.username)
        localStorage.setItem('userId', user.userId)
    }



    return !user ?  <Outlet/> :  <Navigate to="/profile" />
}

export default GuestLayout