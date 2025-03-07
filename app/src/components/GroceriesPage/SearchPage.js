import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Navbar from "../ProfilePage/Navbar";
const SearchPage = () => {
  const [searchGrocerie, setSearchGrocerie] = useState("");
  const [groceries, setGroceries] = useState([]);
  const {user, setUser} = useContext(AuthContext);

  console.log(`search`);

  const handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    setSearchGrocerie(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios(
        `http://localhost:3080/api/groceries/get?name=${searchGrocerie}`
      );
      setGroceries(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddGrocerie = async grocerieId => {
    const data = {
      family_id: user.familyId,
      groceries_id: grocerieId,
      user_id: user.userId,
    };

    await axios
      .post(`http://localhost:3080/api/groceries/add_grocerie_in_list`, data)
      .then(response => {
        setGroceries(groceries.filter(grocerie => grocerie.id !== grocerieId));
      })
      .catch(error => console.log(error));
  };

  console.log(groceries);

  return (
    <>
      <Navbar />

      <form onSubmit={handleSubmit}>
        <label>
          enter your grocerie
          <input
            type="text"
            name="groceries"
            value={searchGrocerie || ""}
            onChange={handleChange}
            required
          />
        </label>
        <input type="submit" />
      </form>

      <table>
        <thead>
          <tr>
            {groceries.length > 1 && (
              <>
                <td>Grocerie Name</td>
                <td>Action</td>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {groceries.map((grocerie, index) => (
            <tr key={index}>
              <td>{grocerie.name}</td>
              <td>
                <button onClick={() => handleAddGrocerie(grocerie.id)}>
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SearchPage;
