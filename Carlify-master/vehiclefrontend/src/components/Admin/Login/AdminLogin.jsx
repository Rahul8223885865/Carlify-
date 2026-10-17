import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContextProvider";
import { RefreshCw, Eye, EyeOff } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();
  const { ApiEndPoint } = useContext(UserContext);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const [formData, setFormData] = useState({
    email: localStorage.getItem("adminEmail") || "", // Auto-fill stored email
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = validateForm();
    if (isValid) {
      setIsLoading(true);
      try {
        let response = await axios.post(`${ApiEndPoint}/admin/signin`, formData);
        if (response?.data?.status) {
          setIsLoading(false);
          toast.success(response.data.message);
          
          // Store login info
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("admin", JSON.stringify(response.data.admin));
          localStorage.setItem("adminEmail", formData.email); // Store email for auto-login

          navigate("/admin/dashboard");
        } else {
          setIsLoading(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Please enter an email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      errors.password = "Please enter a password";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
          alt="Luxury car background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      {/* Login Box */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-red-500">Admin Login</h2>
        
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {formError.email && <small className="text-red-500">{formError.email}</small>}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="flex items-center border rounded-md">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 focus:outline-none"
              />
              <button
                type="button"
                className="p-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formError.password && <small className="text-red-500">{formError.password}</small>}
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
