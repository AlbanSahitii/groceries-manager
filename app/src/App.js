import {React, useContext} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from "./components/LoginPage/Login.js"
import ProfilePage from "./components/ProfilePage/Profile.js"
import OwnerManagement from "./components/ProfilePage/OwnerManagement.js";
import AuthLayout from "./layouts/AuthLayout.js"
import GuestLayout from "./layouts/GuestLayout.js";
import SearchPage from "./components/GroceriesPage/SearchPage.js";
import Groceries from "./components/GroceriesPage/Groceries.js";

const App = () => {
  return (
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<LoginPage />}/>
          </Route>

        {/* protected*/}
        <Route element= {<AuthLayout />}>
          <Route path="/profile" element= {<ProfilePage />} />
          <Route path="/search" element= {<SearchPage />} />
          <Route path="/management" element= {<OwnerManagement />} />
          <Route path="/groceries" element= {<Groceries />} />
        </Route>

      </Routes>    
      
    
    );
};

export default App;
