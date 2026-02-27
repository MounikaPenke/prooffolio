// src/pages/LandingPage.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck, Code, Link as LinkIcon, BarChart2,
  XCircle, CheckCircle, Sparkles, ArrowRight, Shield, Zap, Eye, Users
} from "lucide-react";

export default function LandingPage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#070a12", color: "#f8fafc", fontFamily: "'inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes pulse-ring { 0% { transform:scale(1); opacity:0.4; } 100% { transform:scale(1.6); opacity:0; } }
        .hero-h1 { font-family:'Sora',sans-serif; font-weight:800; font-size:clamp(2.4rem,6vw,4.5rem); line-height:1.08; letter-spacing:-0.04em; color:#f8fafc; }
        .hero-h1 .accent { color:#2dd4bf; }
        .hero-h1 .dim { color:rgba(148,163,184,0.5); }
        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          padding:14px 32px; border-radius:12px;
          background:linear-gradient(135deg,#0f766e,#2dd4bf);
          color:#070a12; font-weight:700; font-size:0.9rem;
          font-family:'inter',sans-serif; text-decoration:none;
          transition:transform 0.2s,box-shadow 0.2s;
          box-shadow:0 4px 24px rgba(45,212,191,0.25);
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(45,212,191,0.35); }
        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 28px; border-radius:12px;
          border:1px solid rgba(45,212,191,0.25);
          background:rgba(45,212,191,0.05);
          color:#94a3b8; font-size:0.9rem; font-family:'inter',sans-serif;
          text-decoration:none; transition:all 0.2s;
        }
        .btn-ghost:hover { border-color:rgba(45,212,191,0.5); color:#2dd4bf; background:rgba(45,212,191,0.08); }
        .section-label { font-size:0.68rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#2dd4bf; margin-bottom:12px; }
        .section-title { font-family:'Sora',sans-serif; font-weight:800; font-size:clamp(1.6rem,3.5vw,2.4rem); letter-spacing:-0.03em; color:#f1f5f9; line-height:1.2; }
        .card-hover { transition:transform 0.25s,border-color 0.25s,box-shadow 0.25s; }
        .card-hover:hover { transform:translateY(-4px); border-color:rgba(45,212,191,0.35) !important; box-shadow:0 16px 48px rgba(0,0,0,0.3),0 0 24px rgba(45,212,191,0.06) !important; }
        .nav-a { font-family:'inter',sans-serif; font-size:0.85rem; color:rgba(148,163,184,0.8); text-decoration:none; transition:color 0.2s; }
        .nav-a:hover { color:#2dd4bf; }
        .grid-bg { position:fixed; inset:0; background-image:radial-gradient(rgba(45,212,191,0.03) 1px,transparent 1px); background-size:32px 32px; pointer-events:none; z-index:0; }
      `}</style>

      <div className="grid-bg" />

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "0 2rem", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(7,10,18,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(45,212,191,0.07)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#2dd4bf,#0f766e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={14} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em", color: "#f8fafc" }}>ProofFolio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {["#problem", "#how", "#about"].map((href, i) => (
            <a key={href} href={href} className="nav-a">{["The Problem", "How It Works", "About"][i]}</a>
          ))}
        </div>
        <Link to="/signup" style={{
          padding: "8px 22px", borderRadius: 10,
          background: "linear-gradient(135deg,#0f766e,#2dd4bf)",
          color: "#070a12", fontWeight: 700, fontSize: "0.82rem",
          fontFamily: "'inter',sans-serif", textDecoration: "none",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => e.target.style.opacity = 0.85}
          onMouseLeave={e => e.target.style.opacity = 1}
        >
          Get Started
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", padding: "120px 24px 100px", textAlign: "center", overflow: "hidden" }}>
        {/* Glow */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 400, background: "radial-gradient(ellipse at 50% 0%,rgba(45,212,191,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 99,
            border: "1px solid rgba(45,212,191,0.25)",
            background: "rgba(45,212,191,0.06)",
            fontSize: "0.75rem", color: "#2dd4bf",
            fontFamily: "'JetBrains Mono',monospace", marginBottom: 32,
            animation: "fadeUp 0.6s ease both",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2dd4bf", boxShadow: "0 0 8px #2dd4bf" }} />
            v1.0 · Skill Evidence Platform
          </div>

          <h1 className="hero-h1" style={{ marginBottom: 28, animation: "fadeUp 0.6s ease 0.1s both" }}>
            Skills without proof<br />
            are just <span className="accent">claims</span>.
          </h1>

          <p style={{
            fontSize: "1.1rem", color: "rgba(148,163,184,0.75)", lineHeight: 1.75,
            maxWidth: 580, margin: "0 auto 48px",
            animation: "fadeUp 0.6s ease 0.2s both",
          }}>
            ProofFolio structures every skill with real evidence — repos, projects, certifications — so recruiters see proof, not promises.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.6s ease 0.3s both" }}>
            <Link to="/signup" className="btn-primary">
              Build Your Proof Profile <ArrowRight size={16} />
            </Link>
            <Link to="/demo" className="btn-ghost">
              View Demo Profile
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <p className="section-label">The Problem</p>
            <h2 className="section-title">Resumes list skills.<br />They don't prove them.</h2>
            <p style={{ marginTop: 16, color: "rgba(148,163,184,0.6)", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.7 }}>
              Every candidate claims proficiency. Few structure evidence behind those claims. ProofFolio changes that.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              { icon: Code, skill: "Java · 3 years", proof: "12 repos, 4 production APIs, Spring Boot certified" },
              { icon: LinkIcon, skill: "Docker · Intermediate", proof: "8 containerized projects, CI/CD pipelines configured" },
              { icon: BarChart2, skill: "System Design · Familiar", proof: "3 architecture docs, 2 scalability case studies" },
            ].map(({ icon: Icon, skill, proof }, i) => (
              <div key={i} className="card-hover" style={{
                padding: "28px 24px", borderRadius: 18,
                border: "1px solid rgba(30,41,59,0.8)",
                background: "rgba(15,23,42,0.6)",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 20,
                  background: "rgba(45,212,191,0.08)",
                  border: "1px solid rgba(45,212,191,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color="#2dd4bf" strokeWidth={1.5} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: "rgba(148,163,184,0.5)", marginBottom: 8 }}>
                    <XCircle size={13} color="#f87171" /> Resume says
                  </div>
                  <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.88rem", color: "#e2e8f0" }}>{skill}</p>
                </div>
                <div style={{ padding: "16px", borderRadius: 10, background: "rgba(45,212,191,0.04)", border: "1px solid rgba(45,212,191,0.12)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: "rgba(148,163,184,0.5)", marginBottom: 8 }}>
                    <CheckCircle size={13} color="#4ade80" /> ProofFolio shows
                  </div>
                  <p style={{ fontSize: "0.84rem", color: "rgba(148,163,184,0.8)", lineHeight: 1.6 }}>{proof}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: "100px 24px", position: "relative", zIndex: 1, background: "rgba(15,23,42,0.3)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ marginBottom: 56, textAlign: "center" }}>
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Three steps to structured proof.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {[
              { icon: Code, step: "01", title: "Add Your Skills", desc: "Define the skills you want to showcase across technical domains." },
              { icon: LinkIcon, step: "02", title: "Attach Proof", desc: "Link GitHub repos, live projects, certifications, and documentation." },
              { icon: BarChart2, step: "03", title: "Get Evidence Score", desc: "Each skill receives a structured evidence strength score." },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="card-hover" style={{
                padding: "32px 28px", borderRadius: 18,
                border: "1px solid rgba(30,41,59,0.8)",
                background: "rgba(11,17,28,0.6)",
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 20, right: 20,
                  fontFamily: "'Sora',sans-serif", fontWeight: 800,
                  fontSize: "3rem", color: "rgba(45,212,191,0.05)",
                  lineHeight: 1, letterSpacing: "-0.04em",
                }}>{step}</div>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                  background: "linear-gradient(135deg,rgba(45,212,191,0.12),rgba(15,118,110,0.15))",
                  border: "1px solid rgba(45,212,191,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} color="#2dd4bf" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#f1f5f9", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: "0.86rem", color: "rgba(148,163,184,0.7)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <p className="section-label">About</p>
            <h2 className="section-title">Built different. On purpose.</h2>
            <p style={{ marginTop: 16, color: "rgba(148,163,184,0.6)", maxWidth: 540, margin: "16px auto 0", lineHeight: 1.7 }}>
              ProofFolio was built to close the gap between what candidates claim and what they can demonstrate. No buzzword matching. Pure structured evidence.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 64 }}>
            {[
              { icon: Shield, title: "Not keyword-based", desc: "We evaluate real artifacts attached to each skill, not resume buzzwords." },
              { icon: Zap, title: "Instant recruiter clarity", desc: "Hiring managers see depth and evidence at a glance, not formatted templates." },
              { icon: Eye, title: "Structured containers", desc: "Each skill is a self-contained unit with linked, verifiable proof." },
              { icon: Users, title: "Built for engineers", desc: "Designed for developers who prefer showing over telling." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-hover" style={{
                padding: "24px 22px", borderRadius: 16,
                border: "1px solid rgba(30,41,59,0.8)",
                background: "rgba(15,23,42,0.5)",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, marginBottom: 16,
                  background: "rgba(45,212,191,0.08)",
                  border: "1px solid rgba(45,212,191,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={18} color="#2dd4bf" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#f1f5f9", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(148,163,184,0.65)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Mission statement */}
          <div style={{
            padding: "40px 48px", borderRadius: 20,
            background: "linear-gradient(135deg,rgba(15,118,110,0.12),rgba(45,212,191,0.06))",
            border: "1px solid rgba(45,212,191,0.2)",
            textAlign: "center",
          }}>
            <BadgeCheck size={32} color="#2dd4bf" style={{ marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#f1f5f9", marginBottom: 12, letterSpacing: "-0.02em" }}>
              Our Mission
            </h3>
            <p style={{ fontSize: "1rem", color: "rgba(148,163,184,0.75)", lineHeight: 1.8, maxWidth: 580, margin: "0 auto" }}>
              To make skill credibility transparent and verifiable — so that every developer who has put in the real work gets recognized for it, not just those who wrote the best resume.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 24px", position: "relative", zIndex: 1, background: "rgba(15,23,42,0.4)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 28 }}>
            <div style={{
              position: "absolute", inset: -8, borderRadius: "50%",
              border: "1px solid rgba(45,212,191,0.2)",
              animation: "pulse-ring 2s ease infinite",
            }} />
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg,#0f766e,#2dd4bf)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={26} color="#fff" />
            </div>
          </div>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", letterSpacing: "-0.03em", color: "#f1f5f9", marginBottom: 16, lineHeight: 1.15 }}>
            Your skills <span style={{ color: "#2dd4bf" }}>deserve</span> proof.
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(148,163,184,0.65)", marginBottom: 40, lineHeight: 1.7 }}>
            Stop listing skills. Start proving them.
          </p>
          <Link to="/signup" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }}>
            Create Your ProofFolio <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(30,41,59,0.6)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.35)", fontFamily: "'JetBrains Mono',monospace" }}>
          © {new Date().getFullYear()} ProofFolio · Skill Evidence Platform
        </p>
      </footer>
    </div>
  );
}