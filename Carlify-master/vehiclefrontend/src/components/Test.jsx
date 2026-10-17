import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Calendar, Car, Fuel, Gauge, IndianRupee, Palette } from "lucide-react";

function Test() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-[500px]">
        <div className="flex rounded-2xl bg-white/90 shadow-lg backdrop-blur-sm w-[33%] p-1">
          {/* image div  */}
          <div className="overflow-hidden w-50 h-100 rounded-2xl">
            <img className="rounded-2xl p-1" src="images/car.jpg" alt=""/>
            <div className="flex justify-center items-center">
              <button className="w-full mx-3 my-3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
          {/* contect div */}
          <div className="rounded-2xl">
            <div className="w-full p-6 h-50">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Tata</h2>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <IndianRupee className="w-6 h-6 text-green-600" />
                <span className="text-2xl font-bold text-green-600">10000</span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2  gap-4 mb-6 w-full h-50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">2022</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">CNG</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">1000 KM</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-600" />
                <span className="text-gray-600">Black</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Test;
