import { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { context } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopUp = ({ setSignUpPopUp }) => {
  const { url, setToken } = useContext(context);
  const [currentStatus, setCurrentStatus] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmitHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((current) => ({ ...current, [name]: value }));
  };

  const login = (e) => {
    e.preventDefault();
    let storeUrl = url;
    if (currentStatus === "Sign Up") {
      storeUrl += "/api/user/register";
    } else {
      storeUrl += "/api/user/login";
    }
    axios.post(storeUrl, { data })
      .then(response => {
       if (response.data.success) {
         localStorage.setItem("token", response.data.token);
         setToken(response.data.token);
         setSignUpPopUp(false);
       } else {
         alert(response.data.message); 
       }
      })
    .catch(error=>alert(error.response.data.message || "something went wrong"))
    
  };
  return (
    <div className="loginpopup">
      <form className="form-cont" onSubmit={login}>
        <div className="loginpopup-title">
          <h2>{currentStatus}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setSignUpPopUp(false)}
            title="remove popup"
          />
        </div>
        <div className="loginpopup-inputs">
          {currentStatus === "Sign Up" ? (
            <input
              type="text"
              placeholder="your name"
              onChange={onSubmitHandler}
              name="name"
              value={data.name}
              required
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="email"
            onChange={onSubmitHandler}
            name="email"
            value={data.email}
            required
          />
          <input
            type="password"
            placeholder="password"
            onChange={onSubmitHandler}
            name="password"
            value={data.password}
            required
          />
        </div>
        <button>{currentStatus === "Sign Up" ? "Sign Up" : "login"}</button>
        <div className="loginpopup-account">
          {currentStatus === "Sign Up" ? (
            <p>
              already have an account?
              <span onClick={() => setCurrentStatus("Login")}>login here</span>
            </p>
          ) : (
            <p>
              do not have an account?
              <span onClick={() => setCurrentStatus("Sign Up")}>
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;
