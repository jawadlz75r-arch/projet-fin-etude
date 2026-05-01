import React, { useState } from "react";
import salons from "../data/salons";

const FAKE_USERS = [
  { id: 1, name: "Youssef A.", email: "youssef@test.com", role: "client", bookings: 3 },
  { id: 2, name: "Fatima B.", email: "fatima@test.com", role: "owner", bookings: 0 },
  { id: 3, name: "Hassan K.", email: "hassan@test.com", role: "coiffeur", bookings: 0 },
  { id: 4, name: "Sara M.", email: "sara@test.com", role: "client", bookings: 1 },
  { id: 5, name: "Omar Z.", email: "omar@test.com", role: "client", bookings: 2 },
];

const ROLE_COLORS = {
  client:   { bg: "rgba(100,160,220,0.12)", color: "#6AA0DC", border: "rgba(100,160,220,0.25)" },
  owner:    { bg: "rgba(201,169,110,0.12)", color: "#C9A96E", border: "rgba(201,169,110,0.25)" },
  coiffeur: { bg: "rgba(130,200,160,0.12)", color: "#82C8A0", border: "rgba(130,200,160,0.25)" },
  admin:    { bg: "rgba(220,90,90,0.1)",    color: "#DC5A5A", border: "rgba(220,90,90,0.25)" },
};

export default function AdminDashboard() {
  const [salonList, setSalonList] = useState(salons);
  const [tab, setTab] = useState("overview");

  const deleteSalon = (id) => {
    if (window.confirm("Supprimer ce salon ?")) {
      setSalonList(prev => prev.filter(s => s.id !== id));
    }
  };

  const totalBookings = 28;
  const totalRevenue = 4850;

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0E", padding: "40px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#F5F0E8" }}>
          Administration
        </h1>
        <p style={{ color: "#9B9589", marginTop: "6px" }}>Vue globale de la plateforme SalonBook</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "40px", flexWrap: "wrap" }}>
        {[
          { label: "Salons", value: salonList.length, icon: "✂️" },
          { label: "Utilisateurs", value: FAKE_USERS.length, icon: "👥" },
          { label: "Réservations", value: totalBookings, icon: "📅" },
          { label: "Chiffre total", value: `${totalRevenue} MAD`, icon: "💰" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#1A1917", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "24px 28px", flex: 1, minWidth: "140px",
          }}>
            <div style={{ fontSize: "22px", marginBottom: "10px" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#C9A96E", fontWeight: "600" }}>{s.value}</div>
            <div style={{ color: "#9B9589", fontSize: "13px", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "28px" }}>
        {[
          { id: "overview", label: "Aperçu" },
          { id: "salons", label: "Salons" },
          { id: "users", label: "Utilisateurs" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? "#C9A96E" : "rgba(255,255,255,0.05)",
            color: tab === t.id ? "#0F0E0E" : "#9B9589",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px", padding: "10px 20px",
            fontSize: "14px", fontWeight: tab === t.id ? "600" : "400",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Salons Tab */}
      {tab === "salons" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {salonList.map(salon => (
            <div key={salon.id} style={{
              background: "#1A1917", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "14px", padding: "18px 24px",
              display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
            }}>
              <img src={salon.image} alt="" style={{
                width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover",
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ color: "#F5F0E8", fontWeight: "600" }}>{salon.name}</div>
                <div style={{ color: "#9B9589", fontSize: "13px" }}>{salon.city} · {salon.type}</div>
              </div>
              <span style={{ color: "#C9A96E", fontSize: "13px" }}>★ {salon.rating}</span>
              <span style={{ color: "#9B9589", fontSize: "13px" }}>{salon.services.length} services</span>
              <button onClick={() => deleteSalon(salon.id)} style={{
                background: "rgba(220,90,90,0.1)", border: "1px solid rgba(220,90,90,0.25)",
                color: "#DC5A5A", borderRadius: "8px", padding: "8px 14px",
                fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}>
                🗑 Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {tab === "users" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAKE_USERS.map(u => {
            const rc = ROLE_COLORS[u.role] || ROLE_COLORS.client;
            return (
              <div key={u.id} style={{
                background: "#1A1917", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px", padding: "18px 24px",
                display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
              }}>
                <div style={{
                  width: "40px", height: "40px",
                  background: "rgba(201,169,110,0.12)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "#C9A96E", fontWeight: "700", fontSize: "15px",
                }}>
                  {u.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#F5F0E8", fontWeight: "600" }}>{u.name}</div>
                  <div style={{ color: "#9B9589", fontSize: "13px" }}>{u.email}</div>
                </div>
                <span style={{
                  background: rc.bg, color: rc.color, border: `1px solid ${rc.border}`,
                  borderRadius: "20px", padding: "4px 12px",
                  fontSize: "12px", fontWeight: "600", textTransform: "capitalize",
                }}>
                  {u.role}
                </span>
                <span style={{ color: "#9B9589", fontSize: "13px" }}>{u.bookings} réservations</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Overview Tab */}
      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <div style={{
            background: "#1A1917", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "24px",
          }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", marginBottom: "16px" }}>
              Salons par ville
            </h3>
            {["Fes","Rabat","Casablanca","Marrakech","Tanger"].map(city => {
              const count = salonList.filter(s => s.city === city).length;
              return (
                <div key={city} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#9B9589", fontSize: "13px" }}>{city}</span>
                    <span style={{ color: "#C9A96E", fontSize: "13px" }}>{count}</span>
                  </div>
                  <div style={{ background: "#252320", borderRadius: "4px", height: "4px" }}>
                    <div style={{
                      background: "#C9A96E", height: "4px", borderRadius: "4px",
                      width: `${(count / salonList.length) * 100}%`,
                      transition: "width 0.5s",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            background: "#1A1917", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "24px",
          }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#F5F0E8", marginBottom: "16px" }}>
              Utilisateurs par rôle
            </h3>
            {["client","owner","coiffeur"].map(role => {
              const count = FAKE_USERS.filter(u => u.role === role).length;
              const rc = ROLE_COLORS[role];
              return (
                <div key={role} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <span style={{ color: "#9B9589", fontSize: "13px", textTransform: "capitalize" }}>{role}</span>
                  <span style={{
                    background: rc.bg, color: rc.color, border: `1px solid ${rc.border}`,
                    borderRadius: "20px", padding: "3px 12px", fontSize: "12px", fontWeight: "600",
                  }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}