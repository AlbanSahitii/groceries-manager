import {React, useContext} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "./components/LoginPage/Login.js"
import ProfilePage from "./components/ProfilePage/Profile.js"
import AuthLayout from "./layouts/AuthLayout.js"
import GuestLayout from "./layouts/GuestLayout.js"


const App = () => {
// todo --- checkk what is wrong with protected routes
  return (
    <>
      <Routes>

          <Route element = {<GuestLayout />} >
            <Route path="/login" element={ <LoginPage /> } />


          </Route>
          {/* protected routes */}
          <Route element = {<AuthLayout />} >

            <Route path="/profile" element={ <ProfilePage />} />

          </Route>

      </Routes>
    
    </>
  );
};

export default App;
