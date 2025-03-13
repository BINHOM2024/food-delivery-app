import foodModel from "../models/foodModel.js";
import fs from "fs"

 const addFood = async (req, res) => {
  const image = `${req.file.filename}`; 
  const {  name, price, description, category } = req.body;
  try {
    if (!name || !price || !description || !category)
      return res.json({ message: "fill out all the fields please!" });
    if (!image) return res.json({ message: "select image please" });
    const isAddedBefore = await foodModel.findOne({ name });
    if (isAddedBefore)
      return res.status(400).json({ message: "food is already added before" });
    const saveFood = new foodModel({ 
      name,
      price,
      image,
      description,
      category,
    });
    await saveFood.save();
    res.status(201).json({success:true, message: "food added successfully" });
  } catch (error) {
    res.json({ message: "error in adding food to db: " + error });
  }
};

//get foods list
const foodsList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    return res.status(200).json({success:true,message:foods})
  } catch (error) {
    res.json({success:false,message:"error getting all foods"+error})
  }
}

//remove food
const remove_food = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) return res.json({ message: "id is required" })
    const food = await foodModel.findById(id)
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(id)
    res.json({message:"food deleted."})
  } catch (error) {
    res.json({message:"error deleting:"+error})
  }  
}

export {addFood,foodsList,remove_food}
