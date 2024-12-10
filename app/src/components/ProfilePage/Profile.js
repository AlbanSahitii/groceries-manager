import { React, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

import {CreateFamily} from './CreateFamily'
import {InviteFamily} from './InviteFamily'
import {ProfilePage} from './ProfilePage'


const Profile = () => {
    const {user, setUser} = useContext(AuthContext)

    


    return (
        <>
        
        {/* 
            TODO

            create an page where when we login we go
            it will check if user has family
            if no it will render an component which can create a family or if there is an invite from family member to accept or no\
            if it has family it will go to profilepage
        
        
        */}


        </>
    )


}

export default Profile