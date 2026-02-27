import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Sparkles, LogOut, Search, Users, Award, ChevronRight, X } from "lucide-react";

const TNR = "'Times New Roman', Times, serif";

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
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
      background: "rgba(7,10,18,0.82)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(45,212,191,0.08)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#2dd4bf,#0f766e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={16} color="#fff" />
        </div>
        <span style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.01em", color: "#f8fafc", fontStyle: "italic" }}>
          ProofFolio
        </span>
        <span style={{ fontFamily: TNR, fontSize: "0.72rem", color: "rgba(45,212,191,0.7)", padding: "2px 8px", borderRadius: 99, border: "1px solid rgba(45,212,191,0.2)", background: "rgba(45,212,191,0.06)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Recruiter
        </span>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "7px 16px", borderRadius: 8,
        border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)",
        color: "#f87171", fontSize: "0.82rem", fontFamily: TNR,
        cursor: "pointer", transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.14)"; e.currentTarget.style.borderColor = "#f87171"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
      >
        <LogOut size={13} strokeWidth={1.8} /> Logout
      </button>
    </nav>
  );
}

// ── Candidate Card ─────────────────────────────────────────────────────────
function CandidateCard({ user, onClick }) {
  const [hovered, setHovered] = useState(false);
  const initials = user.username?.split(" ").map(w => w[0]).join("").toUpperCase() || "U";
  const avgScore = user.skills?.length
    ? Math.round(user.skills.reduce((a, s) => a + (s.totalScore || 0), 0) / user.skills.length)
    : 0;

  return (
    <div onClick={onClick}
      style={{
        padding: "24px 28px", borderRadius: 18, cursor: "pointer",
        border: hovered ? "1px solid rgba(45,212,191,0.35)" : "1px solid rgba(30,41,59,0.8)",
        background: hovered ? "linear-gradient(145deg,#0f1a2e,#0b1221)" : "rgba(15,23,42,0.6)",
        transition: "all 0.25s", transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.4),0 0 20px rgba(45,212,191,0.06)" : "0 2px 12px rgba(0,0,0,0.2)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>

        {/* Left */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1 }}>
          {/* Avatar */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: "linear-gradient(135deg,#0f766e,#134e4a)",
            border: "1px solid rgba(45,212,191,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", fontFamily: TNR, fontWeight: 700, color: "#2dd4bf",
          }}>
            {initials}
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9", marginBottom: 4 }}>
              {user.username}
            </h3>
            <p style={{ fontFamily: TNR, fontSize: "0.85rem", color: "rgba(148,163,184,0.6)", marginBottom: 14 }}>
              {user.headline || "Software Developer"}
              {user.location ? ` · ${user.location}` : ""}
            </p>

            {/* Skills */}
            {user.skills?.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {user.skills.slice(0, 5).map(skill => {
                  const score = skill.totalScore || 0;
                  const color = score >= 70 ? "#2dd4bf" : score >= 40 ? "#60a5fa" : "#fbbf24";
                  return (
                    <div key={skill._id} style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "4px 12px", borderRadius: 99,
                      background: `${color}10`, border: `1px solid ${color}28`,
                    }}>
                      <span style={{ fontFamily: TNR, fontSize: "0.78rem", color: "#e2e8f0" }}>{skill.name}</span>
                      <span style={{ fontFamily: TNR, fontSize: "0.72rem", color, fontWeight: 700 }}>{score}</span>
                    </div>
                  );
                })}
                {user.skills.length > 5 && (
                  <div style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(30,41,59,0.8)", border: "1px solid rgba(30,41,59,0.8)" }}>
                    <span style={{ fontFamily: TNR, fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>+{user.skills.length - 5} more</span>
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontFamily: TNR, fontSize: "0.82rem", color: "rgba(148,163,184,0.35)", fontStyle: "italic" }}>No skills added</p>
            )}
          </div>
        </div>

        {/* Right: stats */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.5rem", color: "#2dd4bf", lineHeight: 1 }}>{avgScore}</div>
            <div style={{ fontFamily: TNR, fontSize: "0.62rem", color: "rgba(148,163,184,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>avg score</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1rem", color: "#94a3b8", lineHeight: 1 }}>{user.skills?.length || 0}</div>
            <div style={{ fontFamily: TNR, fontSize: "0.62rem", color: "rgba(148,163,184,0.5)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>skills</div>
          </div>
          <ChevronRight size={16} color={hovered ? "#2dd4bf" : "rgba(148,163,184,0.3)"} style={{ transition: "color 0.2s, transform 0.2s", transform: hovered ? "translateX(3px)" : "none" }} />
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function RecruiterDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [skill, setSkill] = useState("");
  const [minExp, setMinExp] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  // Pass params explicitly so the function always uses fresh values
const fetchCandidates = async (overrides = {}) => {
  const skillVal = "skill" in overrides ? overrides.skill : skill;
  const minExpVal = "minExp" in overrides ? overrides.minExp : minExp;

  setLoading(true);
  setSearched(true);

  try {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams();
    if (skillVal.trim()) params.append("skill", skillVal.trim());
    if (minExpVal) params.append("minExp", minExpVal);

    const res = await axios.get(
      `http://localhost:5000/api/recruiter/search?${params.toString()}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCandidates(Array.isArray(res.data) ? res.data : []);

  } catch (err) {
    console.error(err.response?.data);
    setCandidates([]);
  }

  setLoading(false);
};

const clearFilters = () => {
  setSkill("");
  setMinExp("");
  setSearched(false);
  setCandidates([]);
  fetchCandidates({ skill: "", minExp: "" }); // ← pass cleared values directly
};

  useEffect(() => { fetchCandidates(); }, []);

  const totalSkills = candidates.reduce((a, u) => a + (u.skills?.length || 0), 0);
  const avgScore = candidates.length
    ? Math.round(candidates.reduce((a, u) => {
        const s = u.skills?.length ? u.skills.reduce((x, sk) => x + (sk.totalScore || 0), 0) / u.skills.length : 0;
        return a + s;
      }, 0) / candidates.length)
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#070a12", color: "#f8fafc", fontFamily: TNR }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        .search-input {
          width: 100%; padding: 12px 16px 12px 44px;
          background: rgba(7,10,18,0.8); border: 1px solid rgba(30,41,59,0.8);
          border-radius: 10px; color: #f1f5f9; font-size: 0.92rem;
          font-family: 'Times New Roman',Times,serif;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus { border-color: rgba(45,212,191,0.5); box-shadow: 0 0 0 3px rgba(45,212,191,0.08); }
        .search-input::placeholder { color: rgba(148,163,184,0.35); }
        .search-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 28px; border-radius: 10px; border: none;
          background: linear-gradient(135deg,#0f766e,#2dd4bf);
          color: #070a12; font-family: 'Times New Roman',Times,serif;
          font-weight: 700; font-size: 0.9rem; cursor: pointer;
          transition: opacity 0.2s, transform 0.2s; white-space: nowrap;
        }
        .search-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .clear-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 18px; border-radius: 10px;
          border: 1px solid rgba(30,41,59,0.8); background: transparent;
          color: rgba(148,163,184,0.6); font-family: 'Times New Roman',Times,serif;
          font-size: 0.85rem; cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .clear-btn:hover { border-color: rgba(148,163,184,0.4); color: #94a3b8; }
        .stat-card { padding: 20px 24px; border-radius: 14px; background: rgba(15,23,42,0.6); border: 1px solid rgba(30,41,59,0.8); text-align: center; }
      `}</style>

      {/* Dot grid */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(45,212,191,0.03) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 0 }} />

      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, animation: "fadeUp 0.5s ease both" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2dd4bf", fontWeight: 700, marginBottom: 10, fontFamily: TNR }}>
            Recruiter Dashboard
          </p>
          <h1 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "clamp(1.8rem,4vw,2.6rem)", letterSpacing: "-0.02em", color: "#f8fafc", lineHeight: 1.1, marginBottom: 10 }}>
            Find Verified Talent
          </h1>
          <p style={{ fontFamily: TNR, fontSize: "0.95rem", color: "rgba(148,163,184,0.6)", lineHeight: 1.7 }}>
            Search candidates by skill and experience. All scores are GitHub-verified.
          </p>
        </div>

        {/* Search bar */}
        <div style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(30,41,59,0.8)", borderRadius: 18, padding: "24px 28px", marginBottom: 32, animation: "fadeUp 0.5s ease 0.1s both" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>

            {/* Skill input */}
            <div style={{ flex: 2, minWidth: 180 }}>
              <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", marginBottom: 6, fontFamily: TNR }}>Skill</label>
              <div style={{ position: "relative" }}>
                <Search size={15} color="rgba(148,163,184,0.35)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  className="search-input"
                  type="text"
                  placeholder="e.g. React, Python, Docker"
                  value={skill}
                  onChange={e => setSkill(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && fetchCandidates()}
                />
              </div>
            </div>

            {/* Min experience input */}
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", marginBottom: 6, fontFamily: TNR }}>Min. Experience (yrs)</label>
              <div style={{ position: "relative" }}>
                <Award size={15} color="rgba(148,163,184,0.35)" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input
                  className="search-input"
                  type="number"
                  placeholder="e.g. 2"
                  value={minExp}
                  min={0}
                  onChange={e => setMinExp(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && fetchCandidates()}
                />
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 8, paddingTop: 22 }}>
              <button className="search-btn" onClick={fetchCandidates}>
                <Search size={15} /> Search
              </button>
              {(skill || minExp) && (
                <button className="clear-btn" onClick={clearFilters}>
                  <X size={13} /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        {candidates.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 32, animation: "fadeUp 0.4s ease both" }}>
            {[
              { label: "Candidates", value: candidates.length, sub: "found" },
              { label: "Total Skills", value: totalSkills, sub: "across all" },
              { label: "Avg Score", value: avgScore, sub: "out of 100" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="stat-card">
                <div style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.9rem", color: "#2dd4bf", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 4 }}>{value}</div>
                <div style={{ fontFamily: TNR, fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>{label}</div>
                <div style={{ fontFamily: TNR, fontSize: "0.68rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        <div style={{ animation: "fadeUp 0.5s ease 0.2s both" }}>

          {/* Section label */}
          {searched && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={15} color="rgba(148,163,184,0.5)" strokeWidth={1.5} />
                <span style={{ fontFamily: TNR, fontSize: "0.82rem", color: "rgba(148,163,184,0.5)" }}>
                  {loading ? "Searching…" : `${candidates.length} candidate${candidates.length !== 1 ? "s" : ""} found`}
                </span>
              </div>
              {skill && (
                <span style={{ fontFamily: TNR, fontSize: "0.75rem", color: "rgba(45,212,191,0.6)", background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.15)", padding: "3px 10px", borderRadius: 99 }}>
                  Skill: "{skill}"
                </span>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 0", gap: 12, color: "rgba(148,163,184,0.5)", fontFamily: TNR }}>
              <div style={{ width: 18, height: 18, border: "2px solid rgba(45,212,191,0.2)", borderTop: "2px solid #2dd4bf", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              Searching candidates…
            </div>
          )}

          {/* Empty */}
          {!loading && searched && candidates.length === 0 && (
            <div style={{ padding: "64px 24px", borderRadius: 18, border: "1px dashed rgba(30,41,59,0.8)", textAlign: "center" }}>
              <Users size={32} color="rgba(148,163,184,0.2)" style={{ margin: "0 auto 16px" }} />
              <p style={{ fontFamily: TNR, fontSize: "1rem", color: "rgba(148,163,184,0.4)", marginBottom: 8 }}>No candidates found</p>
              <p style={{ fontFamily: TNR, fontSize: "0.84rem", color: "rgba(148,163,184,0.25)" }}>Try adjusting your filters or clearing the search</p>
            </div>
          )}

          {/* Cards */}
          {!loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {candidates.map((user, i) => (
                <div key={user._id} style={{ animation: `fadeUp 0.4s ease ${i * 60}ms both` }}>
                  <CandidateCard
                    user={user}
                    onClick={() => navigate(`/profile/${user._id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}