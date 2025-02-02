import {React, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'


const Groceries = () => {
    const {user} = useContext(AuthContext)
    const [groceries, setGroceries] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:3080/api/groceries/get_family_grocery_list?family_id=${user.familyId}`)
            setGroceries(result.data)
        
        }
        fetchData()


    }, [])

    console.log(groceries);
    return (
        <>

            <table>
                <tr>
                    <td>name</td>
                    <td>Action</td>
                </tr>
                {
                    groceries.map((grocerie, index) => (
                        <tr key={index}>
                            <td> {grocerie.Grocery.name}</td>
                            <td>
                                <button onClick={()=> console.log(`pressed ${grocerie.Grocery.id}`)}>Purchased</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </>
    )
}

export default Groceries