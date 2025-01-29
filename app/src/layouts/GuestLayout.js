import React, { useContext } from "react";
import {AuthContext} from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
    const {user, setUser} = useContext(AuthContext);
    const username =  localStorage.getItem('username')
    const jwt =  localStorage.getItem('jwt')
    const userId =  localStorage.getItem('userId')
    const userType = localStorage.getItem('userType')
    const familyId = localStorage.getItem('familyId')


    if(!user && username && jwt && userId && userType) {
        setUser({username: username, jwt:jwt, userId: userId, userType: userType, familyId:familyId})
    }
    if(user && !username & !jwt) {
        localStorage.setItem('jwt', user.jwt)
        localStorage.setItem('username', user.username)
        localStorage.setItem('userId', user.userId)
        localStorage.setItem('userType', user.userType)
    }



    return !user ?  <Outlet/> :  <Navigate to="/profile" />
}

export default GuestLayout