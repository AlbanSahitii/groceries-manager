import {React, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const Groceries = () => {
  const {user} = useContext(AuthContext);
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:3080/api/groceries/get_family_grocery_list?family_id=${user.familyId}`
      );
      setGroceries(result.data);
    };
    fetchData();
  }, []);

  const handlePurchase = async id => {
    await axios
      .post(`http://localhost:3080/api/groceries/purchase_grocery`, {
        family_groceries_id: id,
      })
      .then(response => {
        console.log(response);
        setGroceries(groceries.filter(grocerie => grocerie.id !== id));
      })
      .catch(error => console.log(error));
  };

  console.log(groceries);
  return (
    <>
      <table>
        <tr>
          <td>name</td>
          <td>Action</td>
        </tr>
        {groceries.map((grocerie, index) => (
          <tr key={index}>
            <td> {grocerie.Grocery.name}</td>
            <td>
              <button onClick={() => handlePurchase(grocerie.id)}>
                Purchased
              </button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Groceries;
