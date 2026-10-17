import React from "react";
import UserNavBar from "./UserNavBar";
import CarList from "../Carlist/CarList";
import Footer from "../Footer/Footer";
import Filter from "../Filter/Filter";

function UserDashboard() {
  return (
    <>
      <UserNavBar />
      <div>
        <Filter />
        <CarList />
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
