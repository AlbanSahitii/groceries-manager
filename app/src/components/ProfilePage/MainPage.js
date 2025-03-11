import {React, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {fetchFamilies} from "../../api/family";

const MainPage = () => {
  const {user, setUser, refreshToken, sessionExpireError} =
    useContext(AuthContext);
  console.log(user.jwt);

  const jwt = localStorage.getItem("jwt");

  const {data: familyMembers} = useQuery(
    "familyMembers",
    () => fetchFamilies(user.familyId, jwt),
    {
      retry: 1,
      onError: err => sessionExpireError(err),
    }
  );

  return (
    <>
      MainPage
      <button onClick={refreshToken}>press</button>
      <ul>
        {familyMembers?.map((item, index) => (
          <li key={index}> {item.email} </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
