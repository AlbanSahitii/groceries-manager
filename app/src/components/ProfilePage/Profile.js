import { React, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const username =  localStorage.getItem('username')
    const jwt =  localStorage.getItem('jwt')


    return (
        <>
        <div>
            profile
            <button onClick={() => navigate('/login')}>go back</button>
            <button onClick={() => {
                setUser(null)
                localStorage.removeItem('jwt')
                localStorage.removeItem('username')

            }}>logout</button>
            <button onClick={() => setUser(null)}>remove user</button>
            <button onClick={() => {
                localStorage.removeItem('jwt')
                localStorage.removeItem('username')
                navigate('/login')
            }}>remove localStorage </button>
        </div>
        </>
    )


}

export default Profile