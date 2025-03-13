import { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import { context } from "../../Context/StoreContext"
import axios from "axios";
import {assets} from "../../assets/assets"

const MyOrders = () => {
    const { url, token ,setToken} = useContext(context);
    const [data, setData] = useState([])
  const getMyOrders = async () => {
      if(!token) return
      const response = await axios.post(`${url}/api/order/userOrder`, {}, { headers: { token } })
      if (response.data.success) {
          setData(response.data.message)
      } else {
        console.log(response.data.message)
      }
    
    }
   useEffect(() => {
     const savedToken = localStorage.getItem("token");
     if (savedToken && !token) {
       setToken(savedToken); 
     }
   }, []);
    useEffect(() => {
     getMyOrders()
    }, [token])

  return (
    <div className="myOrders">
      <h2>My Orders</h2>
        {data.map((order, index) => (
          <div key={index} className="items-list">
            <img src={assets.parcel_icon} />
            <p>
              {order.items.map((item, index) => {
                if (index == order.items.lenght - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}
            </p>
            <p>${order.amount}.00</p>
            <p>Items:{order.items.length}</p>
            <p className="status"><b>.</b> {order.status}</p>
            <button onClick={getMyOrders}>Track Order</button>
          </div>
        ))}
     
    </div>
  );
}

export default MyOrders