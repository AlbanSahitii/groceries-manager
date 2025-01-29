import {React, useContext} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from "./components/LoginPage/Login.js"
import ProfilePage from "./components/ProfilePage/Profile.js"
import OwnerManagement from "./components/ProfilePage/OwnerManagement.js";
import AuthLayout from "./layouts/AuthLayout.js"
import GuestLayout from "./layouts/GuestLayout.js";

const App = () => {
  return (
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<LoginPage />}/>
          </Route>

        {/* protected*/}
        <Route element= {<AuthLayout />}>
          <Route path="/profile" element= {<ProfilePage />} />
          <Route path="/management" element= {<OwnerManagement />} />
        </Route>

      </Routes>    
      
    
    );
};

export default App;
