import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Github, Calendar, Code, MapPin, ChevronDown, Plus } from "lucide-react";
import Navbar from "../components/Navbar";

// ─── Skill Card ───────────────────────────────────────────────────────────────
function SkillCard({ skill, index, expandedIndex, toggleExpand }) {
  const isExpanded = expandedIndex === index;
  const score = skill.totalScore || 0;
  const levelColors = {
    Beginner:     { bg: "rgba(251,191,36,0.12)",  text: "#fbbf24" },
    Intermediate: { bg: "rgba(59,130,246,0.12)",  text: "#60a5fa" },
    Advanced:     { bg: "rgba(45,212,191,0.12)",  text: "#2dd4bf" },
    Expert:       { bg: "rgba(168,85,247,0.12)",  text: "#c084fc" },
  };
  const lvl = levelColors[skill.level] || levelColors.Beginner;

  return (
    <div style={{
      borderRadius: 16,
      border: isExpanded ? "1px solid rgba(45,212,191,0.35)" : "1px solid rgba(30,41,59,0.8)",
      background: isExpanded ? "linear-gradient(145deg,#0f1a2e,#0b1221)" : "rgba(15,23,42,0.6)",
      overflow: "hidden",
      transition: "border-color 0.3s,background 0.3s,transform 0.2s,box-shadow 0.3s",
      boxShadow: isExpanded ? "0 0 30px rgba(45,212,191,0.08),0 8px 32px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.25)",
      transform: isExpanded ? "translateY(-1px)" : "none",
    }}>
      <div onClick={() => toggleExpand(index)} style={{ padding: "20px 24px", cursor: "pointer" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: "linear-gradient(135deg,rgba(45,212,191,0.15),rgba(15,118,110,0.2))",
              border: "1px solid rgba(45,212,191,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Code size={18} color="#2dd4bf" strokeWidth={1.5} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "1.05rem", color: "#f1f5f9", margin: 0, marginBottom: 4 }}>
                {skill.name}
              </h3>
              <span style={{
                fontSize: "0.68rem", background: lvl.bg, color: lvl.text,
                padding: "3px 10px", borderRadius: 20,
                fontFamily: "'Times New Roman',Times,serif",
                fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
              }}>
                {skill.level || "Beginner"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "1.3rem", color: "#2dd4bf", lineHeight: 1 }}>
                {score}
              </div>
              <div style={{ fontSize: "0.62rem", color: "rgba(148,163,184,0.6)", fontFamily: "'Times New Roman',Times,serif", letterSpacing: "0.04em", textTransform: "uppercase", marginTop: 2 }}>
                score
              </div>
            </div>
            <ChevronDown size={16} color="rgba(148,163,184,0.5)" style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
          </div>
        </div>
        <div style={{ height: 4, background: "rgba(30,41,59,0.8)", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${score}%`, borderRadius: 99,
            background: "linear-gradient(90deg,#0f766e,#2dd4bf)",
            boxShadow: "0 0 8px rgba(45,212,191,0.4)",
            transition: "width 0.8s cubic-bezier(0.34,1.56,0.64,1)",
          }} />
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: "20px 24px 24px", borderTop: "1px solid rgba(30,41,59,0.8)" }}>
          {skill.proofs?.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {skill.proofs.map((proof, i) => {
                const repoName = proof.repoUrl?.split("/").slice(-1)[0] || "Repository";
                const owner    = proof.repoUrl?.split("/").slice(-2,-1)[0] || "";
                return (
                  <a key={i} href={proof.repoUrl} target="_blank" rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px", borderRadius: 12,
                      background: "rgba(11,17,28,0.8)", border: "1px solid rgba(30,41,59,0.8)",
                      textDecoration: "none", transition: "border-color 0.2s,background 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(45,212,191,0.4)"; e.currentTarget.style.background="rgba(45,212,191,0.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(30,41,59,0.8)"; e.currentTarget.style.background="rgba(11,17,28,0.8)"; }}
                  >
                    <Github size={16} color="rgba(148,163,184,0.6)" strokeWidth={1.5} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Times New Roman',Times,serif", fontSize: "0.88rem", color: "#cbd5e1" }}>
                        {owner && <span style={{ color: "rgba(148,163,184,0.5)" }}>{owner}/</span>}
                        {repoName}
                      </div>
                      <div style={{ fontFamily: "'Times New Roman',Times,serif", fontSize: "0.72rem", color: "rgba(148,163,184,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>
                        {proof.repoUrl}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "#2dd4bf", background: "rgba(45,212,191,0.08)", padding: "3px 8px", borderRadius: 6, fontFamily: "'Times New Roman',Times,serif", flexShrink: 0 }}>
                      View →
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <p style={{ fontFamily: "'Times New Roman',Times,serif", fontSize: "0.88rem", color: "rgba(148,163,184,0.4)", fontStyle: "italic", margin: 0, textAlign: "center", padding: "12px 0" }}>
              No repositories linked yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [user, setUser] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    if (!token || !email) { window.location.href = "/login"; return; }
    fetchUser(email);
  }, []);

  const fetchUser = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user?email=${email}`);
      setUser(res.data);
    } catch { window.location.href = "/login"; }
  };

  const toggleExpand = (index) => setExpandedIndex(expandedIndex === index ? null : index);

  if (!user) return (
    <div style={{ minHeight: "100vh", background: "#070a12", color: "#f8fafc" }}>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "'Times New Roman',Times,serif", color: "rgba(148,163,184,0.6)", gap: 12 }}>
        <div style={{ width: 20, height: 20, border: "2px solid rgba(45,212,191,0.3)", borderTop: "2px solid #2dd4bf", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        Loading profile…
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  const initials = user.username?.split(" ").map(w => w[0]).join("").toUpperCase() || "U";

  return (
    <div style={{ minHeight: "100vh", background: "#070a12", color: "#f8fafc", fontFamily: "'Times New Roman',Times,serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .hero-glow{position:absolute;top:0;left:50%;transform:translateX(-50%);width:900px;height:500px;background:radial-gradient(ellipse at 50% 0%,rgba(45,212,191,0.07) 0%,transparent 70%);pointer-events:none}
        .fade-up-1{animation:fadeUp 0.6s ease both;animation-delay:0.05s}
        .fade-up-2{animation:fadeUp 0.6s ease both;animation-delay:0.15s}
        .fade-up-3{animation:fadeUp 0.6s ease both;animation-delay:0.25s}
        .add-skill-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:10px;background:linear-gradient(135deg,#0f766e,#2dd4bf);color:#070a12;font-family:'Times New Roman',Times,serif;font-weight:700;font-size:0.88rem;text-decoration:none;transition:opacity 0.2s,transform 0.2s;box-shadow:0 4px 18px rgba(45,212,191,0.2)}
        .add-skill-btn:hover{opacity:0.88;transform:translateY(-1px)}
        .stat-card{padding:20px 24px;border-radius:16px;background:rgba(15,23,42,0.6);border:1px solid rgba(30,41,59,0.8);text-align:center;transition:border-color 0.2s,transform 0.2s}
        .stat-card:hover{border-color:rgba(45,212,191,0.25);transform:translateY(-2px)}
      `}</style>

      <Navbar />

      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(45,212,191,0.04) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", padding: "120px 24px 80px", zIndex: 1 }}>
        <div className="hero-glow" />

        {/* Hero */}
        <div className="fade-up-1" style={{ display: "flex", gap: 28, alignItems: "flex-start", marginBottom: 72, paddingBottom: 72, borderBottom: "1px solid rgba(30,41,59,0.6)" }}>
          <div style={{
            flexShrink: 0, width: 88, height: 88, borderRadius: 20,
            background: "linear-gradient(135deg,#0f766e,#134e4a)",
            border: "1px solid rgba(45,212,191,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.9rem", fontFamily: "'Times New Roman',Times,serif",
            fontWeight: 700, color: "#2dd4bf",
            boxShadow: "0 0 40px rgba(45,212,191,0.1),inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.25rem)", letterSpacing: "-0.01em", color: "#f8fafc", lineHeight: 1.15, marginBottom: 8 }}>
              {user.username}
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px", marginBottom: 14 }}>
              <span style={{ fontFamily: "'Times New Roman',Times,serif", fontSize: "1rem", color: "#2dd4bf", fontStyle: "italic" }}>
                {user.headline || "Software Developer"}
              </span>
              {user.location && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.88rem", color: "rgba(148,163,184,0.7)" }}>
                  <MapPin size={13} strokeWidth={1.5} /> {user.location}
                </span>
              )}
            </div>
            <p style={{ fontSize: "0.95rem", color: "rgba(148,163,184,0.75)", lineHeight: 1.8, maxWidth: 560, marginBottom: 20, fontFamily: "'Times New Roman',Times,serif" }}>
              {user.description || "Building scalable systems with production-ready code."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", alignItems: "center" }}>
              {user.github && (
                <a href={user.github} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.85rem", color: "rgba(148,163,184,0.65)", textDecoration: "none", fontFamily: "'Times New Roman',Times,serif", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color="#2dd4bf"}
                  onMouseLeave={e => e.currentTarget.style.color="rgba(148,163,184,0.65)"}
                >
                  <Github size={14} strokeWidth={1.5} />
                  {user.github.replace("https://github.com/", "@")}
                </a>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.82rem", color: "rgba(148,163,184,0.45)", fontFamily: "'Times New Roman',Times,serif" }}>
                <Calendar size={13} strokeWidth={1.5} />
                Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US",{month:"long",year:"numeric"}) : "Recently"}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="fade-up-2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 64 }}>
          {[
            { label: "Skills",    value: user.skills?.length || 0, sub: "tracked" },
            { label: "Proofs",    value: user.skills?.reduce((a,s)=>a+(s.proofs?.length||0),0)||0, sub: "repositories" },
            { label: "Avg Score", value: user.skills?.length ? Math.round(user.skills.reduce((a,s)=>a+(s.totalScore||0),0)/user.skills.length) : 0, sub: "out of 100" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="stat-card">
              <div style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "2.1rem", color: "#2dd4bf", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 6 }}>{value}</div>
              <div style={{ fontFamily: "'Times New Roman',Times,serif", fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600 }}>{label}</div>
              <div style={{ fontFamily: "'Times New Roman',Times,serif", fontSize: "0.72rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="fade-up-3">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: "'Times New Roman',Times,serif", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2dd4bf", fontWeight: 700, marginBottom: 6 }}>
                Skill Evidence
              </div>
              <h2 style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "1.7rem", letterSpacing: "-0.01em", color: "#f1f5f9" }}>
                Skills & Proof
              </h2>
            </div>
            <Link to="/add-skill" className="add-skill-btn">
              <Plus size={15} strokeWidth={2.5} /> Add Skill
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {user.skills?.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} expandedIndex={expandedIndex} toggleExpand={toggleExpand} />
            ))}
            {(!user.skills || user.skills.length === 0) && (
              <div style={{ padding: "56px 24px", borderRadius: 16, border: "1px dashed rgba(30,41,59,0.8)", textAlign: "center", color: "rgba(148,163,184,0.4)", fontFamily: "'Times New Roman',Times,serif", fontSize: "0.95rem" }}>
                No skills added yet.{" "}
                <Link to="/add-skill" style={{ color: "#2dd4bf", textDecoration: "underline" }}>
                  Add your first skill →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}