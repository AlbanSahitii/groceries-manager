import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const CreateFamily = () => {
    const [inputs, setInputs] = useState({})
    const {user, setUser} = useContext(AuthContext)





    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`http://localhost:3080/api/family/create`, 
                {family_name: inputs.familyName, user_id: user.userId})
            alert(response.data)
            window.location.reload();
            
        } catch (error) {
            console.log(error)            
        }
    }
    

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name
        setInputs(values => ({...values, [name]: value}))
    }



    return (
        <>
        Create FAm

        <form onSubmit={handleSubmit}>
            <label>Enter your family name:
                <input 
                    type="text" 
                    name="familyName"
                    value = {inputs.familyName || ""} 
                    onChange={handleChange}
                />
            </label>
            <input type="submit" />
        </form>

        </>
    )
}

export default CreateFamily