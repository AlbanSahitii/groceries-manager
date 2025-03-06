import {React, lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/GuestPage/Main.js";
import Profile from "./components/ProfilePage/Profile.js";
import OwnerManagement from "./components/ProfilePage/OwnerManagement.js";
import SearchPage from "./components/GroceriesPage/SearchPage.js";
import Groceries from "./components/GroceriesPage/Groceries.js";
import Settings from "./components/ProfilePage/Settings.js";
import AuthLayout from "./layouts/AuthLayout.js";
import GuestLayout from "./layouts/GuestLayout.js";
import OwnerLayout from "./layouts/OwnerLayout.js";
import Spinner from "./components/Spinner.js";

const LoginPage = lazy(() => import("./components/GuestPage/Login.js"));
const RegisterPage = lazy(() => import("./components/GuestPage/Register.js"));

// function wait(time) {
//   return new Promise((resolve)=> {
//     setTimeout(resolve,time)
//   })
// }

const App = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
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
            <Route path="/settings" element={<Settings />} />
            <Route path="/groceries" element={<Groceries />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
