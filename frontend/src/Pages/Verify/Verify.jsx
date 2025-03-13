import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { context } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigateTo = useNavigate();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
    const { url, token } = useContext(context);
    
    const verifyPayment = async() => {
      const response=  await axios.post(`${url}/api/order/verify`, { success, orderId }, { headers: { token } })
        if (response.data.success) {
           navigateTo("/myOrders") 
        } else {
            navigateTo("/")
        }
    }
    useEffect(() => {
        verifyPayment()
    })
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
