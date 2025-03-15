import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const context = createContext();
const StoreContext = ({ children }) => {
  const [itemCount, setItemCount] = useState({});
  const [token, setToken] = useState("");
  const [foods_list, setFoods_list] = useState([]);

  const url = "https://food-delivery-backend-b316.onrender.com";
  const handleRemoveItem = async (id) => {
    setItemCount((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 0),
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId: id },
        { headers: { token } }
      );
    }
  };
  const handleAddItem = async (id) => {
    setItemCount((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId: id },
        { headers: { token } }
      );
    }
  };

  const getTotalPrice = () => {
    return foods_list.reduce((total, food) => {
      if (itemCount[food._id] > 0) {
        return total + itemCount[food._id] * food.price;
      }
      return total;
    }, 0);
  };

  const fetchAllFoodsList = async () => {
    axios
      .get(url + "/api/food/list")
      .then((response) => setFoods_list(response.data.message))
      .catch((error) => console.log(error));
  };

  const loadCartData = (token) => {
    axios
      .post(url + "/api/cart/get/", {}, { headers: { token } })
      .then((response) => setItemCount(response.data.message))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchAllFoodsList();
    };
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      loadCartData(savedToken);
    }
    loadData();
  }, []);

  const checkTokenExpiry = () => {
    if (token) {
      const decode = jwtDecode(token);
      const date = Math.floor(Date.now() / 1000);
      if (decode.exp < date) {
        console.log("token expired");
        localStorage.removeItem("token");
        setToken("");
        location.href="/"
      }
    }
  };
  useEffect(() => {
    checkTokenExpiry();
    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 60000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <context.Provider
      value={{
        itemCount,
        setItemCount,
        handleRemoveItem,
        handleAddItem,
        getTotalPrice,
        url,
        token,
        setToken,
        foods_list,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default StoreContext;
