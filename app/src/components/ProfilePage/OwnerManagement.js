import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'


const OwnerManagement = () => {
    const {user, setUser} = useContext(AuthContext)
    const [familyMembers, setFamilyMembers] = useState([])
    const [inviteEmail, setInviteEmail] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
    
            const response = await axios.get(`http://localhost:3080/api/family/get_members?family_id=${user.familyId}`)
    
            setFamilyMembers(response.data)
        }   
        fetchData()
    }, [])


    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setInviteEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:3080/api/family/add_family_member`, 
                {family_id: user.familyId, email: inviteEmail})

            alert(response.data)
                    
        } catch (error) {
            console.log(error)            
        }
    }

    const handleRowDelete = async (username) => {
        try {
            const response = await axios.post('http://localhost:3080/api/family/remove_family_member', 
                {username: username}
            )

            setFamilyMembers(familyMembers.filter((item) => {
                return item.username !== username
            }))


            alert(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            Managment

            <form onSubmit={handleSubmit}>
                <label>Enter family member email:
                    <input 
                        type="email" 
                        name="email"
                        value = {inviteEmail || ""} 
                        onChange={handleChange}
                        required
                        
                    />
                </label>
                <input type="submit" />
            </form>


            <table>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>email</th>
                        <th>type</th>
                        <th>actions</th>
                    </tr>
                    {
                        familyMembers.map((item, index) => (
                            <tr key={index}>
                                <td > {index + 1} </td>
                                <td > {item.username} </td>
                                <td >{item.username === user.username ? "Owner" : "Member"}</td>
                                <td>
                                    {
                                        item.username !== user.username &&
                                        <button onClick={ () => handleRowDelete(item.username)}>delete</button>
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default OwnerManagement