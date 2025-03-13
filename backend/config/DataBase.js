import mongoose from "mongoose";
import "dotenv/config";
export const connectToDb = mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
