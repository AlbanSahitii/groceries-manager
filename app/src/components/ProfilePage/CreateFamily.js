import {React, useContext, useEffect, useState} from "react";
import axios from "axios";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {AuthContext} from "../../context/AuthContext";
import {createFamily, familyInviteAccept} from "../../api/family";

import carrotLogo from "./src/img/carrot-icon.png";
const CreateFamily = () => {
  const [inputs, setInputs] = useState({});
  const {user, setUser} = useContext(AuthContext);

  const handleSubmitWithInvite = async e => {
    e.preventDefault();

    const response = familyInviteAccewptMutaiton.mutate({
      family_name: inputs.familyName,
      family_id: user.familyId,
      user_id: user.userId,
    });
    window.location.reload();
  };

  const familyInviteAccewptMutaiton = useMutation({
    mutationFn: familyInviteAccept,
    onError: e => console.log(e),
    onSuccess: e => console.log(e),
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const response = createFamilyMutation.mutate({
      family_name: inputs.familyName,
      user_id: user.userId,
    });

    localStorage.setItem("userType", "Owner");
    setUser({...user, userType: "Owner"});

    window.location.reload();
  };

  const createFamilyMutation = useMutation({
    mutationFn: createFamily,
    onSuccess: e => console.log(e),
    onError: e => console.log(e),
  });

  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setInputs(values => ({...values, [name]: value}));
  };

  return (
    <>
      <div className="create-family">
        <h1>Create your family</h1>
        <form onSubmit={!user.familyId ? handleSubmit : handleSubmitWithInvite}>
          <input
            type="text"
            name="familyName"
            value={inputs.familyName || ""}
            onChange={handleChange}
            placeholder="Family Name"
          />
          <br></br>
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default CreateFamily;
