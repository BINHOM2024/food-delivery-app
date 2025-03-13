import React, { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import DisplayMenu from "../../components/DisplayMenu/DisplayMenu";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div style={{ width: "80%",
    margin:"3vw auto"}}>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <DisplayMenu category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
