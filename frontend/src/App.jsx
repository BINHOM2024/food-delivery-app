import React, { useState } from "react";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopup/LoginPopUp";
import Cart from "./Pages/Cart/Cart";
import StoreContext from "./Context/StoreContext";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Verify from "./Pages/Verify/Verify";
import MyOrders from "./Pages/myOrder/MyOrders";

const App = () => {
  const [signUpPopUp, setSignUpPopUp] = useState(false);
  return (
    <>
      <StoreContext>
        {signUpPopUp && <LoginPopUp setSignUpPopUp={setSignUpPopUp} />}
        <BrowserRouter>
          <Navbar setSignUpPopUp={setSignUpPopUp} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myOrders" element={<MyOrders />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </StoreContext>
    </>
  );
};

export default App;
