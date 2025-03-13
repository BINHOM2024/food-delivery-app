import "./Navbar.css"
import { assets } from '../../assets/assets'
import { useContext, useState } from "react"
import { Link,useNavigate } from "react-router-dom";
import { context } from "../../Context/StoreContext";

const Navbar = ({ setSignUpPopUp }) => {
  const navigateTo = useNavigate();
  const {getTotalPrice,token,setToken}=useContext(context)
  const [menu, setmenu] = useState("home");

  const logOut = () => {
    setToken("")
    localStorage.removeItem("token")
  }
  return (
    <div className="navbar">
      <div className="navbar-profile-img">
        <Link to="/">
          <img src={assets.logo} className="navbar-logo" />
        </Link>
        <img src={assets.profile_icon} alt="" />
      </div>
      <ul className="navbar-item">
        <Link
          to="/"
          id="navbar-item-link"
          className={menu === "home" ? "active" : ""}
          onClick={() => setmenu("home")}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => setmenu("menu")}
        >
          Menu
        </a>
        <a
          href="#app-download"
          className={menu === "mobile app" ? "active" : ""}
          onClick={() => setmenu("mobile app")}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          className={menu === "contact" ? "active" : ""}
          onClick={() => setmenu("contact")}
        >
          Contact US
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <p className={getTotalPrice() === 0 ? "" : "indicator"}></p>
        </div>
        {!token ? (
          <button onClick={() => setSignUpPopUp(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-item">
              <li onClick={() => navigateTo("/myOrders")}>
                <img src={assets.bag_icon} />
                Order
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} />
                logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar