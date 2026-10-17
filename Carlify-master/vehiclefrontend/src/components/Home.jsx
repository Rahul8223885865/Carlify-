import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import "./Home.css";
import BrandFilter from "./Filter/BarndFilter/BrandFilter";
import HeroSection from "./Pages/HeroSection/HeroSection";
import {
  Car,
  Star,
  Clock,
  ChevronRight,
  IndianRupee,
  Gauge,
  MapPin,
} from "lucide-react";
import { UserContext } from "./Context/UserContextProvider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Testimonials from "./Pages/Testimonials/Testimonials";
import CallToAction from "./Pages/CallToAction/CallToAction";

const Home = () => {
  const { ApiEndPoint } = useContext(UserContext);
  let navigate = useNavigate();

  const [homePageData, setHomePageData] = useState([]);
  let { featuredCars, recentCars } = homePageData;

  const fatchData = async () => {
    try {
      let response = await axios.get(`${ApiEndPoint}/homePageData`);
      if (response?.data?.status) {
        console.log(response.data.message);
        setHomePageData(response.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <HeroSection />
        <BrandFilter />
      </div>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured{" "}
              <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Cars
              </span>
            </h2>
            <Link
              to={"/featured-cars"}
              className="text-blue-600 flex items-center gap-1 hover:text-blue-700"
            >
              View all <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars?.map((car, index) => (
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
                    <button
                      onClick={() => navigate(`/cardetails/${car._id}`)}
                      className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Recent{" "}
            <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Listings
            </span>
          </h2>
          <button className="text-blue-600 flex items-center gap-1 hover:text-blue-700">
            View all <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentCars?.map((car, index) => (
            <div
              key={index}
              onClick={() => navigate(`/cardetails/${car._id}`)}
              className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{car.title}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  <span className="text-xl font-semibold text-green-600">
                    {car.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <MapPin size={16} />
                  {car.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why{" "}
            <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-12 h-12 text-blue-600" />,
                title: "Trusted Sellers",
                description:
                  "All our sellers are verified and reviewed by our community",
              },
              {
                icon: <Car className="w-12 h-12 text-blue-600" />,
                title: "Quality Vehicles",
                description:
                  "Every vehicle undergoes a thorough inspection process",
              },
              {
                icon: <Clock className="w-12 h-12 text-blue-600" />,
                title: "Fast & Easy",
                description: "Quick and hassle-free buying and selling process",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Home;
