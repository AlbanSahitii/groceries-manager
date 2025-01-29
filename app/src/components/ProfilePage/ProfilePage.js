import { React, useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'


const ProfilePage = () => {
    const {user, setUser} = useContext(AuthContext)
    const [familyMembers, setFamilyMembers] = useState([])


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
                                    
                                    <button onClick={() => console.log(`you clicked hey`)}>Managment</button>
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