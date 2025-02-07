import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"
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
        <br />

                <label>Enter your password:
                    <input 
                    type="password" 
                    name="password" 
                    value = {inputs.password || ""} 
                    onChange={handleChange}
                    autoComplete="new-password"
                    />
                </label>
                    <br />

                <label>Confirm Your Password:
                    <input 
                    type="password" 
                    name="confirmPassword" 
                    value = {inputs.confirmPassword || ""} 
                    onChange={handleChange}
                    />
                </label>
                    <br />

                <label>Enter your email:
                    <input 
                    type="email" 
                    name="email" 
                    value = {inputs.email || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br />
                <label>Enter your full name:
                    <input 
                    type="text" 
                    name="fullName" 
                    value = {inputs.fullName || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br />

                <input type="submit" />
            </form>
        <button onClick={()=> navigate('/login')}>Login</button>
        <button onClick={()=> navigate('/')}>main</button>
        </>
    )
}

export default Register