import { useEffect, useState } from "react"
import "./Orders.css"
import axios from "axios";
import { assets } from "../../../../frontend/src/assets/assets";

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);

  const statusHandler = async (e,orderId) => {
    const status = e.target.value;
    const response = await axios.post(`${url}/api/order/status`, {
      status,orderId
    })
    if (response.data.success) {
      await getAllOrders();
    }
  }
  const getAllOrders = async () => {
    const response =await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders( response.data.message)
    }
  }
  useEffect(() => {
    getAllOrders();
  }, [])
  
  return (
    <div className="orders">
      <h2>My Orders</h2>
      {orders.map((order, index) => (
        <div key={index} className="order-item">
          <img src={assets.parcel_icon} />
          <div className="order-item-details">
            <p>
              {order.items.map((item, index) => {
                if (index == order.items.lenght - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}
            </p>
            <div className="order-item-address">
              <p>{`${order.address.firstName} ${order.address.lastName}`}</p>
              <p>{`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
              <p>{`${order.address.state}`}</p>
            </div>
          </div>
          <p>${order.amount}.00</p>
          <p>Items:{order.items.length}</p>
          <select className="order-item-status" onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
            <option value="Food Processing">Food Processing</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Orders