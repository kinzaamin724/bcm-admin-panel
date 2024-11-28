import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("_id");

    // Simulate token validation if needed (e.g., verify with API)
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return null; // Show a loading spinner or nothing while checking
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
