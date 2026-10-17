import React, { useContext } from "react";
import { Car, TrendingUp, UserCheck } from "lucide-react";
import { AdminContext } from "../../Context/AdminContextProvider";
import DashboardContentLoader from "./Loader/DashboardContentLoader";

function DashboardContent() {
  let { data, isLoading } = useContext(AdminContext);
  let {
    totalUsers,
    totallistings,
    recentListings,
    recentUsers,
    verifiedUsers,
  } = data;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
      notation: "compact",
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <>
      {isLoading ? (
        <DashboardContentLoader />
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  +12% ↑
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {totallistings}
              </h3>
              <p className="text-gray-600">Total Listings</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                  +5% ↑
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {totallistings}
              </h3>
              <p className="text-gray-600">Active Listings</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                  +18% ↑
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {totalUsers}
              </h3>
              <p className="text-gray-600">Total Users</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  +8% ↑
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {verifiedUsers}
              </h3>
              <p className="text-gray-600">Total Verified Users</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Listings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Listings
                </h2>
              </div>
              <div className="space-y-4 overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {[...recentListings]?.map((listing) => (
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
                          <div className="text-sm  px-2.5 py-0.5 rounded-full bg-green-50 text-green-600">
                            {formatPrice(listing.price)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Users
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {recentUsers?.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.mobile}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-sm capitalize font-medium ${
                              user.isVerified === true
                                ? "bg-green-50 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {user.isVerified ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardContent;
