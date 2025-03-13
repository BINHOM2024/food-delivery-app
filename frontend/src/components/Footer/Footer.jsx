import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            libero ullam corrupti rerum alias cupiditate voluptates odit
            recusandae debitis vitae! Lorem ipsum dolorrecusandae debitis vitae!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            assumenda?
          </p>
          <div className="footer-social-media">
            <img src={assets.twitter_icon} alt="" title="twitter" />
            <img src={assets.linkedin_icon} alt="" title="linkedin" />
            <img src={assets.facebook_icon} alt="" title="facebook" />
          </div>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+2567123456781</li>
            <li>contactme@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p>copyright &copy;2025 ytt.com-All Rights Reserved</p>
    </div>
  );
};

export default Footer;
