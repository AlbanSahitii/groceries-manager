import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

import carrotLogo from './src/img/carrot-icon.png'
import './src/styles/auth.css'
import gmailLogo from './src/img/icons8-gmail-48.png'

const Register = () => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const {register} = useContext(AuthContext)

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await register(inputs)
        alert('Registered Succesfully')
        navigate('/login')
    }

    console.log(inputs);
    return (
                <>
                <div className='login-page-container'>
        
                    <div className='login-page-left-section'>
                    </div>
        
                    <div className='login-page-form-section'>
        
                        <div className='login-page-logo'>
                            <img src={carrotLogo}></img>
                        </div>
                        <div className='login-page-info'>
                            <h1>Welcome Back</h1>
                            <br></br>
                            <p>Please enter your details</p>
                        </div>
                        <div className='login-page-form register-form'>
        
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <input
                                    type="text" 
                                    name="email"
                                    placeholder='Email'
                                    value = {inputs.email || ""} 
                                    onChange={handleChange}
                                    />
                                    <input
                                    type="text" 
                                    name="username"
                                    placeholder='Username'
                                    value = {inputs.username || ""} 
                                    onChange={handleChange}
                                    />
                                    <input
                                    type="text" 
                                    name="fullName"
                                    placeholder='fullName'
                                    value = {inputs.fullName || ""} 
                                    onChange={handleChange}
                                    />
                                    <input 
                                    type="password" 
                                    name="password" 
                                    placeholder='Password'
                                    value = {inputs.password || ""} 
                                    onChange={handleChange}
                                    />
                                    <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    placeholder='Confirm Password'
                                    value = {inputs.confirmPassword || ""} 
                                    onChange={handleChange}
                                    />
                                    <br></br>
                                    <input  type="submit" />
                            </form>
                        <button className='login-page-gmail-auth'><img src={gmailLogo} alt='gmail logo'></img>Login using gmail</button>
                        </div>
                        <div>
                            <p>Already have an account? <a onClick={() => navigate('/login')}>Login</a></p>
                        </div>
                    </div>
                </div>
                </>
        
    )
}

export default Register