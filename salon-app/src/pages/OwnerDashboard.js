import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const FAKE_BOOKINGS = [
  { id: 1, client: "Youssef A.", service: "Coupe femme", date: "2025-08-10", time: "10:00", price: 80, status: "confirmed" },
  { id: 2, client: "Khadija M.", service: "Brushing", date: "2025-08-10", time: "11:00", price: 60, status: "confirmed" },
  { id: 3, client: "Sara L.", service: "Coloration", date: "2025-08-11", time: "14:00", price: 200, status: "pending" },
  { id: 4, client: "Nadia R.", service: "Manucure", date: "2025-08-08", time: "09:00", price: 70, status: "done" },
  { id: 5, client: "Hind Z.", service: "Soin kératine", date: "2025-08-07", time: "15:00", price: 350, status: "done" },
];

const STATUS = {
  confirmed: { label: "Confirmé", color: "#64B48C", bg: "rgba(100,180,140,0.12)", border: "rgba(100,180,140,0.25)" },
  pending:   { label: "En attente", color: "#C9A96E", bg: "rgba(201,169,110,0.12)", border: "rgba(201,169,110,0.25)" },
  done:      { label: "Terminé", color: "#888", bg: "rgba(100,100,100,0.1)", border: "rgba(100,100,100,0.2)" },
  cancelled: { label: "Annulé", color: "#DC5A5A", bg: "rgba(220,90,90,0.1)", border: "rgba(220,90,90,0.2)" },
};

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState(FAKE_BOOKINGS);
  const [filter, setFilter] = useState("all");

  const confirm = (id) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "confirmed" } : b));
  const cancel  = (id) => setBookings(p => p.map(b => b.id === id ? { ...b, status: "cancelled" } : b));

  const revenue = bookings.filter(b => b.status === "done").reduce((s, b) => s + b.price, 0);
  const displayed = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0E", padding: "40px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#F5F0E8" }}>
          Dashboard Propriétaire
        </h1>
        <p style={{ color: "#9B9589", marginTop: "6px" }}>Salon Najat · {user?.name}</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "40px", flexWrap: "wrap" }}>
        {[
          { label: "Total réservations", value: bookings.length, icon: "📅" },
          { label: "Chiffre d'affaires", value: `${revenue} MAD`, icon: "💰" },
          { label: "En attente", value: bookings.filter(b=>b.status==="pending").length, icon: "⏳" },
          { label: "Clients", value: new Set(bookings.map(b=>b.client)).size, icon: "👥" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#1A1917",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "24px 28px",
            flex: 1, minWidth: "160px",
          }}>
            <div style={{ fontSize: "22px", marginBottom: "10px" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#C9A96E", fontWeight: "600" }}>
              {s.value}
            </div>
            <div style={{ color: "#9B9589", fontSize: "13px", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8", flex: "100%", marginBottom: "8px" }}>
          Réservations
        </h2>
        {["all","confirmed","pending","done","cancelled"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: filter === f ? "#C9A96E" : "rgba(255,255,255,0.05)",
            color: filter === f ? "#0F0E0E" : "#9B9589",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px", padding: "6px 16px",
            fontSize: "13px", fontWeight: filter === f ? "600" : "400",
            cursor: "pointer", textTransform: "capitalize",
          }}>
            {f === "all" ? "Tous" : STATUS[f]?.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {displayed.map(b => {
          const st = STATUS[b.status];
          return (
            <div key={b.id} style={{
              background: "#1A1917",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              padding: "18px 24px",
              display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#F5F0E8", fontWeight: "600", marginBottom: "3px" }}>{b.client}</div>
                <div style={{ color: "#9B9589", fontSize: "13px" }}>{b.service} · {b.date} à {b.time}</div>
              </div>
              <div style={{ color: "#C9A96E", fontWeight: "700" }}>{b.price} MAD</div>
              <span style={{
                background: st.bg, color: st.color, border: `1px solid ${st.border}`,
                borderRadius: "20px", padding: "4px 12px", fontSize: "12px", fontWeight: "600",
              }}>
                {st.label}
              </span>
              {b.status === "pending" && (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => confirm(b.id)} style={{
                    background: "rgba(100,180,140,0.15)", border: "1px solid rgba(100,180,140,0.3)",
                    color: "#64B48C", borderRadius: "8px", padding: "7px 14px",
                    fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}>✓ Confirmer</button>
                  <button onClick={() => cancel(b.id)} style={{
                    background: "transparent", border: "1px solid rgba(220,90,90,0.25)",
                    color: "#DC5A5A", borderRadius: "8px", padding: "7px 14px",
                    fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  }}>✕ Refuser</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}