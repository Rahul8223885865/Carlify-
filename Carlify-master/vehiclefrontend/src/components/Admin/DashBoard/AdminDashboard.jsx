import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Car,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import User from "../Users/User";
import Listings from "../Listings/Listings";
import Setting from "../Settings/Settings";
import DashboardContent from "./DashboardContent";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/admin/signin";
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 transition-transform duration-300 transform ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } w-64`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                Carlify
              </span>
            </div>
            <button
              onClick={closeSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {[
              { name: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
              { name: "Users", icon: Users, key: "users" },
              { name: "Listings", icon: Car, key: "listings" },
              { name: "Settings", icon: Settings, key: "settings" },
            ].map(({ name, icon: Icon, key }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  closeSidebar();
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeTab === key
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{name}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <LogOut className="h-5 w-5" />
              <span onClick={handleLogout} className="font-medium">
                Logout
              </span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-64 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center px-4 lg:px-8 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-lg"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h1>
                </div>
              </div>
            </div>
          </header>

          {/* Content goes here */}
          <div className="p-6">
            {activeTab === "dashboard" && <DashboardContent />}
            {activeTab === "users" && <User />}
            {activeTab === "listings" && <Listings />}
            {activeTab === "settings" && <Setting />}
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
