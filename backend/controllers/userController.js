import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import userModel from "../models/userModel.js";

const generateToken = (id) => {
 return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2hr" });
};

const userRegister = async (req, res) => {
  const { data: { name, email, password } } = req.body;
  try { 
    if (!name || !email || !password)
      return res.json({
        success: false,
        message: "fill out all the fields please.",
      });
    if (!validator.isEmail(email))
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    const exists = await userModel.findOne({ email });
    if (exists) return res.json({ success: false, message: "user already exists" });
    if (password.length < 8)
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
      await newUser.save();
    const token = generateToken(newUser._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "error registering: " + error });
  }
};

const userLogin = async (req, res) => {
  const { data: { password, email } } = req.body;
    try {
        if (!email || !password)
            return res.json({
              success: false,
              message: "fill out all the fields please!",
            });
        const user = await userModel.findOne({ email })
        if (!user) return res.json({success:false, message: "user doesn't exist" })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.json({ success: false, message: "invalid credentials" });
      const token = generateToken(user._id)
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: "error while login: " + error });
    }
};

export { userRegister, userLogin };
