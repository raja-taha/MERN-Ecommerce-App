import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  if (role === "admin") {
    return <Outlet />;
  } else {
    return navigate("/");
  }
};

export default AdminRoutes;
