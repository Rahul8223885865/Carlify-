import {
  Filter,
  Fuel,
  Gauge,
  GitFork,
  IndianRupee,
  Search,
  SortDesc,
} from "lucide-react";
import React, { useContext, useState } from "react";
import NavBar from "../Navbar/Navbar";
import { CarContext } from "../Context/CarContextProvider";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  let navigate = useNavigate();

  let { carList } = useContext(CarContext);
  // Sample car data

  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    transmission: "",
    fuelType: "",
  });
  const [sortOption, setSortOption] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort cars
  const filteredCars = carList
    ?.filter((car) => {
      const matchesSearch = `${car.brand} ${car.model} ${car.year}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesbrand = !filters.brand || car.brand === filters.brand;
      const matchesPrice =
        (!filters.minPrice || car.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || car.price <= parseInt(filters.maxPrice));
      const matchesYear =
        (!filters.minYear || car.year >= parseInt(filters.minYear)) &&
        (!filters.maxYear || car.year <= parseInt(filters.maxYear));
      const matchesTransmission =
        !filters.transmission || car.transmission === filters.transmission;
      const matchesFuelType =
        !filters.fuelType || car.fuelType === filters.fuelType;

      return (
        matchesSearch &&
        matchesbrand &&
        matchesPrice &&
        matchesYear &&
        matchesTransmission &&
        matchesFuelType
      );
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "year-new":
          return b.year - a.year;
        case "kilometer-low":
          return a.kilometer - b.kilometer;
        case "Featured":
          return b.Featured - a.Featured;
        default:
          return 0;
      }
    });

  // Get unique brands for filter dropdown
  const uniquebrands = [...new Set(carList?.map((car) => car.brand))];

  return (
    <>
      <NavBar />
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="inline bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Inventory
              </span>
            </h1>
            <p className="mt-3 text-xl text-gray-500">
              Browse our selection of quality used vehicles
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by brand or model"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter and Sort Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="mr-2" />
                  Filters
                </button>
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="Featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="year-new">Year: Newest First</option>
                    <option value="kilometer-low">
                      Kilometer: Low to High
                    </option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SortDesc className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    brand
                  </label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.brand}
                    onChange={(e) =>
                      setFilters({ ...filters, brand: e.target.value })
                    }
                  >
                    <option value="">All brands</option>
                    {uniquebrands?.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filters.minYear}
                      onChange={(e) =>
                        setFilters({ ...filters, minYear: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filters.maxYear}
                      onChange={(e) =>
                        setFilters({ ...filters, maxYear: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transmission
                  </label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.transmission}
                    onChange={(e) =>
                      setFilters({ ...filters, transmission: e.target.value })
                    }
                  >
                    <option value="">Any Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fuel Type
                  </label>
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={filters.fuelType}
                    onChange={(e) =>
                      setFilters({ ...filters, fuelType: e.target.value })
                    }
                  >
                    <option value="">Any Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filteredCars.length}</span>{" "}
              {filteredCars.length === 1 ? "vehicle" : "vehicles"}
            </p>
          </div>

          {/* Car Listings */}
          {filteredCars?.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCars?.map((car) => (
                <div
                  key={car.id}
                  className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {car.Featured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-bold rounded">
                      Featured
                    </div>
                  )}
                  <div className="h-56 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 truncate">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-gray-500">{car.year}</p>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="text-xl font-semibold text-green-600">
                          {car.price}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Gauge className="mr-1 text-gray-400" />
                        <span>{car.kilometer.toLocaleString()} KMs</span>
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-5 w-5 text-gray-500" />
                        <span>{car.transmission}</span>
                      </div>
                      <div className="flex ">
                        <Fuel className="h-4 w-5 text-gray-500" />
                        <span>{car.fuelType}</span>
                      </div>
                      <div className="flex">
                        <Fuel className="h-4 w-5 text-gray-500" />
                        <span>{car.color}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/cardetails/${car._id}`)}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No vehicles match your search
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search term
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    brand: "",
                    minPrice: "",
                    maxPrice: "",
                    minYear: "",
                    maxYear: "",
                    transmission: "",
                    fuelType: "",
                  });
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination (would be implemented with real API) */}
          {filteredCars.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-4">
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 rounded bg-blue-600 text-white">
                  1
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Inventory;
