import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios"
import "./AddItem.css";
import { toast } from "react-toastify";

const AddItem = ({url}) => {
  const [image, setImage] = useState();
  const [datas, setData] = useState({
    name:"",description:"",price:"",category:"Salad"
  });
  const category = [
    "Salad",
    "Rolls",
    "Deserts",
    "Sandwich",
    "Cake",
    "Pure Veg",
    "Pasta",
    "Noodles",
  ];

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((current) => ({ ...current, [name]: value }));
  };

  const submithandler = (e) => {
    e.preventDefault();
    if(!image) return alert("please select an image")
    const formData = new FormData();
    formData.append("image", image)
    for (const [key, value] of Object.entries(datas)) {
      formData.append(key, value);
    }
    const response = axios.post(
      `${url}/api/food/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((result)=>{ setData({ name: "", description: "", price: "", category: "Salad" });
    setImage(null); toast.success(result.data.message)})
    .catch(error=>toast.error(error.response.data.message))
  }
  return (
    <form className="add" onSubmit={submithandler}>
      <div className="upload-image col">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img src={image ? URL.createObjectURL(image) : assets.upload_area} />
        </label>
        <input
          id="image"
          type="file"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className="product-name col">
        <p>Product name</p>
        <input
          onChange={handleOnChange}
          type="text"
          placeholder="type here..."
          name="name"
          required
          value={datas.name}
        />
      </div>
      <div className="product-desc col">
        <p>Product description</p>
        <textarea
          onChange={handleOnChange}
          placeholder="write description here..."
          rows={6}
          name="description"
          required
          value={datas.description}
        ></textarea>
      </div>
      <div className="product-details">
        <p>Product name</p>
        <p>Product price</p>
        <select onChange={handleOnChange} name="category" required>
          {category.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
        <input
          onChange={handleOnChange}
          type="number"
          placeholder="$..."
          name="price"
          required
          value={datas.price}
        />
      </div>
      <button>ADD ITEM</button>
    </form>
  );
};

export default AddItem;
