import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const inp = {
  width: "100%",
  background: "#252320",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  padding: "14px 16px",
  color: "#F5F0E8",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'DM Sans', sans-serif",
};

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Remplissez tous les champs");
      return;
    }
    if (password.length < 6) {
      setError("Mot de passe trop court (min 6 caractères)");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: password,
        role,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
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
      <div style={{
        background: "#1A1917",
        border: "1px solid rgba(201,169,110,0.15)",
        borderRadius: "24px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>✂</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#F5F0E8" }}>
            Créer un compte
          </h1>
          <p style={{ color: "#9B9589", fontSize: "14px", marginTop: "8px" }}>
            Rejoignez la communauté SalonBook
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>Nom complet</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Youssef Alaoui" style={inp}
              onFocus={e => e.target.style.borderColor = "rgba(201,169,110,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          <div>
            <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" style={inp}
              onFocus={e => e.target.style.borderColor = "rgba(201,169,110,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          <div>
            <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inp}
              onFocus={e => e.target.style.borderColor = "rgba(201,169,110,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          <div>
            <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>Je suis</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={{ ...inp, cursor: "pointer" }}>
              <option value="client">Client</option>
              <option value="owner">Propriétaire de salon</option>
              <option value="coiffeur">Coiffeur</option>
            </select>
          </div>

          {error && (
            <div style={{
              color: "#E88080", fontSize: "13px",
              background: "rgba(232,128,128,0.08)",
              border: "1px solid rgba(232,128,128,0.2)",
              borderRadius: "8px", padding: "10px 14px",
            }}>
              ⚠ {error}
            </div>
          )}

          <button onClick={handleRegister} disabled={loading} style={{
            width: "100%",
            background: loading ? "#555" : "linear-gradient(135deg, #C9A96E, #A8834A)",
            color: "#0F0E0E",
            border: "none",
            borderRadius: "12px",
            padding: "15px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "8px",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {loading ? "Chargement..." : "Continuer →"}
          </button>
        </div>

        <p style={{ color: "#9B9589", fontSize: "14px", textAlign: "center", marginTop: "24px" }}>
          Déjà inscrit?{" "}
          <Link to="/login" style={{ color: "#C9A96E", fontWeight: "600" }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}