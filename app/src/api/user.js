import axios from "axios";

export const checkUser = async (user_id, jwt) => {
  const response = await axios.get(
    `http://localhost:3080/api/family/check_user?user_id=${user_id}`,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};

export const updateUser = async data => {
  const {fullName, username, email, password, confirmPassword, user_id, jwt} =
    data;
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
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response;
};

export const getUser = async (user_id, jwt) => {
  const response = await axios.get(
    `http://localhost:3080/api/user/getUser?id=${user_id}`,
    {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }
  );
  return response.data;
};
