import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      const paths = {
        client: "/dashboard/client",
        owner: "/dashboard/owner",
        coiffeur: "/dashboard/coiffeur",
        admin: "/dashboard/admin",
      };
      navigate(paths[user.role] || "/");
    } catch (e) {
      setError("Email ou mot de passe incorrect");
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
            Connexion
          </h1>
          <p style={{ color: "#9B9589", fontSize: "14px", marginTop: "8px" }}>
            Accédez à votre espace SalonBook
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.com"
              style={inp}
              onFocus={e => e.target.style.borderColor = "rgba(201,169,110,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
          <div>
            <label style={{ color: "#9B9589", fontSize: "13px", display: "block", marginBottom: "8px" }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inp}
              onFocus={e => e.target.style.borderColor = "rgba(201,169,110,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
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

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
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
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>

        <p style={{ color: "#9B9589", fontSize: "14px", textAlign: "center", marginTop: "24px" }}>
          Pas encore de compte?{" "}
          <Link to="/register" style={{ color: "#C9A96E", fontWeight: "600" }}>S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}