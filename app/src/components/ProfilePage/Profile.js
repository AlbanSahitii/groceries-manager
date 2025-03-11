import {React, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import CreateFamily from "./CreateFamily";
import MainPage from "./MainPage";
import AcceptFamily from "./AcceptFamily";
import Navbar from "./Navbar";
import "./src/styles/profile.css";
import Spinner from "../Spinner.js";
import {useQuery} from "react-query";
import {checkUser} from "../../api/user.js";

const Profile = () => {
  const {user, setUser, sessionExpireError} = useContext(AuthContext);
  const [userFam, setUserFam] = useState(null);
  const jwt = localStorage.getItem("jwt");

  const {
    data: userInformation,
    error,
    isLoading,
  } = useQuery("userInformation", () => checkUser(user.userId, jwt), {
    retry: 1,
    onError: err => sessionExpireError(err),
  });

  useEffect(() => {
    if (
      userInformation?.family_id &&
      user.familyId !== userInformation.family_id
    ) {
      setUser(prevUser => ({...prevUser, familyId: userInformation.family_id}));
      localStorage.setItem("familyId", userInformation.family_id);
    }
    if (userInformation) {
      const newStatus =
        userInformation.message === "User doesn`t have an family"
          ? false
          : userInformation.message === "User has an active invite"
          ? "Invited"
          : true;
      if (userInformation.message === "User doesn`t have an family") {
        setUserFam(false);
      } else if (userInformation.message === "User has an active invite") {
        setUserFam("Invited");
      } else {
        setUserFam(true);
      }
    }
  }, [userInformation, user.familyId]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      {userFam === true ? (
        <MainPage />
      ) : (
        <div className="profile-family-container">
          <CreateFamily />
          {userFam === "Invited" && <AcceptFamily />}
        </div>
      )}
    </>
  );
};

export default Profile;
