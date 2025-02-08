import {React,useState, useContext, useEffect}  from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import carrotLogo from './src/img/carrot-icon.png'


const Login = () =>{
    const [inputs, setInputs] = useState({})
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()

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
            <div className='form-section'>
                <img src={carrotLogo}></img>
                <h1>Welcome Back</h1>
                <p>Please enter your details</p>

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
                <button><img alt='gmail logo'></img>Login using gmail</button>
            
                <p>Don`t have an account? <a onClick={() => navigate('/register')}>register</a></p>
            </div>

        
        <button onClick={()=> navigate('/register')}> register </button>
        <button onClick={()=> navigate('/')}> go back </button>
        </>
    )

}

export default Login

