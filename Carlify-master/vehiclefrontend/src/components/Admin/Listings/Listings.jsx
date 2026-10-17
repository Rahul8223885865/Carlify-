import { Car, Edit, Eye, Trash2, Star } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContextProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Listings() {
  let {
    currentPageCar,
    setCurrentPageCar,
    totalPageCar,
    cars,
    setCars,
    ApiEndPoint,
  } = useContext(AdminContext);
  let navigate = useNavigate();
  const [loadingFeatured, setLoadingFeatured] = useState({});

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPageCar(pageNumber);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
      notation: "compact",
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  // Toggle Featured Status
  const toggleFeatured = async (id, isFeatured) => {
    setLoadingFeatured((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await axios.post(
        `${ApiEndPoint}/admin/toggle-featured/${id}`,
        {
          featured: !isFeatured,
        }
      );
      if (response?.data?.status) {
        toast.success(response.data.message);

        // Update state
        setCars((prevCars) =>
          prevCars.map((car) =>
            car._id === id ? { ...car, Featured: !isFeatured } : car
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Called..");
      toast.error("Error updating featured status");
    }

    setLoadingFeatured((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Listings Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Vehicle",
                "Details",
                "Price",
                "Date Posted",
                "Views",
                "Featured",
                "Actions",
              ].map((item) => (
                <th
                  key={item}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {[...cars]?.reverse().map((listing) => (
              <tr key={listing._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {listing.brand} {listing.model}
                      </div>
                      <div className="text-sm text-gray-500">
                        {listing.sellerName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {listing.year} • {listing.fuelType}
                  </div>
                  <div className="text-sm text-gray-500">
                    {listing.location}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(listing.price)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-50 text-green-600">
                    {listing.createdAt.split("T")[0]}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {listing.views} views
                </td>

                {/* Featured Car Toggle */}
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    className={`p-2 rounded-full ${
                      listing.Featured
                        ? "bg-green-400 text-white"
                        : "bg-gray-300"
                    }`}
                    onClick={() =>
                      toggleFeatured(listing._id, listing.Featured)
                    }
                    disabled={loadingFeatured[listing._id]}
                  >
                    {loadingFeatured[listing._id] ? (
                      "..."
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => navigate(`/cardetails/${listing._id}`)}
                    className="text-purple-600 hover:text-purple-900 mr-3"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-6 border-t border-gray-200">
        <button
          onClick={() => paginate(currentPageCar - 1)}
          disabled={currentPageCar === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Previous
        </button>
        <span>
          {currentPageCar} of {totalPageCar}
        </span>
        <button
          onClick={() => paginate(currentPageCar + 1)}
          disabled={currentPageCar === totalPageCar}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Listings;
