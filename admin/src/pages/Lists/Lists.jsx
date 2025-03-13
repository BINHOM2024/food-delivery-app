import axios from "axios";
import "./Lists.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Lists = ({url}) => {
  const [Lists, setLists] = useState([]);
  const foodsList = () => {
    axios
      .get(`${url}/api/food/list`)
      .then((response) => setLists(response.data.message))
      .catch((error) => console.log(error));
  };

  const removeFood = (id) => {
    axios
      .delete(`${url}/api/food/remove/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        foodsList();
      })
      .catch(() => toast.error("Error"));
  };
  useEffect(() => {
    foodsList();
  });
  return (
    <div className="list">
      <h2>All Foods List</h2>
      <div className="food-title ">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      {Lists.map((list) => (
        <div className="food-list" key={list._id}>
          <img src={`${url}/images/${list.image}`} />
          <p>{list.name}</p>
          <p>{list.category}</p>
          <p>${list.price}</p>
          <p className="cursor" onClick={() => removeFood(list._id)} style={{fontSize:"22px"}}>
            x
          </p>
        </div>
      ))}
    </div>
  );
};

export default Lists;
