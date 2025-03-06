import {React, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import FamilyIcon from "./src/img/profile-icon.png";
import {
  acceptFamilyWithInvite,
  declineFamilyInvite,
  getFamilyInviteInformation,
  getFamilyMembers,
} from "../../api/family";

import {useQuery, useMutation, useQueryClient} from "react-query";

const AcceptFamily = () => {
  const {user, setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const {data: familyMembers} = useQuery("familyMembers", () =>
    getFamilyMembers(user.familyId)
  );
  const {data: familyInformation} = useQuery("familyInformation", () =>
    getFamilyInviteInformation({familyId: user.familyId, userId: user.userId})
  );

  const acceptFamilyInviteSubmit = e => {
    e.preventDefault();

    acceptFamilyWithInviteMutaiton.mutate({
      family_id: user.familyId,
      user_id: user.userId,
    });

    window.location.reload();
  };

  const declineFamilyInviteSubmit = async e => {
    e.preventDefault();
    const response = declineFamilyInviteMutation.mutate({
      family_id: user.familyId,
      user_id: user.userId,
    });

    alert("You declined family invite");
    window.location.reload();
  };

  // mutations
  const acceptFamilyWithInviteMutaiton = useMutation({
    mutationFn: acceptFamilyWithInvite,
    onSuccess: e => console.log(e),
    onError: e => console.log(e),
  });
  const declineFamilyInviteMutation = useMutation({
    mutationFn: declineFamilyInvite,
    onSuccess: e => console.log(e),
    onError: e => console.log(e),
  });

  return (
    <>
      <div className="accept-family">
        <h1>{`${familyInformation?.familyName} has invited you`}</h1>
        <div className="accept-family-card">
          <div className="accept-family-card-header">
            <img src={FamilyIcon}></img>
            <div className="accept-family-card-header-information">
              <p className="created-p">{`created on ${familyInformation?.createDate.slice(
                0,
                4
              )}`}</p>
              <p className="family-name">{`${familyInformation?.familyName} Family`}</p>
              <p className="expire-p">{`expires in ${
                familyInformation?.expiryDate
              } ${familyInformation?.expiryDate === 1 ? "day" : "days"}`}</p>
            </div>
          </div>
          <div className="accept-family-card-body">
            {familyMembers?.map((item, index) => (
              <p key={index}>
                <img src={FamilyIcon}></img>
                {item.email}
              </p>
            ))}
          </div>
          <div className="accept-family-card-footer">
            <button className="accept" onClick={acceptFamilyInviteSubmit}>
              Accept
            </button>
            <button className="decline" onClick={declineFamilyInviteSubmit}>
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptFamily;
