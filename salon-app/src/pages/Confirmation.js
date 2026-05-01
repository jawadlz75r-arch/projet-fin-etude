import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0F0E0E",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#9B9589", marginBottom: "16px" }}>Aucune réservation trouvée</p>
          <button onClick={() => navigate("/")} style={{
            background: "#C9A96E", color: "#0F0E0E", border: "none",
            borderRadius: "10px", padding: "12px 24px", cursor: "pointer", fontWeight: "600",
          }}>Retour à l'accueil</button>
        </div>
      </div>
    );
  }

  const { salon, service, date, time, clientName } = data;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0F0E0E",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>
      <div style={{
        background: "#1A1917",
        border: "1px solid rgba(201,169,110,0.2)",
        borderRadius: "28px",
        padding: "56px 48px",
        maxWidth: "500px",
        width: "100%",
        textAlign: "center",
        animation: "fadeUp 0.5s ease forwards",
      }}>
        {/* Success checkmark */}
        <div style={{
          width: "80px", height: "80px",
          background: "rgba(130,200,160,0.12)",
          border: "2px solid rgba(130,200,160,0.3)",
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "36px", margin: "0 auto 28px",
        }}>
          ✓
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "30px", color: "#F5F0E8", marginBottom: "10px",
        }}>
          Réservation confirmée !
        </h1>
        <p style={{ color: "#9B9589", marginBottom: "36px", fontSize: "15px" }}>
          Votre rendez-vous a été enregistré avec succès.
        </p>

        {/* Booking summary */}
        <div style={{
          background: "#252320",
          borderRadius: "18px",
          padding: "28px",
          textAlign: "left",
          marginBottom: "32px",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px", color: "#C9A96E",
            }}>
              {salon?.name}
            </span>
            <span style={{
              background: "rgba(130,200,160,0.12)",
              color: "#82C8A0",
              border: "1px solid rgba(130,200,160,0.25)",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "12px", fontWeight: "600",
            }}>
              Confirmé
            </span>
          </div>

          {[
            { label: "👤 Client", value: clientName },
            { label: "💈 Service", value: `${service?.name} · ${service?.price} MAD` },
            { label: "📅 Date", value: date },
            { label: "⏰ Heure", value: time },
            { label: "⏱ Durée", value: `${service?.duration} min` },
            { label: "📍 Lieu", value: salon?.city },
          ].map(row => (
            <div key={row.label} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}>
              <span style={{ color: "#9B9589", fontSize: "13px" }}>{row.label}</span>
              <span style={{ color: "#F5F0E8", fontSize: "14px", fontWeight: "500" }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              flex: 1,
              background: "transparent",
              border: "1px solid rgba(201,169,110,0.25)",
              color: "#C9A96E",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Retour à l'accueil
          </button>
          <button
            onClick={() => navigate("/dashboard/client")}
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #C9A96E, #A8834A)",
              border: "none",
              color: "#0F0E0E",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Mes réservations
          </button>
        </div>
      </div>
    </div>
  );
}