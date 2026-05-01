import React from "react";
import { useNavigate } from "react-router-dom";

const TYPE_COLORS = {
  Femme: { bg: "rgba(232,180,160,0.12)", color: "#E8B4A0", border: "rgba(232,180,160,0.25)" },
  Homme: { bg: "rgba(100,160,220,0.12)", color: "#6AA0DC", border: "rgba(100,160,220,0.25)" },
  Spa:   { bg: "rgba(130,200,170,0.12)", color: "#82C8AA", border: "rgba(130,200,170,0.25)" },
};

export default function SalonCard({ salon }) {
  const navigate = useNavigate();
  const tc = TYPE_COLORS[salon.type] || TYPE_COLORS.Femme;

  return (
    <div
      onClick={() => navigate(`/salon/${salon.id}`)}
      style={{
        background: "#1A1917",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
        width: "300px",
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img
          src={salon.image}
          alt={salon.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { e.target.style.background = "#252320"; e.target.src = ""; }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(26,25,23,0.8) 0%, transparent 60%)"
        }} />
        {/* Type badge */}
        <span style={{
          position: "absolute", top: "12px", left: "12px",
          background: tc.bg, color: tc.color,
          border: `1px solid ${tc.border}`,
          borderRadius: "20px", padding: "4px 12px",
          fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}>
          {salon.type}
        </span>
        {/* Rating */}
        <span style={{
          position: "absolute", top: "12px", right: "12px",
          background: "rgba(201,169,110,0.9)", color: "#0F0E0E",
          borderRadius: "20px", padding: "4px 10px",
          fontSize: "12px", fontWeight: "700",
        }}>
          ★ {salon.rating}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px 20px" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "18px", fontWeight: "600",
          color: "#F5F0E8", marginBottom: "6px",
        }}>
          {salon.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
          <span style={{ color: "#C9A96E", fontSize: "13px" }}>📍</span>
          <span style={{ color: "#9B9589", fontSize: "13px" }}>{salon.city}</span>
          <span style={{ color: "#9B9589", fontSize: "13px", marginLeft: "auto" }}>
            {salon.reviews} avis
          </span>
        </div>
        <div style={{
          background: "rgba(201,169,110,0.08)",
          border: "1px solid rgba(201,169,110,0.15)",
          borderRadius: "10px",
          padding: "10px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ color: "#9B9589", fontSize: "12px" }}>
            {salon.services.length} services
          </span>
          <span style={{ color: "#C9A96E", fontSize: "13px", fontWeight: "600" }}>
            Voir détails →
          </span>
        </div>
      </div>
    </div>
  );
}