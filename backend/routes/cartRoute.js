import express from "express"
import { addToCArt, getCArt, removeFromCArt } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add",addToCArt)
cartRouter.post("/remove",removeFromCArt)
cartRouter.post("/get",getCArt)

export default cartRouter;