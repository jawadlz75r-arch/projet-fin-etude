import React from "react";
import { useAuth } from "../context/AuthContext";

const MY_SCHEDULE = [
  { id: 1, client: "Youssef A.", service: "Coupe homme", date: "2025-08-10", time: "09:00", duration: 30 },
  { id: 2, client: "Karim B.", service: "Coupe + Barbe", date: "2025-08-10", time: "10:00", duration: 45 },
  { id: 3, client: "Omar S.", service: "Barbe", date: "2025-08-10", time: "11:00", duration: 20 },
  { id: 4, client: "Ali M.", service: "Rasage classique", date: "2025-08-11", time: "09:00", duration: 25 },
];

export default function CoiffeurDashboard() {
  const { user } = useAuth();

  const today = MY_SCHEDULE.filter(s => s.date === "2025-08-10");
  const tomorrow = MY_SCHEDULE.filter(s => s.date === "2025-08-11");

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0E", padding: "40px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#F5F0E8" }}>
          Mon planning
        </h1>
        <p style={{ color: "#9B9589", marginTop: "6px" }}>Coiffeur · {user?.name}</p>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "40px" }}>
        {[
          { label: "Clients aujourd'hui", value: today.length, icon: "👤" },
          { label: "Demain", value: tomorrow.length, icon: "📅" },
          { label: "Total semaine", value: MY_SCHEDULE.length, icon: "📊" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#1A1917", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "24px 28px", flex: 1, minWidth: "140px",
          }}>
            <div style={{ fontSize: "22px", marginBottom: "10px" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#C9A96E", fontWeight: "600" }}>{s.value}</div>
            <div style={{ color: "#9B9589", fontSize: "13px", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {[{ label: "Aujourd'hui", items: today }, { label: "Demain", items: tomorrow }].map(day => (
        <div key={day.label} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8", marginBottom: "14px" }}>
            {day.label}
          </h2>
          {day.items.length === 0 ? (
            <p style={{ color: "#9B9589", fontSize: "14px" }}>Aucun rendez-vous</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {day.items.map(item => (
                <div key={item.id} style={{
                  background: "#1A1917", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px", padding: "18px 24px",
                  display: "flex", alignItems: "center", gap: "20px",
                }}>
                  <div style={{
                    background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)",
                    borderRadius: "10px", padding: "10px 16px", textAlign: "center", minWidth: "70px",
                  }}>
                    <div style={{ color: "#C9A96E", fontSize: "16px", fontWeight: "700" }}>{item.time}</div>
                    <div style={{ color: "#9B9589", fontSize: "11px" }}>{item.duration} min</div>
                  </div>
                  <div>
                    <div style={{ color: "#F5F0E8", fontWeight: "600" }}>{item.client}</div>
                    <div style={{ color: "#9B9589", fontSize: "13px" }}>{item.service}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}