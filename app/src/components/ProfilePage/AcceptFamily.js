import { React, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import carrotLogo from './src/img/carrot-icon.png'
import familyIcon from './src/img/family.png'


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
            Accept FAm - fam id {user.familyId}
            <br /> 
            <br /> 
            <button onClick={acceptFamilyInviteSubmit}>Accept the invite</button>
            <button onClick={declineFamilyInviteSubmit}>Decline the invite</button>

            <div className='accept-family-section'>
                <img src={carrotLogo} alt='carrot logo'></img>
                    <img src={familyIcon}></img>
                    <p>{user.familyId}</p>
                    <button onClick={acceptFamilyInviteSubmit}>Join</button>

            </div>


        </>
    )
}

export default AcceptFamily