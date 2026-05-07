import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { api } from "../services/api.js";

export default function ProtectedOwnerRoute() {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("juhaara_access");
    if (!token) {
      setAuthorized(false);
      return;
    }

    api.get("/auth/profile/").then((response) => {
      if (response.data.is_staff) {
        setAuthorized(true);
      } else {
        localStorage.removeItem("juhaara_access");
        localStorage.removeItem("juhaara_refresh");
        setAuthorized(false);
      }
    }).catch(() => {
      localStorage.removeItem("juhaara_access");
      localStorage.removeItem("juhaara_refresh");
      setAuthorized(false);
    });
  }, []);

  if (authorized === null) return null;
  return authorized ? <Outlet /> : <Navigate to="/jahaara" replace />;
}

