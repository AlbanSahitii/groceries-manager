import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios'

import './src/styles/owner-management.css'
import profileIcon from  './src/img/profile-icon.png'
const OwnerManagement = () => {
    const navigate = useNavigate()
    const {user, setUser, updateContext} = useContext(AuthContext)
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


    const handleOwnerTransfer = async (newOwnerUsername) => {
        try {
            const response = await axios.post('http://localhost:3080/api/family/change_owner',
                {ownerUsername: user.username, newOwnerUsername: newOwnerUsername}
            )
            localStorage.setItem('userType', "Member")
            alert(response.data)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />



            <div className='owner-management-main-body' >
                <div className='owner-management-invite'>
                    <form onSubmit={handleSubmit}>
                        <label>Enter family member email 
                            <input 
                                type="email" 
                                name="email"
                                value = {inviteEmail || ""} 
                                onChange={handleChange}
                                className='owner-management-invite-input'
                                required
                                
                            />
                        </label>
                        <input className='owner-management-invite-submit' type="submit" />
                    </form>
                </div>

                    <div className='owner-management-main-body-card-section'>
                                {
                                familyMembers.map((item, index) => (
                                        <div className='owner-management-main-body-card' key={index}>
                                            <div className='owner-management-main-body-card-left'>
                                                <img src={profileIcon}></img>
                                            </div>
                                            <div className='owner-management-main-body-card-right'>
                                                <p>Type - {item.username === user.username ? "Owner" : "Member"}</p>
                                                <p>Username - {item.username} </p>
                                                <p>Email - {item.email} </p>
                                                <p>All time groceries added - 999</p>
                                                <div className='card-right-button-container'>
                                                    {
                                                        item.username !== user.username &&
                                                        <button onClick={ () => handleRowDelete(item.username)}>Remove</button>
                                                    }
                                                    {
                                                        item.username !== user.username &&
                                                        <button onClick={ () => handleOwnerTransfer(item.username)}>Transfer Ownership</button>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    )) 
                                }
                    </div>
            </div>
        </>
    )
}

export default OwnerManagement