import axios from "axios";

export const checkUser = async(user_id)=> {
    const response = await axios.get(`http://localhost:3080/api/family/check_user?user_id=${user_id}`)
    return response.data
}