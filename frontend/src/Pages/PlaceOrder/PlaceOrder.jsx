import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { context } from "../../Context/StoreContext";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const PlaceOrder = () => {
  const navigateTo=useNavigate()
  const { getTotalPrice, token, itemCount, foods_list,url } = useContext(context);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!token || getTotalPrice() == 0) {
     navigateTo("/cart")
    }
  }, [token])
  
  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((current) => ({ ...current, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let itemOrder = []
    foods_list.map(item => {
      if (itemCount[item._id] > 0) {
        let itemInfo = item;
      itemInfo["quantity"] = itemCount[item._id];
      itemOrder.push(itemInfo)
      }   
    })
   
    const orderData = {
      address: data,
      items: itemOrder,
      amount: getTotalPrice() + 2,
    };
    await axios.post(`${url}/api/order/place`, {orderData}, { headers: { token } })
      .then(response => {
        const  session = response.data.session_url;
        window.location.replace(session)
      })
    .catch(error=>alert(error.response.data.message))
  };
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <div className="fullname">
          <input
            required
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="first name"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="last name"
          />
        </div>
        <input
          required
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="email address"
        />
        <input
          required
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="street"
        />
        <div className="state">
          <div className="address">
            <input
              required
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="city"
            />
            <input
              required
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              placeholder="state"
            />
          </div>
          <div className="address">
            <input
              required
              type="text"
              name="zipCode"
              onChange={onChangeHandler}
              value={data.zipCode}
              placeholder="zip code"
            />
            <input
              required
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="country"
            />
          </div>
        </div>
        <input
          required
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="price-details">
          <h2>Cart Tools</h2>
          <div className="sub-total-fee">
            <p>Subtotal</p>
            <p>${getTotalPrice()}</p>
          </div>
          <hr />
          <div className="delivery-fee">
            <p>Delivery Fee</p>
            <p>${getTotalPrice() == 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="total-fee">
            <p>Total</p>
            <p>${getTotalPrice() === 0 ? 0 : getTotalPrice() + 2}</p>
          </div>
          <hr />
          <button>GO TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
