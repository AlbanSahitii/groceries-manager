import { React, useContext,useEffect,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchFamilies } from '../../api/family';

const ProfilePage = () => {
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {data: familyMembers} = useQuery("familyMembers", ()=> fetchFamilies(user.familyId))

    return (
        <>
            ProfilePage
            <ul>
                {
                    familyMembers?.map((item, index) => (
                        <li key={index}> {item.email} </li>
                    ))
                }
            </ul>

        </>
    )

}

export default ProfilePage