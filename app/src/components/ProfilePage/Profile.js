import { React, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Profile = () => {
    const {user} = useContext(AuthContext)
    const userData = localStorage.getItem('userData')

    console.log(userData)
    console.log(`profile ${user.jwt}`)

    return (
        <>
            profile
        </>
    )


}

export default Profile