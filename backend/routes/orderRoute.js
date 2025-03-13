import express from "express"
import { ordersList, placeOrder, statusUpdate, userOrder, verifyOrder } from "../controllers/orderController.js"
import { cartMiddleware } from "../middleware/cartMiddleware.js";

const orderRouter = express.Router()

orderRouter.post("/place", cartMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrder", cartMiddleware, userOrder);
orderRouter.get("/list",  ordersList);
orderRouter.post("/status",  statusUpdate);

export default orderRouter;