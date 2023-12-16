import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function ProtectRoute({ render }) {
  const prevRoute = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("matrice_user_cred") !== null
  );

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("matrice_user_cred") !== null);
  }, [render]);

  if (!isAuthenticated) {
    toast.error("Please login before any actions");
    return <Navigate to="/login" replace={true} state={{ prevRoute }} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
}
