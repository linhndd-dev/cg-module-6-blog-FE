import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
    const { isLoggedIn, user } = useSelector((state) => state.auth);
  return isLoggedIn && user.username === 'admin' ? children : <Navigate to="/login" />;
};
export default AdminRoute;
