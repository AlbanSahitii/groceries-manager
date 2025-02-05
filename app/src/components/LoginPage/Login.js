import {React,useState, useContext, useEffect}  from 'react'


import { AuthContext } from '../../context/AuthContext'

const Login = () =>{
    const [inputs, setInputs] = useState({})
    const {user, login} = useContext(AuthContext)
    
    const username = localStorage.getItem('username')
    const jwt = localStorage.getItem('jwt')
    const userId = localStorage.getItem('userId')
    const userType = localStorage.getItem('userType')


    const handleSubmit = async (e) => {
        e.preventDefault()
        login({...inputs})
    }
    
    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Enter your username:
                <input
                    type="text" 
                    name="username"
                    value = {inputs.username || ""} 
                    onChange={handleChange}
                    />
                </label>
                <label>Enter your password:
                    <input 
                    type="password" 
                    name="password" 
                    value = {inputs.password || ""} 
                    onChange={handleChange}
                    />
                    </label>
                    <input type="submit" />
            </form>
        </>
    )

}

export default Login

