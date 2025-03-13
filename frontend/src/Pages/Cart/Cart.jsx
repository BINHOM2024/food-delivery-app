import React, { useContext } from "react";
import { context } from "../../Context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { itemCount,foods_list,url, handleRemoveItem,getTotalPrice } =
    useContext(context);
  const navigateTo = useNavigate();
  return (
    <div className="cart">
      <div className="cart-info">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {foods_list.map(food => {
        if (itemCount[food._id] > 0) {
          return (
            <div key={food._id}>
              <div className="cart-info cart-list">
                <img src={url+"/images/"+food.image} alt="" />
                <p>{food.name}</p>
                <p>${food.price}</p>
                <p>{itemCount[food._id]}</p>
                <p>${itemCount[food._id] * food.price}</p>
                <p
                  className="remove"
                  onClick={() => handleRemoveItem(food._id)}
                >
                  x
                </p>
              </div>
              <hr />
            </div>
          );
        }
      })}
      <div className="cart-bottom">
        <div className="price-details">
          <h2>Cart Tools</h2>
          <div className="sub-total-fee">
            <p>Subtotal</p>
            <p>${getTotalPrice()}</p>
          </div>
          <hr />
          <div className="delivery-fee">
            <p>Delivery Fee</p>
            <p>${getTotalPrice()==0?0:2}</p>
          </div>
          <hr />
          <div className="total-fee">
            <p>Total</p>
            <p>${getTotalPrice()===0?0:getTotalPrice()+2}</p>
          </div>
          <hr />
          <button onClick={()=>navigateTo("/order")}>GO TO CHECKOUT</button>
        </div>
        <div className="promocode">
          <p>If you have a promo code, Enter it here.</p>
          <div className="promocode-inputs">
            <input type="text" placeholder="promo code"/>
          <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
