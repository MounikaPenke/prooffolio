// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Plus, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: "0 2rem", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(7,10,18,0.82)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(45,212,191,0.08)",
    }}>

      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg,#2dd4bf,#0f766e)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Sparkles size={16} color="#fff" />
        </div>
        <span style={{
          fontFamily: "'Times New Roman',Times,serif",
          fontWeight: 700, fontSize: "1.15rem",
          letterSpacing: "-0.01em", color: "#f8fafc", fontStyle: "italic",
        }}>
          ProofFolio
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>

        <Link to="/add-skill" style={{
          display: "flex", alignItems: "center", gap: 6,
          fontFamily: "'Times New Roman',Times,serif",
          fontSize: "0.9rem", color: "rgba(148,163,184,0.85)",
          textDecoration: "none", transition: "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = "#2dd4bf"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(148,163,184,0.85)"}
        >
          <Plus size={14} strokeWidth={2} /> Add Skill
        </Link>

        <Link to="/about" style={{
          fontFamily: "'Times New Roman',Times,serif",
          fontSize: "0.9rem", color: "rgba(148,163,184,0.85)",
          textDecoration: "none", transition: "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = "#2dd4bf"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(148,163,184,0.85)"}
        >
          About
        </Link>

        <Link to="/edit-profile" style={{
          padding: "7px 18px", borderRadius: 8,
          border: "1px solid rgba(45,212,191,0.4)",
          background: "rgba(45,212,191,0.08)",
          color: "#2dd4bf", fontSize: "0.82rem",
          fontFamily: "'Times New Roman',Times,serif",
          fontWeight: 600, textDecoration: "none",
          letterSpacing: "0.01em", transition: "all 0.2s",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(45,212,191,0.18)";
            e.currentTarget.style.borderColor = "#2dd4bf";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(45,212,191,0.08)";
            e.currentTarget.style.borderColor = "rgba(45,212,191,0.4)";
          }}
        >
          Edit Profile
        </Link>

        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "7px 14px", borderRadius: 8,
          border: "1px solid rgba(239,68,68,0.3)",
          background: "rgba(239,68,68,0.06)",
          color: "#f87171", fontSize: "0.82rem",
          fontFamily: "'Times New Roman',Times,serif",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(239,68,68,0.14)";
            e.currentTarget.style.borderColor = "#f87171";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(239,68,68,0.06)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
          }}
        >
          <LogOut size={13} strokeWidth={1.8} /> Logout
        </button>

      </div>
    </nav>
  );
}