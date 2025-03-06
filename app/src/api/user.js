import axios from "axios";

export const checkUser = async user_id => {
  const response = await axios.get(
    `http://localhost:3080/api/family/check_user?user_id=${user_id}`
  );
  return response.data;
};

export const updateUser = async data => {
  const {fullName, username, email, password, confirmPassword, user_id} = data;
  const response = await axios.put("http://localhost:3080/api/user/update", {
    fullName,
    username,
    email,
    password,
    confirmPassword,
    user_id,
  });

  return response;
};
