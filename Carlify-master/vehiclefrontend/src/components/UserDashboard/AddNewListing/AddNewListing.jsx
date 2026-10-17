import React, { useState, useContext } from "react";
import Footer from "../../Footer/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContextProvider";
import UserNavbar from "../UserNavBar";
import {
  Car,
  Gauge,
  User,
  Palette,
  Handshake,
  Shield,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Fuel,
  Settings,
  Clock,
  CheckCircle,
  IndianRupee,
  RefreshCw,
  ImageIcon,
  X,
} from "lucide-react";

const AddNewListing = () => {
  const locations = [
    "Delhi",
    "Barwaha",
    "Bhopal",
    "Indore",
    "Mumbai",
    "Pune",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Nagpur",
    "Patna",
    "Chandigarh",
    "Bhubaneswar",
    "Visakhapatnam",
    "Ludhiana",
    "Agra",
    "Varanasi",
    "Coimbatore",
    "Thane",
    "Nashik",
    "Meerut",
    "Ranchi",
    "Guwahati",
    "Jabalpur",
    "Raipur",
    "Kota",
    "Gwalior",
    "Dehradun",
    "Amritsar",
    "Vadodara",
    "Noida",
    "Gurgaon",
    "Ghaziabad",
    "Faridabad",
    "Udaipur",
    "Mysore",
    "Jodhpur",
    "Kanpur",
  ];

  const { ApiEndPoint } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  let CurretUser = JSON.parse(sessionStorage.getItem("user"));
  let { name, email, mobile } = CurretUser;
  let userId = CurretUser._id;
  let token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    fuelType: "",
    transmission: "",
    kilometer: "",
    owners: "",
    color: "",
    price: "",
    negotiable: "",
    insurance: "",
    location: "",
    sellerName: name,
    contactNumber: mobile,
    email: email,
    userId: userId,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(formData.image);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "image") {
        data.append("image", formData.image);
      } else {
        data.append(key, formData[key]);
      }
    });
    try {
      setIsLoading(true);
      const response = await axios.post(`${ApiEndPoint}/car/addCar`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status) {
        setIsLoading(false);
        toast.success(response.data.message);
        setFormData({
          brand: "",
          model: "",
          year: "",
          fuelType: "",
          transmission: "",
          kilometer: "",
          owners: "",
          color: "",
          price: "",
          negotiable: "",
          insurance: "",
          location: "",
          sellerName: name,
          contactNumber: mobile,
          email: email,
          userId: userId,
          image: null,
        });
      } else {
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      alert("Failed to submit car listing");
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="min-h-screen   py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl text-blue-600 font-bold text-left flex items-center mb-14">
            <Car className="mr-2 h-10 w-10" /> Add New Listing
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Brand and Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Car className="mr-2 h-4 w-4" /> Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Brand</option>
                  {[
                    "Maruti Suzuki",
                    "Hyundai",
                    "Tata",
                    "Mahindra",
                    "Honda",
                    "Toyota",
                    "Ford",
                    "Volkswagen",
                    "Renault",
                    "Kia",
                    "Nissan",
                    "MG",
                    "Skoda",
                    "Jeep",
                    "Mercedes-Benz",
                    "BMW",
                    "Audi",
                    "Jaguar",
                    "Land Rover",
                    "Volvo",
                    "Porsche",
                    "Lexus",
                    "Fiat",
                    "Mitsubishi",
                    "Citroën",
                    "Peugeot",
                    "Chevrolet",
                    "Datsun",
                    "Genesis",
                    "Alfa Romeo",
                    "Bugatti",
                    "Ferrari",
                    "Lamborghini",
                    "Maserati",
                    "Bentley",
                    "Rolls-Royce",
                    "Aston Martin",
                    "Subaru",
                    "Chrysler",
                    "Dodge",
                    "RAM",
                    "GMC",
                    "Cadillac",
                    "Tesla",
                    "Rivian",
                    "Lucid",
                    "BYD",
                    "Great Wall Motors",
                    "Geely",
                  ]
                    .sort()
                    .map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Settings className="mr-2 h-4 w-4" /> Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Year and Fuel Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Manufacturing Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Fuel className="mr-2 h-4 w-4" /> Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="CNG">CNG</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Transmission and Kilometer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Gauge className="mr-2 h-4 w-4" /> Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Clock className="mr-2 h-4 w-4" /> Kilometer
                </label>
                <input
                  type="number"
                  name="kilometer"
                  value={formData.kilometer}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Owners and Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Previous Owners
                </label>
                <input
                  type="number"
                  name="owners"
                  value={formData.owners}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Palette className="mr-2 h-4 w-4" /> Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Price and Negotiable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <IndianRupee className="mr-2 h-4 w-4" /> Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Handshake className="mr-2 h-4 w-4" /> Negotiable
                </label>
                <select
                  name="negotiable"
                  value={formData.negotiable}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Insurance and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Shield className="mr-2 h-4 w-4" /> Insurance
                </label>
                <select
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Insurance</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="mr-2 h-4 w-4" /> Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select Location</option>
                  {locations.sort().map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seller Name and Contact Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="mr-2 h-4 w-4" /> Seller Name
                </label>
                <input
                  type="text"
                  name="sellerName"
                  disabled
                  value={formData.sellerName}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone className="mr-2 h-4 w-4" /> Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  disabled
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Email and User ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Vehicle Images
              </h3>
              <div className="flex items-center justify-center w-full">
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG or JPEG (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
              <div />
              <div />

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" /> Submit Listing
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddNewListing;
