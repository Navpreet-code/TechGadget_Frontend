// LogoutButton.jsx
import React, { useContext } from "react";
import AppContext from "../../Context/AppContext"; // adjust path
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Login"); // redirect to login page
  };

  if (!isAuthenticated) return null; // hide button if not logged in

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-full shadow hover:bg-red-600 transition-all"
    >
      Logout
    </button>
  );
};

export default Logout;
