import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import CreateFamily from './CreateFamily'
import ProfilePage from './ProfilePage'
import AcceptFamily from './CreateFamily'

const Profile = () => {
    const {user, setUser} = useContext(AuthContext)
    const [userFam, setUserFam] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchData = async () => {

            const response = await axios.get(`http://localhost:3080/api/family/check_user?user_id=${user.userId}`)
            console.log(response)
            console.log(user.userId)
            if (response.data === "User doesn`t have an family") {
                setUserFam(false)
            } else {
                setUserFam(true)
            }
        }   
        fetchData()
    }, [userFam])

        console.log(userFam)
    


    return (
        <>
                <button onClick={() => navigate('/login')}>go back</button>

                <button onClick={() => {
                        setUser(null)
                        localStorage.removeItem('jwt')
                        localStorage.removeItem('username')
                    }}>logout</button>

        
        {/* 
            TODO

            create model for invite system for family members

        */}
            {
                userFam ? (<ProfilePage />)
                :
                (<CreateFamily/>)
            }


        </>
    )


}

export default Profile