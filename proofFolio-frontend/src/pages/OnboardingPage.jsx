// src/pages/OnboardingPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { User, FileText, MapPin, Github, Code, Plus, X, ChevronRight, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

const colors = {
  bg: "#070a12", card: "rgba(15,23,42,0.7)", border: "rgba(30,41,59,0.8)",
  teal: "#2dd4bf", text: "#f1f5f9", error: "#f87171",
};

const inputStyle = {
  width: "100%", padding: "12px 16px",
  background: "rgba(7,10,18,0.8)", border: `1px solid ${colors.border}`,
  borderRadius: 10, color: colors.text, fontSize: "0.92rem",
  fontFamily: "'Times New Roman',Times,serif",
  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s,box-shadow 0.2s",
};
const withIcon = { ...inputStyle, paddingLeft: 42 };

function InputField({ icon: Icon, label, name, placeholder, value, onChange, type = "text", error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", marginBottom: 6, fontFamily: "'Times New Roman',Times,serif" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={15} color={focused ? colors.teal : "rgba(148,163,184,0.35)"} strokeWidth={1.5} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />}
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
          style={{ ...(Icon ? withIcon : inputStyle), borderColor: error ? colors.error : focused ? colors.teal : colors.border, boxShadow: focused ? `0 0 0 3px ${error ? "rgba(248,113,113,0.1)" : "rgba(45,212,191,0.08)"}` : "none" }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      </div>
      {error && <p style={{ color: colors.error, fontSize: "0.75rem", marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function TextAreaField({ icon: Icon, label, name, placeholder, value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", marginBottom: 6, fontFamily: "'Times New Roman',Times,serif" }}>{label}</label>}
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={15} color={focused ? colors.teal : "rgba(148,163,184,0.35)"} strokeWidth={1.5} style={{ position: "absolute", left: 14, top: 14, pointerEvents: "none" }} />}
        <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} rows={4}
          style={{ ...inputStyle, paddingLeft: Icon ? 42 : 16, resize: "vertical", minHeight: 100, borderColor: error ? colors.error : focused ? colors.teal : colors.border }}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      </div>
      {error && <p style={{ color: colors.error, fontSize: "0.75rem", marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function SkillBadge({ skill }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderRadius: 12, background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.2)", marginBottom: 10 }}>
      <CheckCircle size={16} color={colors.teal} strokeWidth={2} />
      <div>
        <p style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "0.92rem", color: colors.text }}>{skill.name}</p>
        <p style={{ fontSize: "0.75rem", color: colors.teal, marginTop: 2, fontFamily: "'Times New Roman',Times,serif" }}>Evidence Score: {skill.totalScore}</p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAddSkillMode = location.pathname === "/add-skill";
  const [step, setStep] = useState(isAddSkillMode ? 2 : 1);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ headline: "", description: "", location: "", status: "Student", college: "", graduationYear: "", company: "", experience: "", github: "" });
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({ name: "", level: "Beginner", proofs: [""] });

  const isValidGithubProfile = (url) => /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/?$/.test(url);
  const isValidGithubRepo = (url) => /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9_.-]+\/?$/.test(url);

  const handleProfileChange = (e) => { setProfile({ ...profile, [e.target.name]: e.target.value }); setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); };
  const handleSkillChange = (e) => { setCurrentSkill({ ...currentSkill, [e.target.name]: e.target.value }); setFieldErrors({ ...fieldErrors, skillName: "" }); };
  const handleProofChange = (i, val) => { const u = [...currentSkill.proofs]; u[i] = val; setCurrentSkill({ ...currentSkill, proofs: u }); setFieldErrors({ ...fieldErrors, [`proof-${i}`]: "" }); };

  const validateStep1 = () => {
    const errors = {};
    if (!profile.headline.trim()) errors.headline = "Please enter your headline.";
    if (!profile.description.trim()) errors.description = "Please write a short description.";
    if (!profile.location.trim()) errors.location = "Please enter your location.";
    if (profile.status === "Student") {
      if (!profile.college.trim()) errors.college = "Please enter your college.";
      if (!profile.graduationYear.trim()) errors.graduationYear = "Please enter graduation year.";
    }
    if (!profile.github.trim()) errors.github = "Please provide your GitHub link.";
    else if (!isValidGithubProfile(profile.github)) errors.github = "Use format: https://github.com/username";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addSkill = async () => {
    const errors = {};
    if (!currentSkill.name.trim()) errors.skillName = "Please enter a skill name.";
    currentSkill.proofs.forEach((p, i) => {
      if (!p.trim()) errors[`proof-${i}`] = "Please provide a GitHub repo link.";
      else if (!isValidGithubRepo(p)) errors[`proof-${i}`] = "Use format: https://github.com/username/repo";
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/skill/add-proof", { email: localStorage.getItem("userEmail"), skillName: currentSkill.name, repoUrl: currentSkill.proofs[0] });
      setSkills([...skills, res.data.updatedSkill]);
      setCurrentSkill({ name: "", level: "Beginner", proofs: [""] });
    } catch (err) {
      setFieldErrors(prev => ({ ...prev, "proof-0": err.response?.data?.error || "Verification failed." }));
    }
    setLoading(false);
  };

  const handleFinish = async () => {
    if (skills.length === 0) return;
    try {
      await axios.post("http://localhost:5000/api/user/complete-onboarding", { email: localStorage.getItem("userEmail"), profile });
      navigate("/portfolio");
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.bg, color: colors.text, fontFamily: "'Times New Roman',Times,serif" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .add-btn{width:100%;padding:13px;background:linear-gradient(135deg,#0f766e,#2dd4bf);border:none;border-radius:12px;color:#070a12;font-weight:700;font-size:0.9rem;font-family:'Times New Roman',Times,serif;cursor:pointer;transition:opacity 0.2s,transform 0.2s;display:flex;align-items:center;justify-content:center;gap:8px}
        .add-btn:hover:not(:disabled){opacity:0.88;transform:translateY(-1px)}
        .add-btn:disabled{opacity:0.5;cursor:not-allowed}
        .finish-btn{width:100%;padding:13px;border:1px solid rgba(45,212,191,0.3);background:rgba(45,212,191,0.07);border-radius:12px;color:#2dd4bf;font-weight:600;font-size:0.9rem;font-family:'Times New Roman',Times,serif;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px}
        .finish-btn:hover:not(:disabled){background:rgba(45,212,191,0.13);border-color:#2dd4bf}
        .finish-btn:disabled{opacity:0.4;cursor:not-allowed}
        .continue-btn{width:100%;padding:14px;background:linear-gradient(135deg,#0f766e,#2dd4bf);border:none;border-radius:12px;color:#070a12;font-weight:700;font-size:0.95rem;font-family:'Times New Roman',Times,serif;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity 0.2s,transform 0.2s}
        .continue-btn:hover{opacity:0.88;transform:translateY(-1px)}
        .level-btn{flex:1;padding:9px 12px;border-radius:8px;font-size:0.82rem;font-family:'Times New Roman',Times,serif;cursor:pointer;transition:all 0.2s;border:1px solid rgba(30,41,59,0.8);background:transparent;color:rgba(148,163,184,0.6)}
        .level-btn.active{border-color:rgba(45,212,191,0.4);background:rgba(45,212,191,0.1);color:#2dd4bf}
        .remove-btn{width:36px;height:36px;border-radius:8px;flex-shrink:0;border:1px solid rgba(248,113,113,0.25);background:rgba(248,113,113,0.06);color:#f87171;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s}
        .remove-btn:hover{background:rgba(248,113,113,0.14);border-color:#f87171}
        .add-proof-btn{display:flex;align-items:center;gap:6px;background:none;border:none;color:rgba(45,212,191,0.7);font-family:'Times New Roman',Times,serif;font-size:0.82rem;cursor:pointer;padding:4px 0;transition:color 0.2s}
        .add-proof-btn:hover{color:#2dd4bf}
      `}</style>

      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(45,212,191,0.03) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 0 }} />

      {/* ← Always show the shared Navbar */}
      <Navbar />

      <div style={{ position: "relative", zIndex: 1, maxWidth: isAddSkillMode ? 960 : 520, margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.5s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,rgba(45,212,191,0.15),rgba(15,118,110,0.2))", border: "1px solid rgba(45,212,191,0.2)", marginBottom: 16 }}>
            <Sparkles size={22} color={colors.teal} />
          </div>
          <h1 style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.2rem)", letterSpacing: "-0.01em", marginBottom: 10 }}>
            {isAddSkillMode ? "Add New Skill" : "Build Your Proof Profile"}
          </h1>
          {!isAddSkillMode && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
              {[1, 2].map(s => (
                <React.Fragment key={s}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: step >= s ? "linear-gradient(135deg,#0f766e,#2dd4bf)" : "rgba(30,41,59,0.8)", border: step >= s ? "none" : "1px solid rgba(30,41,59,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: step >= s ? "#070a12" : "rgba(148,163,184,0.4)" }}>{s}</div>
                    <span style={{ fontSize: "0.78rem", color: step === s ? colors.teal : "rgba(148,163,184,0.4)", fontFamily: "'Times New Roman',Times,serif" }}>{s === 1 ? "Profile" : "Skills"}</span>
                  </div>
                  {s < 2 && <div style={{ width: 32, height: 1, background: "rgba(30,41,59,0.8)" }} />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 20, padding: "32px 36px", animation: "fadeUp 0.5s ease 0.1s both" }}>
            <InputField icon={User} label="Headline" name="headline" placeholder="e.g. Backend Developer" value={profile.headline} onChange={handleProfileChange} error={fieldErrors.headline} />
            <TextAreaField icon={FileText} label="About You" name="description" placeholder="A few lines about yourself..." value={profile.description} onChange={handleProfileChange} error={fieldErrors.description} />
            <InputField icon={MapPin} label="Location" name="location" placeholder="e.g. Hyderabad, India" value={profile.location} onChange={handleProfileChange} error={fieldErrors.location} />
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", marginBottom: 8, fontFamily: "'Times New Roman',Times,serif" }}>Status</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Student", "Working"].map(s => (
                  <button key={s} className={`level-btn${profile.status === s ? " active" : ""}`} onClick={() => setProfile({ ...profile, status: s })} type="button">{s}</button>
                ))}
              </div>
            </div>
            {profile.status === "Student" && (
              <>
                <InputField label="College" name="college" placeholder="College name" value={profile.college} onChange={handleProfileChange} error={fieldErrors.college} />
                <InputField label="Graduation Year" name="graduationYear" placeholder="e.g. 2026" value={profile.graduationYear} onChange={handleProfileChange} error={fieldErrors.graduationYear} />
              </>
            )}
            <InputField icon={Github} label="GitHub Profile" name="github" placeholder="https://github.com/username" value={profile.github} onChange={handleProfileChange} error={fieldErrors.github} />
            <button className="continue-btn" style={{ marginTop: 8 }} onClick={() => { if (validateStep1()) setStep(2); }}>
              Continue <ChevronRight size={17} />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div style={{ display: "grid", gridTemplateColumns: isAddSkillMode ? "1fr 1fr" : "1fr", gap: 20, animation: "fadeUp 0.5s ease 0.1s both" }}>
            <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 20, padding: "28px" }}>
              <h3 style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 20 }}>Skill Details</h3>
              <InputField icon={Code} label="Skill Name" name="name" placeholder="e.g. React, Node.js, Docker" value={currentSkill.name} onChange={handleSkillChange} error={fieldErrors.skillName} />
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", marginBottom: 8, fontFamily: "'Times New Roman',Times,serif" }}>Level</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Beginner", "Intermediate", "Advanced"].map(l => (
                    <button key={l} type="button" className={`level-btn${currentSkill.level === l ? " active" : ""}`} onClick={() => setCurrentSkill({ ...currentSkill, level: l })}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", marginBottom: 8, fontFamily: "'Times New Roman',Times,serif" }}>Proof Repositories</label>
                {currentSkill.proofs.map((proof, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ position: "relative" }}>
                        <Github size={14} color="rgba(148,163,184,0.35)" strokeWidth={1.5} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                        <input placeholder="https://github.com/user/repo" value={proof} onChange={e => handleProofChange(i, e.target.value)}
                          style={{ ...withIcon, borderColor: fieldErrors[`proof-${i}`] ? colors.error : colors.border }}
                          onFocus={e => e.target.style.borderColor = colors.teal}
                          onBlur={e => e.target.style.borderColor = fieldErrors[`proof-${i}`] ? colors.error : colors.border} />
                      </div>
                      {fieldErrors[`proof-${i}`] && <p style={{ color: colors.error, fontSize: "0.73rem", marginTop: 4 }}>{fieldErrors[`proof-${i}`]}</p>}
                    </div>
                    {currentSkill.proofs.length > 1 && (
                      <button className="remove-btn" onClick={() => setCurrentSkill({ ...currentSkill, proofs: currentSkill.proofs.filter((_, j) => j !== i) })}>
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button className="add-proof-btn" type="button" onClick={() => setCurrentSkill({ ...currentSkill, proofs: [...currentSkill.proofs, ""] })}>
                  <Plus size={13} /> Add another repo
                </button>
              </div>
              <button className="add-btn" onClick={addSkill} disabled={loading}>
                {loading ? <div style={{ width: 16, height: 16, border: "2px solid rgba(7,10,18,0.3)", borderTop: "2px solid #070a12", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> : <><Plus size={16} /> Add Skill</>}
              </button>
              {!isAddSkillMode && (
                <button className="finish-btn" onClick={handleFinish} disabled={skills.length === 0}>
                  Finish & Go to Dashboard <ArrowRight size={15} />
                </button>
              )}
            </div>

            <div style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 20, padding: "28px" }}>
              <h3 style={{ fontFamily: "'Times New Roman',Times,serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 6 }}>Skills Added</h3>
              <p style={{ fontSize: "0.8rem", color: "rgba(148,163,184,0.45)", marginBottom: 20, fontFamily: "'Times New Roman',Times,serif" }}>
                {skills.length === 0 ? "Your verified skills will appear here." : `${skills.length} skill${skills.length > 1 ? "s" : ""} verified`}
              </p>
              {skills.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", border: "1px dashed rgba(30,41,59,0.8)", borderRadius: 12 }}>
                  <Code size={28} color="rgba(148,163,184,0.2)" style={{ margin: "0 auto 12px" }} />
                  <p style={{ fontSize: "0.84rem", color: "rgba(148,163,184,0.35)", fontFamily: "'Times New Roman',Times,serif" }}>No skills yet</p>
                </div>
              ) : skills.map((s, i) => <SkillBadge key={i} skill={s} />)}
              {isAddSkillMode && skills.length > 0 && (
                <button style={{ width: "100%", marginTop: 16, padding: "12px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#0f766e,#2dd4bf)", color: "#070a12", fontWeight: 700, fontFamily: "'Times New Roman',Times,serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                  onClick={() => navigate("/portfolio")}>
                  Back to Portfolio <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}