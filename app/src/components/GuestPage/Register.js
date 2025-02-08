import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

import carrotLogo from './src/img/carrot-icon.png'

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
        register
        <div className="form-section">
            <img src={carrotLogo}></img>
            <h1>Welcome to SyncBasket</h1>
            <p>Please enter your details</p>
            
            <form onSubmit={handleSubmit} autoComplete="off">
                    <label>Enter your username:
                        <input
                            type="text" 
                            name="username"
                            value = {inputs.username || ""} 
                            onChange={handleChange}
                            autoComplete="new-username"
                            />
                    </label>
                    <label>Enter your password:
                        <input 
                        type="password" 
                        name="password" 
                        value = {inputs.password || ""} 
                        onChange={handleChange}
                        autoComplete="new-password"
                        />
                    </label>
                    <label>Confirm Your Password:
                        <input 
                        type="password" 
                        name="confirmPassword" 
                        value = {inputs.confirmPassword || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <label>Enter your email:
                        <input 
                        type="email" 
                        name="email" 
                        value = {inputs.email || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <label>Enter your full name:
                        <input 
                        type="text" 
                        name="fullName" 
                        value = {inputs.fullName || ""} 
                        onChange={handleChange}
                        />
                    </label>
                    <label>
                        <input type="checkbox"></input>
                        I accept terms of use
                    </label>
                    <input type="submit" />
                </form>
            <button><img alt='gmail logo'></img>Login using gmail</button>
            
            <p>Already have an account? <a onClick={() => navigate('/login')}>Log in</a></p>

        </div>
        <button onClick={()=> navigate('/login')}>Login</button>
        <button onClick={()=> navigate('/')}>main</button>
        </>
    )
}

export default Register