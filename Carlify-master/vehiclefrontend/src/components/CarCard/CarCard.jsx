import { useNavigate } from "react-router-dom";
import React from "react";
import { IndianRupee, Fuel, Calendar, Palette, Gauge } from "lucide-react";

function CarCard({ car }) {
  let navigate = useNavigate();

  let {
    image,
    kilometer,
    brand,
    model,
    year,
    location,
    color,
    fuelType,
    price,
  } = car;

  return (
    <>
      <div key={car._id} className="max-w-6xl mx-auto px-2 sm:px-4 py-6">
        <div
          onClick={() => navigate(`/cardetails/${car._id}`)}
          className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:cursor-pointer"
        >
          {/* Car Image */}
          <div className="relative flex justify-center px-2 min-h-60 h-60 overflow-hidden">
            <img
              src={image}
              alt="Luxury Car"
              className="w-96 rounded-xl my-2 object-cover"
            />
            <div className="absolute top-3 left-5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="text-blue-600 font-medium text-xs">
                {location}
              </span>
            </div>
            {car.featured && (
              <div className="absolute top-3 right-5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-blue-600 font-medium text-xs">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Car Details */}
          <div className="px-4 py-3">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {brand} {model}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-1 mb-2">
              <IndianRupee className="w-4 h-4 text-green-600" />
              <span className="text-xl font-semibold text-green-600">
                {price}
              </span>
            </div>

            {/* Specifications */}
            <div className="flex justify-between gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="w-4 h-4" />
                <span>{fuelType}</span>
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="w-4 h-4" />
                <span>{kilometer} KM</span>
              </div>
              <div className="flex items-center gap-1">
                <Palette className="w-4 h-4" />
                <span>{color}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarCard;
