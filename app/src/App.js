import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/GuestPage/Login.js";
import Main from "./components/GuestPage/Main.js";
import RegisterPage from "./components/GuestPage/Register.js";
import Profile from "./components/ProfilePage/Profile.js";
import OwnerManagement from "./components/ProfilePage/OwnerManagement.js";
import SearchPage from "./components/GroceriesPage/SearchPage.js";
import Groceries from "./components/GroceriesPage/Groceries.js";

import AuthLayout from "./layouts/AuthLayout.js";
import GuestLayout from "./layouts/GuestLayout.js";
import OwnerLayout from './layouts/OwnerLayout.js'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Main />} />
        </Route>
        <Route element={<AuthLayout />}>

          <Route element={<OwnerLayout />}>
              <Route path="/management" element={<OwnerManagement />} />
          </Route>
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/groceries" element={<Groceries />} />
          
        </Route>
      </Routes>
    </>

  );
};

export default App;
