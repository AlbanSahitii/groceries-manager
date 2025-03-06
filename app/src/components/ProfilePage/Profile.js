import {React, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import CreateFamily from "./CreateFamily";
import ProfilePage from "./ProfilePage";
import AcceptFamily from "./AcceptFamily";
import Navbar from "./Navbar";
import "./src/styles/profile.css";
import Spinner from "../Spinner.js";
import {useQuery} from "react-query";
import {checkUser} from "../../api/user.js";

const Profile = () => {
  const {logout, user, setUser} = useContext(AuthContext);
  const [userFam, setUserFam] = useState(null);
  const navigate = useNavigate();

  const {data: userInformation, isLoading} = useQuery("userInformation", () =>
    checkUser(user.userId)
  );

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
  console.log(user);
  return (
    <>
      <Navbar />
      {userFam === true ? (
        <ProfilePage />
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
