import axios from "axios";
const jwtToken = localStorage.getItem("jwt");
const headers = {
  authorization: `Bearer ${jwtToken}`,
};

export const fetchFamilies = async familyId => {
  const {data} = await axios.get(
    `http://localhost:3080/api/family/get_members?family_id=${familyId}`,
    {headers}
  );
  return data;
};

export const deleteFamilyMember = async username => {
  const response = await axios.post(
    "http://localhost:3080/api/family/remove_family_member",
    {headers},
    {username}
  );
  return response;
};

export const transferOwnerFamily = async data => {
  const {ownerUsername, newOwnerUsername} = data;
  const response = await axios.post(
    "http://localhost:3080/api/family/change_owner",
    {ownerUsername, newOwnerUsername},
    {headers}
  );
  return response;
};

export const addFamilyMember = async data => {
  const {family_id, email} = data;
  const response = await axios.post(
    `http://localhost:3080/api/family/add_family_member`,
    {family_id, email},
    {headers}
  );
  return response;
};

export const familyInviteAccept = async data => {
  const {family_id, user_id, family_name} = data;
  console.log(family_id);
  console.log(user_id);
  console.log(family_name);

  try {
    const deleteInvite = await axios.post(
      `http://localhost:3080/api/family/decline_invite`,
      {family_id, user_id},
      {headers}
    );

    const createFamily = await axios.post(
      `http://localhost:3080/api/family/create`,
      {family_name, user_id},
      {headers}
    );
  } catch (error) {
    return error;
  }
  return "Invite Accepted succesfully";
};

export const createFamily = async data => {
  const {family_name, user_id} = data;

  const response = await axios.post(
    `http://localhost:3080/api/family/create`,
    {
      family_name,
      user_id,
    },
    {headers}
  );

  return response;
};

export const acceptFamily = async data => {};

export const getFamilyMembers = async family_id => {
  const memberList = await axios.get(
    `http://localhost:3080/api/family/get_members?family_id=${family_id}`,
    {headers}
  );
  return memberList.data;
};

export const getFamilyInviteInformation = async data => {
  const {familyId, userId} = data;
  const familyInformation = await axios.post(
    "http://localhost:3080/api/family/get_invite_information",
    {familyId, userId},
    {headers}
  );

  return familyInformation.data;
};

export const acceptFamilyWithInvite = async data => {
  const {family_id, user_id} = data;
  console.log(data);
  const response = await axios.post(
    `http://localhost:3080/api/family/accept_invite`,
    {family_id, user_id},
    {headers}
  );

  return response;
};

export const declineFamilyInvite = async data => {
  const {family_id, user_id} = data;
  const response = await axios.post(
    `http://localhost:3080/api/family/decline_invite`,
    {family_id, user_id},
    {headers}
  );

  return response;
};

export const fetchFamilyInformation = async family_id => {
  const response = await axios.get(
    `http://localhost:3080/api/family/get?family_id=${family_id}`,
    {headers}
  );
  return response.data;
};
