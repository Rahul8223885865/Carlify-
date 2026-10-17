import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const brands = [
  { name: "Maruti Suzuki", logo: "/BrandLogo/Maruti Suzuki.png" },
  { name: "Mahindra", logo: "/BrandLogo/Mahindra.png" },
  { name: "Tata", logo: "/BrandLogo/Tata.png" },
  { name: "Hyundai", logo: "/BrandLogo/Hyundai.png" },
  { name: "Toyota", logo: "/BrandLogo/Toyota.png" },
  { name: "Kia", logo: "/BrandLogo/Kia.png" },
  { name: "Skoda", logo: "/BrandLogo/Skoda.png" },
  { name: "Jeep", logo: "/BrandLogo/Jeep.png" },
  { name: "Nissan", logo: "/BrandLogo/Nissan.png" },
  { name: "Renault", logo: "/BrandLogo/Renault.png" },
];

const BrandFilter = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 400; // Increased scroll amount for larger boxes

    if (container) {
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }

      // Update arrow visibility after scroll
      setTimeout(() => {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }, 300);
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto lg:mt-6 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-gray-800 text-2xl sm:text-3xl font-bold">
          Top{" "}
          <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            Brands
          </span>
        </h2>
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
        )}

        {/* Brand List */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-hidden space-x-4 sm:space-x-6 py-4 px-2 scroll-smooth"
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center p-4 border-2 border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer bg-white w-32 sm:w-40"
            >
              <Link
                to={`/car-brand/${brand.name}`}
                className="flex flex-col items-center w-full h-full justify-between"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2 sm:mb-3 bg-gray-100 rounded-full p-2">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="text-sm sm:text-base text-center font-semibold text-gray-800">
                  {brand.name}
                </span>
              </Link>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BrandFilter;
