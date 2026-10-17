import React from "react";
import { Star, Clock, TrendingUp } from "lucide-react";

function HeroSection() {
  return (
    <div className="relative">
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury car background"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.6)" }}
          />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-24">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Find Your{" "}
                <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  Perfect Car
                </span>
              </h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8">
                Discover the largest marketplace for second-hand vehicles. Buy
                and sell with confidence.
              </p>
            </div>

            {/* <div className="bg-white rounded-lg p-2 sm:p-4 max-w-3xl shadow-lg">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by make, model, or year..."
                    className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div> */}

            <div className="hidden md:flex gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <Star className="h-5 w-5 text-blue-300" />
                <span>Certified Quality</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <TrendingUp className="h-5 w-5 text-blue-300" />
                <span>Best Prices</span>
              </div>
              <div className="flex items-center gap-2 text-sm sm:text-base">
                <Clock className="h-5 w-5 text-blue-300" />
                <span>Quick Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden bg-blue-800 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 text-center text-sm">
          <div className="flex flex-col items-center">
            <Star className="h-5 w-5 mb-1 text-blue-300" />
            <span>Certified</span>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="h-5 w-5 mb-1 text-blue-300" />
            <span>Best Prices</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-5 w-5 mb-1 text-blue-300" />
            <span>Quick</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
