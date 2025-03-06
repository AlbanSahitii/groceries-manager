import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Navbar from './Navbar'
import './src/styles/settings-style.css'
const Settings = () => {
    const {user} = useContext(AuthContext)
    const [inputs, setInputs] = useState({})
    const [seePassword, setSeePassword] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [data, setData]  = useState({
        username: "albansahiti",
        email: "albansahiti@gmail.com",
        name: "Alban",
        lastName: "Sahiti",
        password: "Wtf123.123",
        confirmPassword: "Wtf123.123",
        isVerified: false,
    })
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setData({
            ...data,
            username: inputs.username,
            email: inputs.email,
            name: inputs.name,
            lastName: inputs.lastName,
            password: inputs.password,
            confirmPassword: inputs.confirmPassword
        })

        setIsEditing(!isEditing)
    }

    
    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name
        setInputs(values => ({...values, [name]: value}))
    }

    return (
    <>
        <Navbar />
        Settings
        <div className='settings-body'>
            <div className='settings-header'>
                <div className='settings-header-images'></div>
                <div className='settings-header-data'></div>
            </div>
            <div className='settings-form'>
                <form onSubmit={handleSubmit}>
                    <label>
                        FullName - 
                        <input type='text' name="name" onChange={handleChange} readOnly={!isEditing} value={!isEditing ? data.name : inputs.name || ""}/>
                        <input type='text' name="lastName" onChange={handleChange} readOnly={!isEditing} value={!isEditing ? data.lastName : inputs.lastName || ""}/>
                    </label>
                    <label>
                        Email - 
                        <input type='email' name="email" onChange={handleChange} readOnly={!isEditing} value={!isEditing ? data.email : inputs.email || ""}/>
                        {data.isVerified ? "Verified" : "Not Verified"}
                    </label>
                    <label>
                        Username - 
                        <input type="text" name='username' onChange={handleChange} readOnly={!isEditing} value={!isEditing ? data.username : inputs.username || ""}/>
                    </label>
                    <label>
                        Password - 
                        <input type={seePassword ? "text" : "password"}  name="password" onChange={handleChange} readOnly={!isEditing} value={!isEditing ? "password" : inputs.password || ""}/>
                    </label>
                    <label>
                        Confirm Password - 
                        <input type={seePassword ? "text" : "password"}  name="confirmPassword" onChange={handleChange} readOnly={!isEditing} value={!isEditing? "password" : inputs.confirmPassword || ""}/>
                    </label>
                    {isEditing && <button onClick={()=> setSeePassword(!seePassword)}>Show password</button>  }
                    {
                        isEditing === true ?
                        <input type='submit' value="Save Changes" /> :
                        <button className="butonni" onClick={() => setIsEditing(!isEditing)} > {'Edit'} </button>
                    }
                </form>
            </div>
        </div>
    </>
    )

}

export default Settings