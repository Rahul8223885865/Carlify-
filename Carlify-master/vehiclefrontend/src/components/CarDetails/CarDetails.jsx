import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Fuel,
  GitFork,
  Gauge,
  Users,
  Palette,
  IndianRupee,
  Shield,
  MessageCircle,
  PhoneCall,
  Share2,
  Heart,
  ChevronRight,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContextProvider";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import UserNavbar from "../UserDashboard/UserNavBar";
import CarDetailsLoader from "./CarDetailsLoader";
import isLoggedIn from "../Auth/isLoggedIn";

function CarDetails() {
  const { ApiEndPoint } = useContext(UserContext);
  const [carDetails, setCarDetails] = useState([]);
  const [similarCars, setSimilarCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [carDetailId, setcarDetailId] = useState(id);

  let isAdmin = sessionStorage.getItem("admin") ? true : false;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
      notation: "compact",
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const fetchCarDetails = async () => {
    try {
      let response = await axios.get(
        `${ApiEndPoint}/car/cardetails/${carDetailId}`,
        {
          params: { isAdmin },
        }
      );
      if (response?.data?.status) {
        setTimeout(() => {
          setCarDetails(response?.data?.carDetail);
          setRecommendedCars(response?.data?.recommendedCars);
          setSimilarCars(response?.data?.similarCars);
          setIsLoading(false);
        }, [500]);
      }
    } catch (error) {
      console.error("Error fetching car details", error);
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${carDetails.brand} ${carDetails.model}`,
        text: `Check out this ${carDetails.year} ${carDetails.brand} ${carDetails.model}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  useEffect(() => {
    fetchCarDetails();
    window.scrollTo(0, 0);
  }, [carDetailId]);

  const CarCard = ({ car }) => (
    <Link
      onClick={() => setcarDetailId(car._id)}
      to={`/cardetails/${car._id}`}
      className="group"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="text-white font-semibold">
              {car.brand} {car.model}
            </div>
            <div className="text-white/90 text-sm">
              {formatPrice(car.price)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      {isLoggedIn() ? <UserNavbar /> : <Navbar />}
      {isLoading ? (
        <CarDetailsLoader />
      ) : (
        <div className="bg-gray-50">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image and Price */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="relative">
                    <img
                      src={carDetails.image}
                      alt={`${carDetails.brand} ${carDetails.model}`}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={handleShare}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                      >
                        <Share2 className="h-6 w-6 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">
                        {carDetails.brand} {carDetails.model}
                      </h1>
                      <div className="mt-1 flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {carDetails.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(carDetails.price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {carDetails.negotiable === "yes" && "Price Negotiable"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a
                      href={`tel:${carDetails.contactNumber}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      <PhoneCall size={20} /> Call Seller
                    </a>
                    <a
                      href={`mailto:${carDetails.email}`}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      <Mail size={20} /> Email Seller
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Key Details */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Key Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{carDetails.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Fuel className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Fuel Type</p>
                        <p className="font-medium">{carDetails.fuelType}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GitFork className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Transmission</p>
                        <p className="font-medium">{carDetails.transmission}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Gauge className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Kilometers</p>
                        <p className="font-medium">{carDetails.kilometer} KM</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Previous Owners</p>
                        <p className="font-medium">{carDetails.owners}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Palette className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Color</p>
                        <p className="font-medium">{carDetails.color}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Additional Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Date Posted</span>
                      </div>
                      <span className="font-medium">
                        {new Date(carDetails.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Price negotiable</span>
                      </div>
                      <span className="font-medium capitalize">
                        {carDetails.negotiable}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-600">Insurance</span>
                      </div>
                      <span className="font-medium capitalize">
                        {carDetails.insurance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">
                    Seller Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 rounded-full p-3">
                        <MessageCircle className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{carDetails.sellerName}</p>
                        <p className="text-sm text-gray-500">Verified Seller</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <Link
                        to={`tel:${carDetails.contactNumber}`}
                        className="font-medium"
                      >
                        +91 {carDetails.contactNumber}
                      </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <Link
                        to={`mailto:${carDetails.email}`}
                        className="font-medium"
                      >
                        {carDetails.email}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Cars */}
            {similarCars.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Similar Brand Cars
                  </h2>
                  <Link
                    to={`/car-brand/${carDetails.brand}`}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                  >
                    View All <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarCars.map((car) => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Cars */}
            {recommendedCars.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recommended Cars
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedCars.map((car) => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
      <Footer />
    </>
  );
}

export default CarDetails;
