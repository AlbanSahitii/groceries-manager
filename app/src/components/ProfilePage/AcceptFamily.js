import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FamilyIcon from './src/img/profile-icon.png'
const AcceptFamily = () => {
    const {user, setUser} = useContext(AuthContext)
    const navigate= useNavigate()
    const [familyInvite, setFamilyInvite] = useState(null)
    const [familyMembers, setFamilyMembers] = useState([])
    

    useEffect(  ()=> {
        const fetchData= async () => {
            try {
                const familyInformation = await axios.post('http://localhost:3080/api/family/get_invite_information',
                    {familyId:user.familyId, userId: user.userId}
                )
                setFamilyInvite(familyInformation.data)

                const memberList = await axios.get(`http://localhost:3080/api/family/get_members?family_id=${user.familyId}`)
                setFamilyMembers(memberList.data)
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [0])
    console.log(familyMembers);
    console.log(familyInvite)

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
            <h1>{`${familyInvite?.familyName} has invited you`}</h1>
            <div className='accept-family-card'>
                <div className='accept-family-card-header'>
                    <img src={FamilyIcon}></img>
                    <div className='accept-family-card-header-information'>
                        <p className='created-p'>{`created on ${familyInvite?.createDate.slice(0, 4)}`}</p>
                        <p className='family-name'>{`${familyInvite?.familyName} Family`}</p>
                        <p className='expire-p'>{`expires in ${familyInvite?.expiryDate} ${familyInvite?.expiryDate === 1 ? "day" : "days"}`}</p>
                    </div>
                </div>
                <div className='accept-family-card-body'>
                    {
                        familyMembers.map((item, index) => (
                            <p key={index}><img src={FamilyIcon}></img>{item.email}</p>
                        ))
                    }
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