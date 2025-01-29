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


    return (
        <>
            Managment

            <form onSubmit={handleSubmit}>
                <label>Enter the person`s email`:
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




            <ul>
                {
                    familyMembers.map((item, index) => (
                        <li key={index}> {item.email} </li>
                    ))
                }
            </ul>


        </>
    )
}

export default OwnerManagement