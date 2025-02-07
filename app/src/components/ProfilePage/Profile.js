import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import CreateFamily from './CreateFamily'
import ProfilePage from './ProfilePage'
import AcceptFamily from './AcceptFamily'

const Profile = () => {
    const {user, setUser} = useContext(AuthContext)
    const [userFam, setUserFam] = useState(null)
    const navigate = useNavigate();
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
                <button onClick={() => console.log(`this will be settings section`)}>settings</button>
                <button onClick={() => navigate('/groceries')}>groceries</button>
                <button onClick={() => navigate('/search')}>find grocery</button>

                <button onClick={() => navigate('/login')}>go back</button>
                <button onClick={() => {
                        setUser(null)
                        localStorage.removeItem('jwt')
                        localStorage.removeItem('username')
                        localStorage.removeItem('userId')
                        localStorage.removeItem('userType')
                        localStorage.removeItem('familyId')
                    }}>logout</button>
                    <br></br>
                    <br></br>

        

            {
                (() => {
                    if (userFam === true) {
                        return (
                            (<ProfilePage />)
                        )
                    } else if (userFam === "Invited") {
                        return (
                            (<AcceptFamily/>)
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