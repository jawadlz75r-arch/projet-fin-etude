import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) { navigate("/login"); return; }
    const paths = {
      client: "/dashboard/client",
      owner: "/dashboard/owner",
      coiffeur: "/dashboard/coiffeur",
      admin: "/dashboard/admin",
    };
    navigate(paths[user.role] || "/", { replace: true });
  }, [user, navigate]);

  return null;
}