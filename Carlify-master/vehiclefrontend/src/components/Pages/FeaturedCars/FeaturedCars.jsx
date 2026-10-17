import React, { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import { Gauge, IndianRupee } from "lucide-react";
import axios from "axios";
import { UserContext } from "../../Context/UserContextProvider";
import toast from "react-hot-toast";
import Footer from "../../Footer/Footer";

function FeaturedCars() {
  let { ApiEndPoint } = useContext(UserContext);
  const [FeaturedCars, setFeaturedCars] = useState([]);

  const facthFeaturedCars = useCallback(async () => {
    try {
      let response = await axios.get(`${ApiEndPoint}/car/featured-cars`);
      if (response?.data?.status) {
        setFeaturedCars(response.data.featuredCars);
      } else {
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  }, [ApiEndPoint]);

  useEffect(() => {
    facthFeaturedCars();
  }, [facthFeaturedCars]);

  return (
    <div>
      <Navbar />
      <FeaturedCarsCard FeaturedCars={FeaturedCars} />
    </div>
  );
}

export default FeaturedCars;

const FeaturedCarsCard = ({ FeaturedCars }) => {
  return (
    <>
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured{" "}
              <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Cars
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FeaturedCars?.map((car, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {car.Featured && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-bold rounded">
                    Featured
                  </div>
                )}
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {car.year} {car.brand} {car.model}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                    <span className="text-xl font-semibold text-green-600">
                      {car.price}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 gap-4">
                    <span className="flex items-center gap-1">
                      <Gauge size={16} />
                      {car.kilometer}KMs
                    </span>
                    <Link
                      to={`/cardetails/${car._id}`}
                      className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
