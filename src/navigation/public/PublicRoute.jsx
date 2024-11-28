import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("_id");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return null; // Show a loading spinner or nothing while checking
  }

  return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
