import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-md w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">Carlify</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`${isActive('/')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/inventory"
              className={`${isActive('/inventory')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Inventory
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${isActive('/contact')} hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Contact
            </Link>

        
            {/* Cart Button */}
            <button className="relative text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                2
              </span>
            </button>

            {/* Auth Buttons */}
            <Link to={"/signin"}  className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign in
            </Link >
            <Link to={"/signup"} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Sign up
            </Link >
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')} hover:text-blue-600 hover:bg-gray-100 transition-colors`}
          >
            Home
          </Link>
          <Link
            to="/inventory"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/inventory')} hover:text-blue-600 hover:bg-gray-100 transition-colors`}
          >
            Inventory
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about')} hover:text-blue-600 hover:bg-gray-100 transition-colors`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact')} hover:text-blue-600 hover:bg-gray-100 transition-colors`}
          >
            Contact
          </Link>

          <div className="flex items-center space-x-2 px-3 py-2">
            <Link to={"/signin"} className="flex-1 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-md text-sm font-medium border border-blue-600 transition-colors">
              Sign in
            </Link>
            <Link to={"/signup"} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
