import React, { useState, useMemo, useEffect } from "react";
import SalonCard from "../components/SalonCard";
import api from "../api";

const CITIES = ["Toutes", "Fes", "Rabat", "Casablanca", "Marrakech", "Tanger"];
const TYPES = ["Tous", "Femme", "Homme", "Spa"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Toutes");
  const [type, setType] = useState("Tous");
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  // جيب الصالونات من Backend
  useEffect(() => {
    api.get('/salons')
      .then(res => {
        setSalons(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    return salons.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchCity = city === "Toutes" || s.city === city;
      const matchType = type === "Tous" || s.type === type;
      return matchSearch && matchCity && matchType;
    });
  }, [search, city, type, salons]);

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0E" }}>

      {/* Hero Section */}
      <div style={{
        padding: "80px 40px 60px",
        textAlign: "center",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <p style={{ color: "#C9A96E", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
          المغرب الجميل
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: "700",
          color: "#F5F0E8",
          marginBottom: "16px",
          lineHeight: 1.15,
        }}>
          Trouvez votre salon<br />
          <span style={{ color: "#C9A96E" }}>idéal</span>
        </h1>
        <p style={{ color: "#9B9589", fontSize: "16px", marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>
          Réservez en quelques clics — les meilleurs salons du Maroc à portée de main.
        </p>

        {/* Search bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#1A1917",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "50px",
          padding: "6px 6px 6px 24px",
          maxWidth: "520px",
          margin: "0 auto",
          gap: "12px",
        }}>
          <span style={{ color: "#9B9589", fontSize: "18px" }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un salon..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F5F0E8",
              fontSize: "15px",
            }}
          />
          <button style={{
            background: "#C9A96E",
            color: "#0F0E0E",
            border: "none",
            borderRadius: "40px",
            padding: "10px 24px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}>
            Chercher
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        padding: "28px 40px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ color: "#9B9589", fontSize: "13px", alignSelf: "center", marginRight: "4px" }}>📍 Ville:</span>
          {CITIES.map(c => (
            <button
              key={c}
              onClick={() => setCity(c)}
              style={{
                background: city === c ? "#C9A96E" : "rgba(255,255,255,0.05)",
                color: city === c ? "#0F0E0E" : "#9B9589",
                border: city === c ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: city === c ? "600" : "400",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ width: "1px", height: "30px", background: "rgba(255,255,255,0.1)" }} />

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <span style={{ color: "#9B9589", fontSize: "13px", alignSelf: "center", marginRight: "4px" }}>💇 Type:</span>
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                background: type === t ? "#C9A96E" : "rgba(255,255,255,0.05)",
                color: type === t ? "#0F0E0E" : "#9B9589",
                border: type === t ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "20px",
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: type === t ? "600" : "400",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <span style={{ marginLeft: "auto", color: "#9B9589", fontSize: "13px" }}>
          {filtered.length} salon{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Salon Cards */}
      <div style={{ padding: "40px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: "#9B9589", fontSize: "16px" }}>Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✂️</div>
            <p style={{ color: "#9B9589", fontSize: "16px" }}>Aucun salon trouvé pour ces critères</p>
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
          }}>
            {filtered.map((salon, i) => (
              <div
                key={salon.id}
                style={{
                  animation: `fadeUp 0.4s ease forwards`,
                  animationDelay: `${i * 0.06}s`,
                  opacity: 0,
                }}
              >
                <SalonCard salon={salon} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}