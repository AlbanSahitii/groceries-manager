import { React, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import carrotLogo from './src/img/carrot-icon.png'

const CreateFamily = () => {
    const [inputs, setInputs] = useState({})
    const {user, setUser} = useContext(AuthContext)

    const handleSubmitWithInvite = async(e)=> {
        e.preventDefault();

    
        try {
            const deleteInvite = await axios.post(`http://localhost:3080/api/family/decline_invite`, 
                {family_id: user.familyId, user_id: user.userId})
            
            const createFamily = await axios.post(`http://localhost:3080/api/family/create`, 
                {family_name: inputs.familyName, user_id: user.userId})
            
            window.location.reload();

        } catch (error) {
            console.log(error)
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`http://localhost:3080/api/family/create`, 
                {family_name: inputs.familyName, user_id: user.userId})
                localStorage.setItem("userType", "Owner")
                setUser({...user, userType: 'Owner'})
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
        <div className='create-family'>
            <h1>Create your family</h1>
            <form onSubmit={!user.familyId ? handleSubmit : handleSubmitWithInvite}>
                    <input 
                        type="text" 
                        name="familyName"
                        value = {inputs.familyName || ""} 
                        onChange={handleChange}
                        placeholder='Family Name'
                    />
                    <br></br>
                <input type="submit" />
            </form>
        </div>
        </>
    )
}

export default CreateFamily