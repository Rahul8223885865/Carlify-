import React, { useEffect, useState, useContext, useRef } from "react";
import UserNavBar from "../UserNavBar";
import Footer from "../../Footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContextProvider";
import Loader from "../../Loader/Loader";
import {
  IndianRupee,
  Fuel,
  Calendar,
  Palette,
  Gauge,
  Edit,
} from "lucide-react";

import "./MyListings.css";
import { useNavigate } from "react-router-dom";

function MyListings() {
  let navigate = useNavigate();
  const { ApiEndPoint } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [carList, setCarList] = useState([]);
  const hasFetched = useRef(false); // Ref to track if function has run

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    let userId = currentUser._id;
    const loadMyListings = async () => {
      if (hasFetched.current) return; // Prevent second call
      hasFetched.current = true;
      try {
        let response = await axios.get(`${ApiEndPoint}/car/getCar/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.status) {
          setCarList(response.data.carData);
        } else {
          toast.error(response?.data?.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast.error("Failed to load listings. Please try again later.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, [500]);
      }
    };
    loadMyListings();
  }, [ApiEndPoint]);

  return (
    <>
      <UserNavBar />
      <div className="flex flex-wrap">
        {loading ? (
          <Loader />
        ) : (
          [...carList]
            ?.reverse()
            .map((car) => <Listings car={car} navigate={navigate} />)
        )}
      </div>
      <Footer />
    </>
  );
}

export default MyListings;

function Listings({ car, navigate }) {
  let { image, brand, model, year, price } = car;

  return (
    <div key={car._id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        data-aos="fade-up"
        className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden "
      >
        {/* Car Image */}
        <div className="relative flex justify-center px-3 min-h-64 h-64 overflow-hidden">
          <img
            onClick={() => {
              navigate(`/cardetails/${car._id}`);
            }}
            src={image}
            alt="Luxury Car"
            className="w-96 rounded-2xl my-2 hover:cursor-pointer"
          />
          <div className="absolute top-4 right-7 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Edit onClick={() => navigate("/user/editcardetails",{ state:car={car}})} className="text-blue-600" />
          </div>
        </div>

        {/* Car Details */}
        <div className="px-6 py-2 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-gray-800">
              {brand} {model}
            </h2>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1 mb-3">
            <IndianRupee className="w-4 h-4 text-green-600" />
            <span className="text-2xl font-bold text-green-600">{price}</span>
          </div>

          {/* Specifications Grid */}
          <div className=" flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{car.kilometer} KM</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{car.color}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
