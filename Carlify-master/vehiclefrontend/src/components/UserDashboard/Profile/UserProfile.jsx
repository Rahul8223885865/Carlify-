import { useContext, useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import UserNavbar from "../../UserDashboard/UserNavBar";
import axios from "axios";
import { UserContext } from "../../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  let User = sessionStorage.getItem("user");
  User = JSON.parse(User);

  const { ApiEndPoint } = useContext(UserContext);
  let navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "vehicles", label: "Vehicles" },
    { id: "favorites", label: "Favorites" },
    { id: "settings", label: "Settings" },
    { id: "notifications", label: "Notifications" },
  ];

  const [vehicles, setVehicles] = useState([]);

  const fatchUserData = async () => {
    let token = sessionStorage.getItem("token");
    try {
      let response = await axios.get(
        `${ApiEndPoint}/users/users-profile-data/${User._id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.status) {
        setVehicles(response.data.vehicles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchUserData();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                  RM
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {User.name}
                  </h1>
                  <p className="text-gray-600">India</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm flex items-center gap-1 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {User.email}
                    </span>
                    <span className="text-sm flex items-center gap-1 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +91 {User.mobile}
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Cariffy
                </h2>
                <p className="text-gray-600 mb-6">
                  Your trusted destination for premium vehicles. Discover your
                  dream car with us.
                </p>

                <h3 className="font-semibold text-gray-700 mb-3">
                  Quick Links
                </h3>
                <ul className="space-y-2 mb-6">
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Featured Cars
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Sell Your Car
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Car Reviews
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      News & Updates
                    </a>
                  </li>
                </ul>

                <h3 className="font-semibold text-gray-700 mb-3">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">

                  {/* Personal Info Tab */}
                  {activeTab === "personal" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            {User.name}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            {User.email}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            +91 {User.mobile}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                            India
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Vehicles Tab */}
                  {activeTab === "vehicles" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Your Vehicles
                      </h2>

                      {vehicles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {vehicles.slice(0, 3).map((car) => (
                            <div
                              key={car._id}
                              onClick={() => navigate(`/cardetails/${car._id}`)}
                              className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                            >
                              <img
                                src={car.image}
                                alt={`${car.brand} ${car.model}`}
                                className="w-full h-40 object-cover rounded-md"
                              />
                              <h3 className="mt-2 text-lg font-semibold text-gray-900 truncate">
                                {car.brand} {car.model}
                              </h3>

                              <p className="text-sm text-gray-600">
                                {car.year} • ₹{car.price}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                            />
                          </svg>
                          <h3 className="mt-4 text-lg font-medium text-gray-900">
                            No vehicles listed
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Get started by selling your car with us.
                          </p>
                          <div className="mt-6">
                            <button className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                              Sell Your Car
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Favorites Tab */}
                  {activeTab === "favorites" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Favorite Vehicles
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                          No favorites yet
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Start browsing our collection to add your favorite
                          vehicles.
                        </p>
                        <div className="mt-6">
                          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Browse Cars
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === "settings" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Account Settings
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Change Password
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                htmlFor="current-password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Current Password
                              </label>
                              <input
                                type="password"
                                id="current-password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="new-password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                New Password
                              </label>
                              <input
                                type="password"
                                id="new-password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-200">
                              Update Password
                            </button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Notification Preferences
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="email-notifications"
                                  name="email-notifications"
                                  type="checkbox"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                  defaultChecked
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="email-notifications"
                                  className="font-medium text-gray-700"
                                >
                                  Email notifications
                                </label>
                                <p className="text-gray-500">
                                  Receive updates and offers via email
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="sms-notifications"
                                  name="sms-notifications"
                                  type="checkbox"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="sms-notifications"
                                  className="font-medium text-gray-700"
                                >
                                  SMS notifications
                                </label>
                                <p className="text-gray-500">
                                  Receive important alerts via text message
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-200">
                              Save Preferences
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === "notifications" && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-6">
                        Notifications
                      </h2>
                      <div className="bg-gray-50 rounded-lg p-8 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                          No new notifications
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          You're all caught up!
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
