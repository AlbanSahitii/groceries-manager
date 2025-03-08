import axios from "axios";
const jwtToken = localStorage.getItem("jwt");
const headers = {
  authorization: `Bearer ${jwtToken}`,
};

export const checkUser = async user_id => {
  const response = await axios.get(
    `http://localhost:3080/api/family/check_user?user_id=${user_id}`,
    {headers}
  );
  return response.data;
};

export const updateUser = async data => {
  const {fullName, username, email, password, confirmPassword, user_id} = data;
  console.log(fullName);
  console.log(user_id);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
  console.log(username);
  const response = await axios.put(
    "http://localhost:3080/api/user/update",
    {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      user_id,
    },
    {headers}
  );

  console.log(response.data);
  return response;
};

export const getUser = async user_id => {
  const response = await axios.get(
    `http://localhost:3080/api/user/getUser?id=${user_id}`,
    {headers}
  );
  return response.data;
};
