import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category,setCategory}) => {
 
  return (
    <div className="explore-menu" id="explore-menu">
      <h2>Explore our menu here</h2>
      <p>
        choose from a diverse menu featuring a delectable array of dishes.our
        mission is to satisfy your cravings and elevate your dining
        experience,one delicious meal at a time.
      </p>
      <div className="explore-menu-item">
        {menu_list.map((item, index) => (
            <div key={index} className="explore-menu-item-list" onClick={()=>setCategory(current=>current===item.menu_name?"All":item.menu_name)}>
            <img src={item.menu_image} alt="" className={category===item.menu_name?"active":""} />
            <p>{ item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
