import React from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import SignIn from "./components/Authorizations/SignIn/SignIn.jsx";
import SignUp from "./components/Authorizations/SignUp/SignUp";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import UserProfile from "./components/UserDashboard/Profile/UserProfile";
import AddNewListing from "./components/UserDashboard/AddNewListing/AddNewListing";
import MyListings from "./components/UserDashboard/MyListings/MyListings";
import UserCart from "./components/UserDashboard/UserCart/UserCart";
import AboutUs from "./components/Pages/AboutUs/AboutUs.jsx";
import ContactUs from "./components/Pages/ContactUs/ContactUs.jsx";
import ProtectedRoute from "../src/components/Auth/ProtectedRoute.jsx";
import CarDetails from "./components/CarDetails/CarDetails";
import VerifyEmail from "./components/Pages/VerifyEmail/VerifyEmail.jsx";
import AdminDashboard from "./components/Admin/DashBoard/AdminDashboard.jsx";
import AdminLogin from "./components/Admin/Login/AdminLogin.jsx";
import ProtectedAdmin from "./components/Admin/AdminAuth/ProtectedAdmin.jsx";
import EditCarDetails from "./components/UserDashboard/MyListings/EditCarDetails.jsx";
import AdminContextProvider from "./components/Context/AdminContextProvider.js";
import VideoFeed from "./components/VideoFeed/VideoFeed.jsx";
import FeaturedCars from "./components/Pages/FeaturedCars/FeaturedCars.jsx";
import CarBrand from "./components/Pages/CarBrand/CarBrand.jsx";
import Inventory from "./components/Inventory/Inventory.jsx";
import ResetPassword from "./components/Pages/ResetPassword/ResetPassword.jsx";
import ForgotPassword from "./components/Pages/ForgetPassword/Forgot Password.jsx";
import VerifyOtp from "./components/Pages/VerifyOtp/VerifyOtp.jsx";

function App() {
  const location = useLocation();
  if (["/admin/signin", "/", "/signin", "/signup"].includes(location.pathname)) {
    sessionStorage.clear();
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/videos" element={<VideoFeed />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cardetails/:id" element={<CarDetails />} />
        <Route path="/varifyEmail" element={<VerifyEmail />} />
        <Route path="/admin/signin" element={<AdminLogin />} />
        <Route path="/featured-cars" element={<FeaturedCars />} />
        <Route path="/car-brand/:brand" element={<CarBrand />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        



        {/* User Dashboard Routes */}
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="addnewlisting" element={<AddNewListing />} />
                <Route path="mylistings" element={<MyListings />} />
                <Route path="cartItems" element={<UserCart />} />
                <Route path="editcardetails" element={<EditCarDetails />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes with Context */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdmin>
              <AdminContextProvider>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                </Routes>
              </AdminContextProvider>
            </ProtectedAdmin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
