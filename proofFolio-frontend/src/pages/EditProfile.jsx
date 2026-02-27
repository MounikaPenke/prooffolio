// src/pages/EditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { User, Mail, Briefcase, FileText, MapPin, Github, Check, Edit3 } from "lucide-react";

const TNR = "'Times New Roman',Times,serif";

const S = {
  page: { minHeight: "100vh", background: "#070a12", color: "#f8fafc", fontFamily: TNR },
  wrap: { maxWidth: 780, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1 },
  card: { borderRadius: 20, border: "1px solid rgba(30,41,59,0.8)", background: "rgba(15,23,42,0.7)", padding: "32px 36px", marginBottom: 20, backdropFilter: "blur(8px)", transition: "border-color 0.3s" },
  cardActive: { borderColor: "rgba(45,212,191,0.3)", boxShadow: "0 0 28px rgba(45,212,191,0.06)" },
  label: { fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", marginBottom: 6, display: "block", fontFamily: TNR },
  value: { fontSize: "0.95rem", color: "#e2e8f0", padding: "10px 0", borderBottom: "1px solid rgba(30,41,59,0.5)", fontFamily: TNR },
  input: { width: "100%", padding: "11px 16px", background: "rgba(7,10,18,0.8)", border: "1px solid rgba(30,41,59,0.8)", borderRadius: 10, color: "#f1f5f9", fontSize: "0.92rem", fontFamily: TNR, outline: "none", transition: "border-color 0.2s,box-shadow 0.2s", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "11px 16px", background: "rgba(7,10,18,0.8)", border: "1px solid rgba(30,41,59,0.8)", borderRadius: 10, color: "#f1f5f9", fontSize: "0.92rem", fontFamily: TNR, outline: "none", resize: "vertical", minHeight: 100, transition: "border-color 0.2s", boxSizing: "border-box" },
};

function Field({ icon: Icon, label, name, value, editing, type = "text", onChange, isTextarea }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={S.label}>{label}</label>
      {editing ? (
        <div style={{ position: "relative" }}>
          {Icon && <Icon size={15} color="rgba(148,163,184,0.4)" style={{ position: "absolute", left: 14, top: isTextarea ? 14 : "50%", transform: isTextarea ? "none" : "translateY(-50%)", pointerEvents: "none" }} />}
          {isTextarea ? (
            <textarea name={name} value={value} onChange={onChange}
              style={{ ...S.textarea, paddingLeft: Icon ? 40 : 16 }}
              onFocus={e => { e.target.style.borderColor = "rgba(45,212,191,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(45,212,191,0.06)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(30,41,59,0.8)"; e.target.style.boxShadow = "none"; }} />
          ) : (
            <input type={type} name={name} value={value} onChange={onChange}
              style={{ ...S.input, paddingLeft: Icon ? 40 : 16 }}
              onFocus={e => { e.target.style.borderColor = "rgba(45,212,191,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(45,212,191,0.06)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(30,41,59,0.8)"; e.target.style.boxShadow = "none"; }} />
          )}
        </div>
      ) : (
        <p style={{ ...S.value, display: "flex", alignItems: "center", gap: 8 }}>
          {Icon && <Icon size={14} color="rgba(45,212,191,0.5)" strokeWidth={1.5} />}
          <span style={{ color: value ? "#e2e8f0" : "rgba(148,163,184,0.35)", fontStyle: value ? "normal" : "italic" }}>
            {value || "Not set"}
          </span>
        </p>
      )}
    </div>
  );
}

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [editingAccount, setEditingAccount] = useState(false);
  const [editingProfessional, setEditingProfessional] = useState(false);
  const [saved, setSaved] = useState(null);
  const [accountData, setAccountData] = useState({ username: "", email: "" });
  const [profileData, setProfileData] = useState({ headline: "", description: "", location: "", github: "" });

  useEffect(() => { fetchUser(); }, []);

  const fetchUser = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const res = await axios.get(`http://localhost:5000/api/user?email=${email}`);
      setUser(res.data);
      setAccountData({ username: res.data.username || "", email: res.data.email || "" });
      setProfileData({ headline: res.data.headline || "", description: res.data.description || "", location: res.data.location || "", github: res.data.github || "" });
    } catch (err) { console.error(err); }
  };

  const flash = (key) => { setSaved(key); setTimeout(() => setSaved(null), 2500); };

  const saveAccount = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/update-profile", { email: user.email, account: accountData });
      setEditingAccount(false); flash("account"); fetchUser();
    } catch { }
  };

  const saveProfessional = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/update-profile", { email: user.email, profile: profileData });
      setEditingProfessional(false); flash("professional"); fetchUser();
    } catch { }
  };

  if (!user) return (
    <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Navbar />
      <div style={{ color: "rgba(148,163,184,0.5)", fontFamily: TNR }}>Loading…</div>
    </div>
  );

  const initials = user.username?.split(" ").map(w => w[0]).join("").toUpperCase() || "U";

  return (
    <div style={S.page}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes flash{0%,100%{opacity:0;transform:translateY(-4px)}20%,80%{opacity:1;transform:translateY(0)}}
        .saved-toast{animation:flash 2.5s ease both}
        .edit-btn{display:flex;align-items:center;gap:6px;padding:7px 16px;border-radius:8px;border:1px solid rgba(45,212,191,0.3);background:rgba(45,212,191,0.06);color:#2dd4bf;font-size:0.78rem;font-family:'Times New Roman',Times,serif;font-weight:600;cursor:pointer;transition:all 0.2s}
        .edit-btn:hover{background:rgba(45,212,191,0.14);border-color:#2dd4bf}
        .save-btn{display:flex;align-items:center;gap:6px;padding:7px 16px;border-radius:8px;border:none;background:linear-gradient(135deg,#0f766e,#2dd4bf);color:#070a12;font-size:0.78rem;font-family:'Times New Roman',Times,serif;font-weight:700;cursor:pointer;transition:opacity 0.2s}
        .save-btn:hover{opacity:0.88}
      `}</style>

      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(45,212,191,0.03) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 0 }} />

      <Navbar />

      <div style={S.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 48, animation: "fadeUp 0.5s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#0f766e,#134e4a)", border: "1px solid rgba(45,212,191,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontFamily: TNR, fontWeight: 700, color: "#2dd4bf" }}>
              {initials}
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2dd4bf", fontWeight: 600, marginBottom: 4, fontFamily: TNR }}>Edit Profile</p>
              <h1 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.9rem", letterSpacing: "-0.01em", color: "#f8fafc", lineHeight: 1.1 }}>{user.username}</h1>
            </div>
          </div>
          <p style={{ fontSize: "0.88rem", color: "rgba(148,163,184,0.6)", maxWidth: 480, fontFamily: TNR }}>
            Keep your professional information accurate and up to date.
          </p>
        </div>

        {/* Toast */}
        {saved && (
          <div className="saved-toast" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, marginBottom: 20, background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.35)", color: "#2dd4bf", fontSize: "0.82rem", fontFamily: TNR }}>
            <Check size={14} /> Saved successfully
          </div>
        )}

        {/* Account card */}
        <div style={{ ...S.card, ...(editingAccount ? S.cardActive : {}), animation: "fadeUp 0.5s ease 0.1s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(148,163,184,0.4)", marginBottom: 4, fontFamily: TNR }}>Section</p>
              <h2 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9" }}>Account Information</h2>
            </div>
            {!editingAccount
              ? <button className="edit-btn" onClick={() => setEditingAccount(true)}><Edit3 size={12} />Edit</button>
              : <button className="save-btn" onClick={saveAccount}><Check size={12} />Save Changes</button>}
          </div>
          <Field icon={User} label="Full Name" name="username" value={editingAccount ? accountData.username : user.username} editing={editingAccount} onChange={e => setAccountData({ ...accountData, [e.target.name]: e.target.value })} />
          <Field icon={Mail} label="Email Address" name="email" type="email" value={editingAccount ? accountData.email : user.email} editing={editingAccount} onChange={e => setAccountData({ ...accountData, [e.target.name]: e.target.value })} />
        </div>

        {/* Professional card */}
        <div style={{ ...S.card, ...(editingProfessional ? S.cardActive : {}), animation: "fadeUp 0.5s ease 0.2s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(148,163,184,0.4)", marginBottom: 4, fontFamily: TNR }}>Section</p>
              <h2 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9" }}>Professional Details</h2>
            </div>
            {!editingProfessional
              ? <button className="edit-btn" onClick={() => setEditingProfessional(true)}><Edit3 size={12} />Edit</button>
              : <button className="save-btn" onClick={saveProfessional}><Check size={12} />Save Changes</button>}
          </div>
          <Field icon={Briefcase} label="Headline" name="headline" value={editingProfessional ? profileData.headline : user.headline} editing={editingProfessional} onChange={e => setProfileData({ ...profileData, [e.target.name]: e.target.value })} />
          <Field icon={FileText} label="About" name="description" value={editingProfessional ? profileData.description : user.description} editing={editingProfessional} isTextarea onChange={e => setProfileData({ ...profileData, [e.target.name]: e.target.value })} />
          <Field icon={MapPin} label="Location" name="location" value={editingProfessional ? profileData.location : user.location} editing={editingProfessional} onChange={e => setProfileData({ ...profileData, [e.target.name]: e.target.value })} />
          <Field icon={Github} label="GitHub Profile" name="github" value={editingProfessional ? profileData.github : user.github} editing={editingProfessional} onChange={e => setProfileData({ ...profileData, [e.target.name]: e.target.value })} />
        </div>
      </div>
    </div>
  );
}