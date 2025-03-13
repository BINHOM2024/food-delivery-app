import "./DisplayMenu.css";
import { assets} from "../../assets/assets";
import { useContext } from "react";
import { context } from "../../Context/StoreContext";
const DisplayMenu = ({ category }) => {
  
  const { itemCount, handleRemoveItem, handleAddItem, foods_list,url } =
    useContext(context);

  return (
    <div className="display-menu">
      {foods_list.map((food, index) => {
        if (category === "All" || category === food.category)
          return (
            <div className="display-menu-list" key={index}>
              <div className="food-item-img-container">
                <img src={url+"/images/"+food.image} alt="food" />
                {!itemCount[food._id] ? (
                  <img
                    className="add-item-white-icon"
                    src={assets.add_icon_white}
                    onClick={() => handleAddItem(food._id)}
                  />
                ) : (
                  <div className="display-menu-list-count">
                    <img
                      src={assets.remove_icon_red}
                      onClick={() => handleRemoveItem(food._id)}
                    />
                    <p>{itemCount[food._id]}</p>
                    <img
                      src={assets.add_icon_green}
                      onClick={() => handleAddItem(food._id)}
                    />
                  </div>
                )}
              </div>
              <div className="display-menu-list-info">
                <div className="rating">
                  <p>{food.name}</p>
                  <img src={assets.rating_starts} alt="rating" />
                </div>
                <p>{food.description}</p>
                <p>${food.price}</p>
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default DisplayMenu;
