import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";

function UserNavBar() {
  const loggedOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-600" : "text-gray-600";
  };

  return (
    <nav className="bg-white shadow-md w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/user/dashboard" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Carlify
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to={"/user/mylistings"}
              className={`${isActive(
                "/user/mylistings"
              )} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              MyListings
            </Link>
            <Link
              to={"/user/addnewlisting"}
              className={`${isActive(
                "/user/addnewlisting"
              )} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Add New Listing
            </Link>
            <Link
              to={"/user/profile"}
              className={`${isActive(
                "/user/profile"
              )} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Profile
            </Link>
            {/* Auth Buttons */}
            <button
              onClick={loggedOut}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Log Out
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to={"/user/mylistings"}
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/user/mylistings"
            )} hover:text-blue-600 hover:bg-gray-100 transition-colors`}
          >
            MyListings
          </Link>
          <Link
            to="/user/addnewlisting"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/user/addnewlisting"
            )} hover:text-blue-600 hover:bg-gray-100 transition-colors`}
          >
            Add New Listing
          </Link>
          <Link
            to="/user/profile"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
              "/user/profile"
            )} hover:text-blue-600 hover:bg-gray-100 transition-colors`}
          >
            Profile
          </Link>
          <div className="flex items-center space-x-2 px-3 py-2">
            <button
              onClick={loggedOut}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavBar;
 
