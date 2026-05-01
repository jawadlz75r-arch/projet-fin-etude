import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// This page is used as a redirect from SalonDetails
// The booking actually happens in SalonDetails then goes to Confirmation
// This page handles any direct /reservation visits
export default function ReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0F0E0E",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "16px",
      }}>
        <div style={{ fontSize: "48px" }}>📅</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8" }}>
          Aucune réservation en cours
        </h2>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#C9A96E", color: "#0F0E0E",
            border: "none", borderRadius: "10px",
            padding: "12px 24px", fontSize: "15px",
            fontWeight: "600", cursor: "pointer",
          }}
        >
          Chercher un salon
        </button>
      </div>
    );
  }

  // Navigate to confirmation
  navigate("/confirmation", { state: data, replace: true });
  return null;
}