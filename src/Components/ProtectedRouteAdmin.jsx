import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../Context/AppContext";

const ProtectedRouteAdmin = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Navigate to="/AdminLogin" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;
