import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/"); // Redirect to home page if not an admin
    }
  }, [role, navigate]); // Dependency array to avoid unnecessary re-renders

  if (role === "admin") {
    return <Outlet />; // Render child routes if the user is an admin
  }

  // Optionally, you can return null or some loading indicator while redirecting
  return null;
};

export default AdminRoutes;
