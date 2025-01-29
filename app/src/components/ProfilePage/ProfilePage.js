import { React, useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const ProfilePage = () => {
    const {user, setUser} = useContext(AuthContext)
    const [familyMembers, setFamilyMembers] = useState([])
    const navigate = useNavigate();
    


    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(`http://localhost:3080/api/family/get_members?family_id=${user.familyId}`)

            setFamilyMembers(response.data)
        }   
        fetchData()
    }, [])

    return (
        <>
        
            ProfilePage

            {
                (() => {
                    if (user.userType === 'Owner') {
                        return (
                            (   <>
                                    <div> im an Owner </div>
                                    
                                    <button onClick={() => navigate('/management')}>Managment</button>
                                </>
                            )
                        )
                    } else if (user.userType === "Member") {
                        return (
                            (
                                <div>im a Member</div>
                            )
                        )
                    }
                })()
            }


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

export default ProfilePage