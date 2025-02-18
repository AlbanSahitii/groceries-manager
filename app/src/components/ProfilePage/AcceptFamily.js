import { React, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FamilyIcon from './src/img/profile-icon.png'
const AcceptFamily = () => {
    const {user, setUser} = useContext(AuthContext)
    const navigate= useNavigate()
    const acceptFamilyInviteSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:3080/api/family/accept_invite`, 
                {family_id: user.familyId, user_id: user.userId})

            alert("You accepted fam invite")
            window.location.reload();
        } catch (error) {
            
        }
        console.log(user)
    }

    const declineFamilyInviteSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:3080/api/family/decline_invite`, 
                {family_id: user.familyId, user_id: user.userId})

            alert("You declined family invite")
            window.location.reload();
        } catch (error) {
            
        }

    }

    return (
        <>
        {/** the information that is static will display good information from database */}
        <div className='accept-family'>
            <h1>{`${user.familyId} has invited you`}</h1>
            <div className='accept-family-card'>
                <div className='accept-family-card-header'>
                    <img src={FamilyIcon}></img>
                    <div className='accept-family-card-header-information'>
                        <p className='created-p'>{`created on 2022`}</p>
                        <p className='family-name'>{`${user.familyId} Family`}</p>
                        <p className='expire-p'>{`expires in 3days`}</p>
                    </div>
                </div>
                <div className='accept-family-card-body'>
                    <p ><img src={FamilyIcon}></img>Alban - admin</p>
                    <p><img src={FamilyIcon}></img>Alban - member</p>
                    <p ><img src={FamilyIcon}></img>Alban - Member</p>
                </div>
                <div className='accept-family-card-footer'>
                    <button className='accept' onClick={acceptFamilyInviteSubmit}>Accept</button>
                    <button className='decline' onClick={declineFamilyInviteSubmit}>Decline</button>
                </div>
            </div>
        </div> 
        </>
    )
}

export default AcceptFamily