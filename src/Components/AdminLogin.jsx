import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { AdminLogin } = useContext(AppContext); // use your backend-specific function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields!", { position: "top-center", autoClose: 3000, transition: Zoom });
      return;
    }

    setLoading(true);
    try {
      const response = await AdminLogin(email, password);

      if (response.success) {
        toast.success("Login Successful!", { position: "top-center", autoClose: 2000, transition: Zoom });
        navigate("/AdminDashboard"); // Redirect after login
      } else {
        toast.error(response.message || "Login failed", { position: "top-center", autoClose: 3000, transition: Zoom });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server error. Try again later.", { position: "top-center", autoClose: 3000, transition: Zoom });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border-2 border-black transition-shadow duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black"><FaEnvelope /></span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:ring-blue-400 hover:shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black"><FaLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 hover:ring-blue-400 hover:shadow-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
