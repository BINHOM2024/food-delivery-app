import express from "express";
import cors from "cors";
import "dotenv/config"
import { connectToDb } from "./config/DataBase.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import { cartMiddleware } from "./middleware/cartMiddleware.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT =process.env.PORT || 3002;

app.use(express.json());
app.use(cors({ origin: 'https://food-delivery-app-rhf5.onrender.com' }));

connectToDb;
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartMiddleware, cartRouter);
app.use("/api/order",orderRouter);

app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});
