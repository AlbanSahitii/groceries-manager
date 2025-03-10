import {React, useContext, useEffect, useState} from "react";
import {useQuery, useMutation, useQueryClient} from "react-query";

import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

import {
  addFamilyMember,
  deleteFamilyMember,
  fetchFamilies,
  transferOwnerFamily,
} from "../../api/family";
import "./src/styles/owner-management.css";
import profileIcon from "./src/img/profile-icon.png";

const OwnerManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {user, setUser, updateContext, sessionExpireError} =
    useContext(AuthContext);
  const [inviteEmail, setInviteEmail] = useState(null);

  const {data: familyMembers} = useQuery(
    "familyMembers",
    () => fetchFamilies(user.familyId, user.jwt),
    {
      onError: err => sessionExpireError(err),
    }
  );

  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    setInviteEmail(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    addMemberMutation.mutate({
      family_id: user.familyId,
      email: inviteEmail,
      jwt: user.jwt,
    });
  };

  const addMemberMutation = useMutation({
    mutationFn: addFamilyMember,
    onSuccess: () => {
      setInviteEmail("");
    },
    onError: err => sessionExpireError(err),
  });

  const deleteMemberMutation = useMutation({
    mutationFn: deleteFamilyMember,
    onSuccess: () => {
      alert("deleted succesfully");
      queryClient.invalidateQueries(["familyMembers"]);
    },
    onError: err => sessionExpireError(err),
  });

  const transferOwnerMutaiton = useMutation({
    mutationFn: transferOwnerFamily,
    onSuccess: () => {
      queryClient.invalidateQueries(["familyMembers"]);
      localStorage.setItem("userType", "Member");
      window.location.reload();
    },
    onError: err => sessionExpireError(err),
  });

  return (
    <>
      <Navbar />

      <div className="owner-management-main-body">
        <div className="owner-management-invite">
          <form onSubmit={handleSubmit}>
            <label>
              Enter family member email
              <input
                type="email"
                name="email"
                value={inviteEmail || ""}
                onChange={handleChange}
                className="owner-management-invite-input"
                required
              />
            </label>
            <input className="owner-management-invite-submit" type="submit" />
          </form>
        </div>

        <div className="owner-management-main-body-card-section">
          {familyMembers?.map((item, index) => (
            <div className="owner-management-main-body-card" key={index}>
              <div className="owner-management-main-body-card-left">
                <img src={profileIcon}></img>
              </div>
              <div className="owner-management-main-body-card-right">
                <p>
                  Type - {item.username === user.username ? "Owner" : "Member"}
                </p>
                <p>Username - {item.username} </p>
                <p>Email - {item.email} </p>
                <p>All time groceries added - 999</p>
                <div className="card-right-button-container">
                  {item.username !== user.username && (
                    <button
                      onClick={() =>
                        deleteMemberMutation.mutate({
                          username: item.username,
                          jwt: user.jwt,
                        })
                      }
                    >
                      Remove
                    </button>
                  )}
                  {item.username !== user.username && (
                    <button
                      onClick={() =>
                        transferOwnerMutaiton.mutate({
                          ownerUsername: user.username,
                          newOwnerUsername: item.username,
                          jwt: user.jwt,
                        })
                      }
                    >
                      Transfer Ownership
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OwnerManagement;
