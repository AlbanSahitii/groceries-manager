import {useState} from 'react'
import axios from 'axios'
const SearchPage = () => {
    const [searchGrocerie, setSearchGrocerie] = useState("")
    const [groceries, setGroceries] = useState([])

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        setSearchGrocerie(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios(`http://localhost:3080/api/groceries/get?name=${searchGrocerie}`)
            setGroceries(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }


    console.log(groceries);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>enter your grocerie
                    <input 
                        type="text" 
                        name="groceries"
                        value = {searchGrocerie || ""} 
                        onChange={handleChange}
                        required
                    />
                </label>
                <input type="submit" />
            </form>

            <table>
                    <tr>
                        {
                            groceries.length > 1 &&
                            <>
                            <td>Grocerie Name</td>
                            <td>Action</td>
                            </>

                        }
                    </tr>
                {groceries.map((grocerie, index) => (
                    <tr key={index}>
                        <td >
                            {grocerie.name}
                        </td>
                        <td>
                            <button onClick={()=> console.log(grocerie.id)}>Add</button>
                        </td>
                    </tr>
                ))}
            </table>
        
        </>
    )
}

export default SearchPage