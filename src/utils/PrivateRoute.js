import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = JSON.parse(localStorage.getItem("login")) || {};
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
