import axios from "axios";

export const fetchFamilies = async (familyId, jwt) => {
  const {data} = await axios.get(
    `http://localhost:3080/api/family/get_members?family_id=${familyId}`,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return data;
};

export const deleteFamilyMember = async data => {
  const {username, jwt} = data;
  const response = await axios.post(
    "http://localhost:3080/api/family/remove_family_member",
    {username},
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};

export const transferOwnerFamily = async data => {
  const {ownerUsername, newOwnerUsername, jwt} = data;
  const response = await axios.post(
    "http://localhost:3080/api/family/change_owner",
    {ownerUsername, newOwnerUsername},
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};

export const addFamilyMember = async data => {
  const {family_id, email, jwt} = data;
  const response = await axios.post(
    `http://localhost:3080/api/family/add_family_member`,
    {family_id, email},
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response;
};

export const familyInviteAccept = async data => {
  const {family_id, user_id, family_name, jwt} = data;

  try {
    const deleteInvite = await axios.post(
      `http://localhost:3080/api/family/decline_invite`,
      {family_id, user_id},
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );

    const createFamily = await axios.post(
      `http://localhost:3080/api/family/create`,
      {family_name, user_id},
      {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
  return "Invite Accepted succesfully";
};

export const createFamily = async data => {
  const {family_name, user_id, jwt} = data;

  const response = await axios.post(
    `http://localhost:3080/api/family/create`,
    {
      family_name,
      user_id,
    },
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response;
};

export const acceptFamily = async data => {
  //fix this
};

export const getFamilyMembers = async (family_id, jwt) => {
  const memberList = await axios.get(
    `http://localhost:3080/api/family/get_members?family_id=${family_id}`,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return memberList.data;
};

export const getFamilyInviteInformation = async data => {
  const {familyId, userId, jwt} = data;
  const familyInformation = await axios.post(
    "http://localhost:3080/api/family/get_invite_information",
    {familyId, userId},
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  return familyInformation.data;
};

export const acceptFamilyWithInvite = async data => {
  const {family_id, user_id, jwt} = data;
  console.log(data);
  const response = await axios.post(
    `http://localhost:3080/api/family/accept_invite`,
    {family_id, user_id},
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response;
};

export const declineFamilyInvite = async data => {
  const {family_id, user_id, jwt} = data;
  const response = await axios.post(
    `http://localhost:3080/api/family/decline_invite`,
    {family_id, user_id},
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response;
};

export const fetchFamilyInformation = async (family_id, jwt) => {
  const response = await axios.get(
    `http://localhost:3080/api/family/get?family_id=${family_id}`,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};
