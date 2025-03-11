import React, {createContext, useEffect, useState, useContext} from "react";
import {createPath, useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    const familyId = localStorage.getItem("familyId");
    const userType = localStorage.getItem("userType");
    if (jwt && username && userId) {
      setUser({jwt, username, userId, familyId, userType});
    }

    setLoading(false);
  }, []);

  const register = async data => {
    await api
      .post("/user/register", data)
      .then()
      .catch(error => console.log(error));
  };
  const refreshToken = async () => {
    const res = await api.post("/user/refresh_token");
    const newJwt = res.data;

    localStorage.setItem("jwt", newJwt);

    setUser(prevUser => ({
      ...prevUser,
      jwt: newJwt,
    }));
    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("familyId");
    navigate("/login");
  };

  const login = async data => {
    try {
      await api.post("/user/login", data).then(response => {
        localStorage.setItem("username", data.username);
        localStorage.setItem("jwt", response.data.jwt);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("userId", response.data.userId);
        setUser({
          username: data.username,
          jwt: response.data.jwt,
          userType: response.data.userType,
          userId: response.data.userId,
        });
        navigate("/profile");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateContext = (field, value) => {
    setUser(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const sessionExpireError = error => {
    if (error.status === 401) {
      alert("Your session has expired");
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        sessionExpireError,
        logout,
        user,
        setUser,
        login,
        register,
        updateContext,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
