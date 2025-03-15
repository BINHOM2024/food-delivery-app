import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "https://food-delivery-app-rhf5.onrender.com/";
  const { amount, items, address } = req.body.orderData;
  const { userId } = req.body;

  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: "ugx",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 3750,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "ugx",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 3750,
      },
      quantity: 1,
    });

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: line_items,
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error creating order:", error);
    res.json({
      success: false,
      message: "Error while paying: " + error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    res.json({ success: false, message: "error while paying: " + error });
  }
};

const userOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const orderUser = await orderModel.find({ userId });
    res.json({ success: true, message: orderUser });
  } catch (error) {
    res.json({ success: false, message: "error while retrieving: " + error });
  }
};

const ordersList = async (req, res) => {
  try {
    const orderList = await orderModel.find({});
    res.json({ success: true, message: orderList });
  } catch (error) {
    res.json({
      success: false,
      message: "error while retrieving orders: " + error,
    });
  }
};

const statusUpdate = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const iooiu = await orderModel.findByIdAndUpdate( orderId,{status})
    res.json({success:true,message:"status updated"})
  } catch (error) {
    res.json({
      success: false,
      message: "error while updating status: " + error,
    });
  }
};

export { placeOrder, verifyOrder, userOrder, ordersList,statusUpdate };
