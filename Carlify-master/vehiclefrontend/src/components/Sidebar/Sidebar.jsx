import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar py-8">
      <div className="filter-group">
        <h3 style={{color:"blue",fontWeight:"500"}} >Model</h3>
        <label>
          <input type="checkbox" name="model" value="2024" /> 2024
        </label>
        <label>
          <input type="checkbox" name="model" value="2023" /> 2023
        </label>
        <label>
          <input type="checkbox" name="model" value="2022" /> 2022
        </label>
        <label>
          <input type="checkbox" name="model" value="2021" /> 2021
        </label>
        <label>
          <input type="checkbox" name="model" value="2020" /> Before 2020
        </label>
      </div>
      <div className="filter-group">
        <h3 style={{color:"blue",fontWeight:"500"}}>Price</h3>
        <label>
          <input type="checkbox" name="price" value="Below 5L" /> Below ₹5L
        </label>
        <label>
          <input type="checkbox" name="price" value="5L-10L" />
          ₹5L - ₹10L
        </label>
        <label>
          <input type="checkbox" name="price" value="10L-20L" /> ₹10L - ₹20L
        </label>
        <label>
          <input type="checkbox" name="price" value="Above 20L" /> Above ₹20L
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
