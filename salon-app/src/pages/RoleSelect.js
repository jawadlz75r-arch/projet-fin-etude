import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLES = [
  {
    id: "client",
    label: "Client",
    icon: "👤",
    desc: "Je cherche et réserve des salons",
    path: "/dashboard/client",
  },
  {
    id: "owner",
    label: "Propriétaire",
    icon: "💈",
    desc: "Je gère mon salon et mes réservations",
    path: "/dashboard/owner",
  },
  {
    id: "coiffeur",
    label: "Coiffeur",
    icon: "✂️",
    desc: "Je travaille dans un salon",
    path: "/dashboard/coiffeur",
  },
];

export default function RoleSelect() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const selectRole = (role) => {
    login({ ...user, role: role.id });
    navigate(role.path);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F0E0E",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "560px", animation: "fadeUp 0.4s ease forwards" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px", color: "#F5F0E8", marginBottom: "12px",
          }}>
            Bienvenue{user?.name ? `, ${user.name}` : ""} !
          </h1>
          <p style={{ color: "#9B9589", fontSize: "15px" }}>
            Quel est votre rôle sur SalonBook ?
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {ROLES.map(role => (
            <div
              key={role.id}
              onClick={() => selectRole(role)}
              style={{
                background: "#1A1917",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                e.currentTarget.style.background = "rgba(201,169,110,0.05)";
                e.currentTarget.style.transform = "translateX(6px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.background = "#1A1917";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span style={{ fontSize: "36px" }}>{role.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#F5F0E8", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>
                  {role.label}
                </div>
                <div style={{ color: "#9B9589", fontSize: "14px" }}>{role.desc}</div>
              </div>
              <span style={{ color: "#C9A96E", fontSize: "20px" }}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}