import React, { useContext, useState } from "react";
import {
  Sliders,
  MapPin,
  Calendar,
  PaintBucket,
  IndianRupee,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { UserContext } from "../Context/UserContextProvider";

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
const colors = [
  "Red",
  "Black",
  "White",
  "Blue",
  "Green",
  "Yellow",
  "Gray",
  "Silver",
  "Orange",
  "Brown",
  "Pink",
  "Purple",
  "Gold",
  "Maroon",
  "Beige",
];

const years = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "2017",
];

function Filter() {
  let { filterData, handleChange, setFilterData } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:mt-6">
      <div className="bg-white rounded-lg shadow-md my-3 sm:mx-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 transition-transform" />
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4" />
                  Year
                </label>
                <select
                  name="year"
                  value={filterData.year}
                  onChange={handleChange}
                  className="px-2 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="All">All</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <IndianRupee className="w-4 h-4" />
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    name="minPrice"
                    onChange={handleChange}
                    value={filterData.minPrice}
                    type="number"
                    placeholder="Min Price"
                    className="px-2 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    name="maxPrice"
                    onChange={handleChange}
                    value={filterData.maxPrice}
                    type="number"
                    placeholder="Max Price"
                    className="px-2 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <PaintBucket className="w-4 h-4" />
                  Color
                </label>
                <select
                  name="color"
                  onChange={handleChange}
                  value={filterData.color}
                  className="px-2 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="All">All</option>
                  {colors?.sort().map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <select
                  name="location"
                  onChange={handleChange}
                  value={filterData.location}
                  className="px-2 py-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="All">All</option>
                  {locations?.sort().map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setFilterData({
                    year: "All",
                    location: "All",
                    color: "All",
                    minPrice: "",
                    maxPrice: "",
                  });
                  setIsOpen(!isOpen);
                }}
                className="h-10 mt-auto px-4 text-sm text-blue-600 hover:bg-blue-50 rounded-md border border-blue-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
