    import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import CreateFamily from './CreateFamily'
import ProfilePage from './ProfilePage'
import AcceptFamily from './AcceptFamily'
import Navbar from './Navbar';
import './src/styles/profile.css'
const Profile = () => {
    const {logout, user, setUser} = useContext(AuthContext)
    const [userFam, setUserFam] = useState(null)
    const navigate = useNavigate();

    console.log(user)

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(`http://localhost:3080/api/family/check_user?user_id=${user.userId}`)
            setUser({...user, familyId: response.data?.family_id})
            localStorage.setItem('familyId', response.data.family_id)
            if (response.data.message === "User doesn`t have an family") {
                setUserFam(false)
            } else if (response.data.message === "User has an active invite") {
                setUserFam('Invited')
            } else {
                setUserFam(true)
            }
        }   
        fetchData()
    }, [])



    return (
        <>
                    <Navbar/>
            {
                (() => {
                    if (userFam === true) {
                        return (
                            (<ProfilePage />)
                        )
                    } else if (userFam === "Invited") {
                        return (
                            (
                            <>
                            <div className='profile-family-container'>

                                <CreateFamily/>
                                <AcceptFamily/>
                            </div>
                            </>
                            )
                        )
                    } else if (userFam === false) {
                        return (
                            (<CreateFamily/>)
                        )
                    }
                })()
            }



        </>
    )


}

export default Profile