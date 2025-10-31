import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../Context/AppContext";


const ProtectedRouteUser = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  const token = localStorage.getItem("token");

  if (!isAuthenticated || !token) {
    return <Navigate to="/Login" replace />;
  }

  return children;
};

export default ProtectedRouteUser;
