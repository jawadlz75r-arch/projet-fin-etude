import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(15,14,14,0.92)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(201,169,110,0.15)",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#C9A96E",
    letterSpacing: "1px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  link: {
    color: "#9B9589",
    fontSize: "14px",
    fontWeight: "500",
    transition: "color 0.2s",
    letterSpacing: "0.5px",
  },
  btn: {
    background: "#C9A96E",
    color: "#0F0E0E",
    border: "none",
    borderRadius: "8px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  userBadge: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  role: {
    fontSize: "11px",
    background: "rgba(201,169,110,0.15)",
    color: "#C9A96E",
    border: "1px solid rgba(201,169,110,0.3)",
    borderRadius: "20px",
    padding: "3px 10px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    const paths = {
      client: "/dashboard/client",
      owner: "/dashboard/owner",
      coiffeur: "/dashboard/coiffeur",
      admin: "/dashboard/admin",
    };
    return paths[user.role] || "/dashboard";
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>✂ SalonBook</Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}
          onMouseEnter={e => e.target.style.color = "#C9A96E"}
          onMouseLeave={e => e.target.style.color = "#9B9589"}>
          Accueil
        </Link>

        {user ? (
          <div style={styles.userBadge}>
            <span style={styles.role}>{user.role}</span>
            <Link to={getDashboardPath()} style={styles.link}
              onMouseEnter={e => e.target.style.color = "#C9A96E"}
              onMouseLeave={e => e.target.style.color = "#9B9589"}>
              {user.name}
            </Link>
            <button style={styles.btn} onClick={handleLogout}
              onMouseEnter={e => e.target.style.opacity = "0.8"}
              onMouseLeave={e => e.target.style.opacity = "1"}>
              Déconnexion
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "12px" }}>
            <Link to="/login" style={styles.link}
              onMouseEnter={e => e.target.style.color = "#C9A96E"}
              onMouseLeave={e => e.target.style.color = "#9B9589"}>
              Connexion
            </Link>
            <button style={styles.btn} onClick={() => navigate("/register")}
              onMouseEnter={e => e.target.style.opacity = "0.8"}
              onMouseLeave={e => e.target.style.opacity = "1"}>
              S'inscrire
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}