import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import salons from "../data/salons";
import { useAuth } from "../context/AuthContext";

export default function SalonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const salon = salons.find(s => s.id === parseInt(id));
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!salon) return (
    <div style={{ padding: "80px", textAlign: "center", color: "#9B9589" }}>
      Salon introuvable
    </div>
  );

  const handleReserve = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!selectedService || !date || !time) {
      alert("Choisissez un service, une date et une heure");
      return;
    }
    // Pass booking data via state
    navigate("/confirmation", {
      state: {
        salon,
        service: selectedService,
        date,
        time,
        clientName: user.name,
      }
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0E" }}>

      {/* Hero Image */}
      <div style={{ position: "relative", height: "380px", overflow: "hidden" }}>
        <img src={salon.image} alt={salon.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(15,14,14,0.2) 0%, rgba(15,14,14,0.95) 100%)"
        }} />
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute", top: "24px", left: "40px",
            background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#F5F0E8", borderRadius: "8px", padding: "8px 16px",
            cursor: "pointer", fontSize: "14px", backdropFilter: "blur(8px)",
          }}
        >
          ← Retour
        </button>

        <div style={{ position: "absolute", bottom: "32px", left: "40px", right: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
            <span style={{
              background: "rgba(201,169,110,0.2)", color: "#C9A96E",
              border: "1px solid rgba(201,169,110,0.35)",
              borderRadius: "20px", padding: "4px 14px", fontSize: "12px",
              fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px",
            }}>
              {salon.type}
            </span>
            <span style={{ color: "#C9A96E", fontSize: "14px" }}>📍 {salon.city}</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "42px", fontWeight: "700",
            color: "#F5F0E8", marginBottom: "8px",
          }}>
            {salon.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{
              background: "#C9A96E", color: "#0F0E0E",
              borderRadius: "20px", padding: "4px 12px", fontSize: "13px", fontWeight: "700",
            }}>
              ★ {salon.rating}
            </span>
            <span style={{ color: "#9B9589", fontSize: "13px" }}>{salon.reviews} avis</span>
            <span style={{ color: "#9B9589", fontSize: "13px" }}>⏰ {salon.hours}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "40px", display: "flex", gap: "40px", flexWrap: "wrap" }}>

        {/* Left: Info + Services */}
        <div style={{ flex: 2, minWidth: "300px" }}>
          <p style={{ color: "#9B9589", fontSize: "16px", lineHeight: 1.7, marginBottom: "32px" }}>
            {salon.description}
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px", color: "#F5F0E8", marginBottom: "20px",
          }}>
            Nos Services
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {salon.services.map(service => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                style={{
                  background: selectedService?.id === service.id
                    ? "rgba(201,169,110,0.12)" : "#1A1917",
                  border: selectedService?.id === service.id
                    ? "1px solid rgba(201,169,110,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  if (selectedService?.id !== service.id)
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)";
                }}
                onMouseLeave={e => {
                  if (selectedService?.id !== service.id)
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div>
                  <div style={{ color: "#F5F0E8", fontWeight: "500", marginBottom: "4px" }}>
                    {service.name}
                  </div>
                  <div style={{ color: "#9B9589", fontSize: "13px" }}>⏱ {service.duration} min</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#C9A96E", fontWeight: "700", fontSize: "18px" }}>
                    {service.price} MAD
                  </span>
                  {selectedService?.id === service.id && (
                    <span style={{
                      background: "#C9A96E", color: "#0F0E0E",
                      borderRadius: "50%", width: "22px", height: "22px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "700",
                    }}>✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <div style={{
            background: "#1A1917",
            border: "1px solid rgba(201,169,110,0.2)",
            borderRadius: "20px",
            padding: "28px",
            position: "sticky",
            top: "84px",
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px", color: "#F5F0E8", marginBottom: "24px",
            }}>
              📅 Réserver
            </h3>

            {selectedService && (
              <div style={{
                background: "rgba(201,169,110,0.08)",
                border: "1px solid rgba(201,169,110,0.2)",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "20px",
              }}>
                <div style={{ color: "#C9A96E", fontSize: "13px", fontWeight: "600" }}>
                  {selectedService.name}
                </div>
                <div style={{ color: "#9B9589", fontSize: "12px" }}>
                  {selectedService.duration} min · {selectedService.price} MAD
                </div>
              </div>
            )}

            {/* Date */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>
                📆 Date
              </label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => setDate(e.target.value)}
                style={{
                  width: "100%",
                  background: "#252320",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  color: "#F5F0E8",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            {/* Time */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>
                ⏰ Heure
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    style={{
                      background: time === t ? "#C9A96E" : "#252320",
                      color: time === t ? "#0F0E0E" : "#9B9589",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "8px 12px",
                      fontSize: "13px",
                      fontWeight: time === t ? "600" : "400",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "10px",
              padding: "12px 16px",
              marginBottom: "20px",
            }}>
              <div style={{ color: "#9B9589", fontSize: "12px", marginBottom: "4px" }}>📞 Contact</div>
              <div style={{ color: "#F5F0E8", fontSize: "14px" }}>{salon.phone}</div>
              <div style={{ color: "#9B9589", fontSize: "12px", marginTop: "4px" }}>📍 {salon.address}</div>
            </div>

            <button
              onClick={handleReserve}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #C9A96E, #A8834A)",
                color: "#0F0E0E",
                border: "none",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => {
                e.target.style.opacity = "0.9";
                e.target.style.transform = "scale(1.01)";
              }}
              onMouseLeave={e => {
                e.target.style.opacity = "1";
                e.target.style.transform = "scale(1)";
              }}
            >
              Confirmer la réservation
            </button>

            {!user && (
              <p style={{ color: "#9B9589", fontSize: "12px", textAlign: "center", marginTop: "12px" }}>
                Vous devez vous connecter pour réserver
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}