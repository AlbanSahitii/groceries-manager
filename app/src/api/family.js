import axios from 'axios'

export const fetchFamilies= async(familyId) => {
    const {data} = await axios.get(`http://localhost:3080/api/family/get_members?family_id=${familyId}`)
    return data
}

export const deleteFamilyMember = async(username) => {
    const response = await axios.post('http://localhost:3080/api/family/remove_family_member', {username})
    return response
}

export const transferOwnerFamily = async(data) => {
    const {ownerUsername, newOwnerUsername} = data
    const response  = await axios.post('http://localhost:3080/api/family/change_owner',
                                        {ownerUsername, newOwnerUsername})
    return response
}

export const addFamilyMember = async(data) => {
    const {family_id, email} = data
    const response = await axios.post(`http://localhost:3080/api/family/add_family_member`, 
        {family_id, email})
    return response
}