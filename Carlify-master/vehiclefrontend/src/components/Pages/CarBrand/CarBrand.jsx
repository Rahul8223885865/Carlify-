import React, { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContextProvider";
import { Gauge, IndianRupee } from "lucide-react";
import Footer from "../../Footer/Footer";

function CarBrand() {
  let { brand } = useParams();
  let { ApiEndPoint } = useContext(UserContext);

  const [CarBrandData, setCarBrandData] = useState([]);

  const fatchCarBrand = useCallback(async () => {
    try {
      let response = await axios.get(`${ApiEndPoint}/car/brand/${brand}`);
      if (response?.data?.status) {
        console.log(response.data.carData);
        setCarBrandData(response.data.carData);
      } else {
        console.error(response?.data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, [ApiEndPoint, brand]);
  useEffect(() => {
    fatchCarBrand();
  }, [fatchCarBrand]);

  return (
    <div>
      <Navbar />

      <Brand brand={brand} CarBrandData={CarBrandData} />

      <Footer />
    </div>
  );
}

export default CarBrand;

const Brand = ({ brand, CarBrandData }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {brand}{" "}
            <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Cars
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CarBrandData?.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
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
  );
};
