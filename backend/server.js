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
const allowedOrigins = [
  'https://food-delivery-app-rhf5.onrender.com' ,
  "https://food-delivery-admin-6alb.onrender.com"
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

connectToDb;
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartMiddleware, cartRouter);
app.use("/api/order",orderRouter);

app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});
