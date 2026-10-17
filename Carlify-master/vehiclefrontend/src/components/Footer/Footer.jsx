import React from "react";
import {
  Car,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">
                Carlify
              </span>
            </div>
            <p className="text-sm">
              Your trusted destination for premium vehicles. Discover your dream
              car with us.
            </p>
            <div className="flex space-x-4">
              <a href className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href className="hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href className="hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href className="hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  Featured Cars
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  Sell Your Car
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  Car Reviews
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  News & Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href className="hover:text-blue-500 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>123 Car Street, Indore</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+91 9669264151</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>info@Carlify.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Carlify. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href className="hover:text-blue-500 transition-colors">
                Privacy
              </a>
              <a href className="hover:text-blue-500 transition-colors">
                Sitemap
              </a>
              <a href className="hover:text-blue-500 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
