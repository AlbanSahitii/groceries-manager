import './src/styles/navbar.css'
import CarrotLogo from './src/img/carrot-icon.png'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect } from 'react'

const Navbar = () => {
    const {user, logout} = useContext(AuthContext)

    const handleLogout = async ()=> {
            logout()
    }

    return (
        <>
            <nav className='auth-navbar'>
                <img src={CarrotLogo}></img>
                <ul>
                    <a><li>Settings</li></a>
                    <a href='/search'><li>Search</li></a>
                    <a href='/groceries'><li>Groceries</li></a>
                    {
                        user.userType === "Owner" && (
                            <a href='/management'><li>Management</li></a>
                        )
                    }
                </ul>
                <ul>
                    <li><button onClick={handleLogout}>LOGOUT</button></li>
                </ul>
            </nav>
        
        </>
    )
}
export default Navbar