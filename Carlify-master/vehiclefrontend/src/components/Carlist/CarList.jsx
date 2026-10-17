import React, { useContext } from "react";
import "./CarList.css";

import Loader from "../Loader/Loader";
import CarCard from "../CarCard/CarCard";
import { CarContext } from "../Context/CarContextProvider";
import { UserContext } from "../Context/UserContextProvider";

const CarList = () => {
  let { carList, loading } = useContext(CarContext);

  let { filterData } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-wrap max-w-7xl mx-auto">
        {loading ? (
          <Loader />
        ) : (
          [...carList]
            ?.reverse()
            .filter(
              (car) =>
                (filterData.year === "All" || car.year === filterData.year) &&
                (filterData.color === "All" ||
                  car.color.toLowerCase() === filterData.color.toLowerCase()) &&
                (filterData.location === "All" ||
                  car.location.toLowerCase() ===
                    filterData.location.toLowerCase()) &&
                (!filterData.minPrice || car.price >= filterData.minPrice) &&
                (!filterData.maxPrice || car.price < filterData.maxPrice)
            )
            .map((car) => <CarCard car={car} />)
        )}
      </div>
    </>
  );
};

export default CarList;
