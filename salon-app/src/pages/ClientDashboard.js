import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Fake bookings for demo
const FAKE_BOOKINGS = [
  { id: 1, salon: "Salon Najat", service: "Brushing", date: "2025-08-10", time: "10:00", price: 60, status: "confirmed" },
  { id: 2, salon: "Spa Luxury", service: "Hammam marocain", date: "2025-08-15", time: "14:00", price: 150, status: "pending" },
  { id: 3, salon: "Barber King", service: "Coupe homme", date: "2025-07-20", time: "09:00", price: 50, status: "done" },
];

const STATUS = {
  confirmed: { label: "Confirmé", bg: "rgba(100,180,140,0.12)", color: "#64B48C", border: "rgba(100,180,140,0.25)" },
  pending:   { label: "En attente", bg: "rgba(201,169,110,0.12)", color: "#C9A96E", border: "rgba(201,169,110,0.25)" },
  done:      { label: "Terminé", bg: "rgba(100,100,100,0.12)", color: "#888", border: "rgba(100,100,100,0.2)" },
  cancelled: { label: "Annulé", bg: "rgba(220,90,90,0.1)", color: "#DC5A5A", border: "rgba(220,90,90,0.2)" },
};

export default function ClientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(FAKE_BOOKINGS);

  const cancel = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "cancelled" } : b));
  };

  const total = bookings.filter(b => b.status !== "cancelled").length;
  const spent = bookings.filter(b => b.status === "done").reduce((sum, b) => sum + b.price, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0E", padding: "40px" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#F5F0E8" }}>
          Bonjour, {user?.name} 👋
        </h1>
        <p style={{ color: "#9B9589", marginTop: "6px" }}>Gérez vos réservations et historique</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "40px", flexWrap: "wrap" }}>
        {[
          { label: "Réservations totales", value: total, icon: "📅" },
          { label: "Dépenses totales", value: `${spent} MAD`, icon: "💰" },
          { label: "Salons visités", value: new Set(bookings.filter(b=>b.status==="done").map(b=>b.salon)).size, icon: "✂️" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#1A1917",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "24px 28px",
            flex: 1, minWidth: "180px",
          }}>
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#C9A96E", fontWeight: "600" }}>
              {s.value}
            </div>
            <div style={{ color: "#9B9589", fontSize: "13px", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bookings list */}
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#F5F0E8", marginBottom: "20px" }}>
        Mes réservations
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {bookings.map(b => {
          const st = STATUS[b.status];
          return (
            <div key={b.id} style={{
              background: "#1A1917",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#F5F0E8", fontWeight: "600", fontSize: "16px", marginBottom: "4px" }}>
                  {b.salon}
                </div>
                <div style={{ color: "#9B9589", fontSize: "13px" }}>
                  {b.service} · {b.date} à {b.time}
                </div>
              </div>
              <div style={{ color: "#C9A96E", fontWeight: "700", fontSize: "16px" }}>{b.price} MAD</div>
              <span style={{
                background: st.bg, color: st.color,
                border: `1px solid ${st.border}`,
                borderRadius: "20px", padding: "5px 14px",
                fontSize: "12px", fontWeight: "600",
              }}>
                {st.label}
              </span>
              {b.status === "confirmed" || b.status === "pending" ? (
                <button onClick={() => cancel(b.id)} style={{
                  background: "transparent",
                  border: "1px solid rgba(220,90,90,0.25)",
                  color: "#DC5A5A", borderRadius: "8px",
                  padding: "8px 14px", fontSize: "12px",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>
                  Annuler
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "32px",
          background: "linear-gradient(135deg, #C9A96E, #A8834A)",
          color: "#0F0E0E",
          border: "none", borderRadius: "12px",
          padding: "14px 28px", fontSize: "15px",
          fontWeight: "700", cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        + Nouvelle réservation
      </button>
    </div>
  );
}