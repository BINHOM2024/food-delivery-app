import userModel from "../models/userModel.js";

const addToCArt = async (req, res) => {
  const id = req.body.userId;
  const itemId = req.body.itemId;
  try {
    const user = await userModel.findById(id);
    const cartData = await user.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(id, { cartData });
    res.json({ success: true, message: "cart added" });
  } catch (error) {
    res.json({ success: false, message: "error adding cart: " + error });
  }
};

const removeFromCArt = async (req, res) => {
  const id = req.body.userId;
  const itemId = req.body.itemId;
  try {
    const user = await userModel.findById(id);
    const cartData = await user.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(id, { cartData });
    res.json({ success: true, message: "cart removed" });
  } catch (error) {
    res.json({ success: false, message: "error deleting cart: " + error });
  }
};

const getCArt = async (req, res) => {
  const id = req.body.userId;
  try {
    const user = await userModel.findById(id);
    const cartData = await user.cartData;
    res.json({ success: true, message: cartData });
  } catch (error) {
    res.json({
      success: false,
      message: "error while getting all carts: " + error,
    });
  }
};

export { addToCArt, removeFromCArt, getCArt };
