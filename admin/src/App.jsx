import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddItem from "./pages/AddItem/AddItem";
import Lists from "./pages/Lists/Lists";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "http://localhost:3002";
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-cont">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddItem url={url} />} />
          <Route path="/lists" element={<Lists url={url} />} />
          <Route path="/order" element={<Orders url={url} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
