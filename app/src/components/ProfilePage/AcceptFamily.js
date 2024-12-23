import { React, useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';


const AcceptFamily = () => {
    const {user, setUser} = useContext(AuthContext)

    const handeSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:3080/api/family/accept_invite`, 
                {family_id: user.family_id, user_id: user.userId})

            console.log(response.data)
        
        } catch (error) {
            
        }



        console.log(user)
    }


    return (
        <>
            Accept FAm

            <button onClick={handeSubmit}>Click Me!</button>


        </>
    )
}

export default AcceptFamily