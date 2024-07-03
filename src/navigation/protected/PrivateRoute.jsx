import React from "react";
import { Navigate } from "react-router";
const PrivateRoute = ({ children }) => {
  let token = localStorage.getItem("token");
  console.log("Token:", token);
  return <div>{token ? children : <Navigate to="/" />}</div>;
};
export default PrivateRoute;
