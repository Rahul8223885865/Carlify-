import React, { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const ApiEndPoint = "https://carlify-malviyarohitttt.onrender.com/api/v1";
  // const ApiEndPoint = "http://localhost:9090/api/v1";


  const [filterData, setFilterData] = useState({
    year: "All",
    location: "All",
    color: "All",
    minPrice: "",
    maxPrice: ""
  })

  const handleChange = (event) => {
    setFilterData({ ...filterData, [event.target.name]: event.target.value })
  }

  return (
    <UserContext.Provider value={{ ApiEndPoint, filterData,setFilterData, handleChange }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;