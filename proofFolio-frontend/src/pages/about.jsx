// src/pages/AboutPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Shield, Zap, Eye, Users, BadgeCheck, Code,
  Link as LinkIcon, BarChart2, ArrowRight, Github, Mail
} from "lucide-react";

const TNR = "'Times New Roman', Times, serif";

export default function AboutPage() {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    // Intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisible(prev => ({ ...prev, [e.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-id]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const anim = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#070a12", color: "#f8fafc", fontFamily: TNR }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse  { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.05)} }
        @keyframes spin   { to{transform:rotate(360deg)} }

        .hero-title {
          font-family: 'Times New Roman',Times,serif;
          font-weight: 700;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #f8fafc;
        }
        .hero-title .teal { color: #2dd4bf; }
        .hero-title .dim  { color: rgba(148,163,184,0.35); }

        .feature-card {
          padding: 28px 26px; border-radius: 18px;
          border: 1px solid rgba(30,41,59,0.8);
          background: rgba(15,23,42,0.6);
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(45,212,191,0.3);
          box-shadow: 0 16px 40px rgba(0,0,0,0.3), 0 0 20px rgba(45,212,191,0.05);
        }

        .step-card {
          padding: 32px 28px; border-radius: 18px;
          border: 1px solid rgba(30,41,59,0.8);
          background: rgba(11,17,28,0.7);
          position: relative; overflow: hidden;
          transition: transform 0.25s, border-color 0.25s;
        }
        .step-card:hover {
          transform: translateY(-4px);
          border-color: rgba(45,212,191,0.25);
        }

        .stat-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px; border-radius: 99px;
          background: rgba(45,212,191,0.07);
          border: 1px solid rgba(45,212,191,0.18);
          font-family: 'Times New Roman',Times,serif;
          font-size: 0.85rem; color: #2dd4bf;
        }

        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 34px; border-radius: 12px;
          background: linear-gradient(135deg,#0f766e,#2dd4bf);
          color: #070a12; font-family: 'Times New Roman',Times,serif;
          font-weight: 700; font-size: 0.95rem; text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 4px 24px rgba(45,212,191,0.25);
        }
        .cta-btn:hover { opacity: 0.88; transform: translateY(-2px); }

        .divider {
          height: 1px; background: linear-gradient(90deg,transparent,rgba(45,212,191,0.15),transparent);
          margin: 0;
        }
      `}</style>

      {/* Dot grid */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(45,212,191,0.03) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 0 }} />

      <Navbar />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "140px 24px 100px", textAlign: "center", overflow: "hidden", zIndex: 1 }}>
        {/* Glow */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 900, height: 500, background: "radial-gradient(ellipse at 50% 0%,rgba(45,212,191,0.09) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 99, border: "1px solid rgba(45,212,191,0.2)", background: "rgba(45,212,191,0.05)", fontSize: "0.75rem", color: "#2dd4bf", fontFamily: TNR, marginBottom: 36, animation: "fadeUp 0.6s ease both" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2dd4bf", boxShadow: "0 0 8px #2dd4bf", animation: "pulse 2s ease infinite" }} />
            Skill Evidence Platform · v1.0
          </div>

          <h1 className="hero-title" style={{ marginBottom: 28, animation: "fadeUp 0.6s ease 0.1s both" }}>
            Proof over<br />
            <span className="teal">promises</span>.
          </h1>

          <p style={{ fontSize: "1.1rem", color: "rgba(148,163,184,0.72)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 48px", fontFamily: TNR, animation: "fadeUp 0.6s ease 0.2s both" }}>
            ProofFolio was built for developers who are tired of listing skills that no one believes. We replace claims with evidence — structured, verifiable, and impossible to fake.
          </p>

          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, animation: "fadeUp 0.6s ease 0.3s both" }}>
            {["5+ Skills Tracked", "GitHub Verified", "Evidence Scored"].map(t => (
              <span key={t} className="stat-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MISSION ─────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", zIndex: 1, position: "relative" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>

          <div data-id="mission" style={anim("mission")}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2dd4bf", fontWeight: 700, marginBottom: 12, fontFamily: TNR }}>Our Mission</p>
            <h2 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", letterSpacing: "-0.02em", color: "#f1f5f9", lineHeight: 1.15, marginBottom: 24 }}>
              Make skill credibility<br />
              <span style={{ color: "#2dd4bf", fontStyle: "italic" }}>transparent</span>.
            </h2>
            <p style={{ fontSize: "0.97rem", color: "rgba(148,163,184,0.7)", lineHeight: 1.85, fontFamily: TNR, marginBottom: 20 }}>
              Every developer who has put in real work deserves to be recognized for it — not just those who wrote the best-formatted resume. ProofFolio gives you a structured way to show exactly what you've built and exactly how good you are at it.
            </p>
            <p style={{ fontSize: "0.97rem", color: "rgba(148,163,184,0.7)", lineHeight: 1.85, fontFamily: TNR }}>
              We don't match buzzwords. We evaluate real artifacts. Each skill gets its own container with linked GitHub repositories, evidence scores, and verifiable proof.
            </p>
          </div>

          {/* Visual block */}
          <div data-id="mission-vis" style={{ ...anim("mission-vis", 150) }}>
            <div style={{ padding: "36px", borderRadius: 20, background: "rgba(15,23,42,0.7)", border: "1px solid rgba(30,41,59,0.8)", position: "relative" }}>
              {/* Glow dot */}
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(45,212,191,0.06)", filter: "blur(20px)" }} />

              {[
                { skill: "React.js", score: 87, level: "Advanced", color: "#2dd4bf" },
                { skill: "Node.js", score: 72, level: "Intermediate", color: "#60a5fa" },
                { skill: "Docker", score: 54, level: "Beginner", color: "#fbbf24" },
              ].map(({ skill, score, level, color }, i) => (
                <div key={skill} style={{ marginBottom: i < 2 ? 20 : 0, padding: "16px 18px", borderRadius: 12, background: "rgba(7,10,18,0.6)", border: "1px solid rgba(30,41,59,0.8)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <p style={{ fontFamily: TNR, fontWeight: 700, fontSize: "0.95rem", color: "#f1f5f9" }}>{skill}</p>
                      <span style={{ fontSize: "0.65rem", background: `${color}18`, color, padding: "2px 8px", borderRadius: 99, fontFamily: TNR, letterSpacing: "0.04em", textTransform: "uppercase" }}>{level}</span>
                    </div>
                    <span style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.3rem", color }}>{score}</span>
                  </div>
                  <div style={{ height: 3, background: "rgba(30,41,59,0.8)", borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${score}%`, borderRadius: 99, background: `linear-gradient(90deg,${color}88,${color})`, boxShadow: `0 0 6px ${color}66` }} />
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(45,212,191,0.06)", border: "1px solid rgba(45,212,191,0.15)", display: "flex", alignItems: "center", gap: 10 }}>
                <BadgeCheck size={16} color="#2dd4bf" />
                <span style={{ fontSize: "0.8rem", color: "rgba(148,163,184,0.7)", fontFamily: TNR }}>All skills verified via GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", zIndex: 1, position: "relative", background: "rgba(15,23,42,0.25)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div data-id="how-title" style={{ ...anim("how-title"), textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2dd4bf", fontWeight: 700, marginBottom: 12, fontFamily: TNR }}>How It Works</p>
            <h2 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", color: "#f1f5f9" }}>
              Three steps to structured proof.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              { icon: Code, step: "01", title: "Add Your Skills", desc: "Define the technical skills you want to showcase. Name them, set your level, and start building your evidence stack." },
              { icon: LinkIcon, step: "02", title: "Attach GitHub Proof", desc: "Link real GitHub repositories to each skill. ProofFolio verifies the repo exists and scores your evidence strength automatically." },
              { icon: BarChart2, step: "03", title: "Get Your Score", desc: "Each skill receives a structured evidence strength score out of 100. The more proof you add, the stronger your credibility." },
            ].map(({ icon: Icon, step, title, desc }, i) => (
              <div key={step} data-id={`step-${i}`} style={{ ...anim(`step-${i}`, i * 100) }} className="step-card">
                <div style={{ position: "absolute", top: 16, right: 20, fontFamily: TNR, fontWeight: 700, fontSize: "3.5rem", color: "rgba(45,212,191,0.04)", lineHeight: 1, letterSpacing: "-0.04em" }}>{step}</div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(45,212,191,0.12),rgba(15,118,110,0.15))", border: "1px solid rgba(45,212,191,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={22} color="#2dd4bf" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "1.1rem", color: "#f1f5f9", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(148,163,184,0.68)", lineHeight: 1.75, fontFamily: TNR }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── WHY ProofFolio ────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", zIndex: 1, position: "relative" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div data-id="why-title" style={{ ...anim("why-title"), textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2dd4bf", fontWeight: 700, marginBottom: 12, fontFamily: TNR }}>Why ProofFolio</p>
            <h2 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", color: "#f1f5f9" }}>
              Built different. On purpose.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 18 }}>
            {[
              { icon: Shield, title: "Not keyword-based", desc: "We evaluate real artifacts attached to each skill. No buzzword matching, no formatting tricks." },
              { icon: Zap, title: "Instant clarity", desc: "Hiring managers see depth and verified evidence at a glance, not just polished templates." },
              { icon: Eye, title: "Structured containers", desc: "Each skill is a self-contained unit with linked, verifiable GitHub proof." },
              { icon: Users, title: "Built for engineers", desc: "Designed for developers who prefer showing over telling. Real repos. Real scores." },
              { icon: BadgeCheck, title: "Evidence scored", desc: "Every skill gets a score out of 100 based on the quality and quantity of proof attached." },
              { icon: Github, title: "GitHub verified", desc: "All proof links are validated against real GitHub repositories, so nothing is fake." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} data-id={`feat-${i}`} style={{ ...anim(`feat-${i}`, i * 60) }} className="feature-card">
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(45,212,191,0.08)", border: "1px solid rgba(45,212,191,0.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={19} color="#2dd4bf" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "0.98rem", color: "#f1f5f9", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: "0.84rem", color: "rgba(148,163,184,0.65)", lineHeight: 1.7, fontFamily: TNR }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── PROBLEM WE SOLVE ────────────────────────────────── */}
      <section style={{ padding: "100px 24px", zIndex: 1, position: "relative", background: "rgba(15,23,42,0.25)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div data-id="prob-title" style={{ ...anim("prob-title"), textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2dd4bf", fontWeight: 700, marginBottom: 12, fontFamily: TNR }}>The Problem</p>
            <h2 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.6rem)", letterSpacing: "-0.02em", color: "#f1f5f9" }}>
              Resumes list skills.<br />
              <span style={{ color: "#2dd4bf", fontStyle: "italic" }}>They don't prove them.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              { skill: "Java · 3 years", proof: "12 repos, 4 production APIs, Spring Boot certified" },
              { skill: "Docker · Intermediate", proof: "8 containerized projects, CI/CD pipelines configured" },
              { skill: "System Design · Familiar", proof: "3 architecture docs, 2 scalability case studies" },
            ].map(({ skill, proof }, i) => (
              <div key={skill} data-id={`prob-${i}`} style={{ ...anim(`prob-${i}`, i * 100), padding: "28px 24px", borderRadius: 18, border: "1px solid rgba(30,41,59,0.8)", background: "rgba(15,23,42,0.6)" }}>
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: "rgba(148,163,184,0.45)", marginBottom: 8, fontFamily: TNR }}>
                    <span style={{ color: "#f87171", fontSize: "0.8rem" }}>✗</span> Resume says
                  </div>
                  <p style={{ fontFamily: TNR, fontSize: "0.95rem", color: "#e2e8f0", fontWeight: 600 }}>{skill}</p>
                </div>
                <div style={{ padding: "16px", borderRadius: 10, background: "rgba(45,212,191,0.04)", border: "1px solid rgba(45,212,191,0.12)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: "rgba(148,163,184,0.45)", marginBottom: 8, fontFamily: TNR }}>
                    <span style={{ color: "#4ade80", fontSize: "0.8rem" }}>✓</span> ProofFolio shows
                  </div>
                  <p style={{ fontSize: "0.86rem", color: "rgba(148,163,184,0.78)", lineHeight: 1.65, fontFamily: TNR }}>{proof}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: "100px 24px", zIndex: 1, position: "relative", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }} data-id="cta">
          <div style={anim("cta")}>
            {/* Pulsing badge */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 32 }}>
              <div style={{ position: "absolute", inset: -10, borderRadius: "50%", border: "1px solid rgba(45,212,191,0.15)", animation: "pulse 3s ease infinite" }} />
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: "linear-gradient(135deg,#0f766e,#2dd4bf)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BadgeCheck size={28} color="#fff" />
              </div>
            </div>

            <h2 style={{ fontFamily: TNR, fontWeight: 700, fontSize: "clamp(2rem,4.5vw,3.2rem)", letterSpacing: "-0.02em", color: "#f1f5f9", lineHeight: 1.15, marginBottom: 18 }}>
              Your skills <span style={{ color: "#2dd4bf", fontStyle: "italic" }}>deserve</span> proof.
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(148,163,184,0.65)", marginBottom: 44, lineHeight: 1.8, fontFamily: TNR }}>
              Stop listing. Start proving. Build a portfolio that shows exactly what you can do — with real code, real repos, and real scores.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link to="/add-skill" className="cta-btn">
                Add Your First Skill <ArrowRight size={17} />
              </Link>
              <Link to="/portfolio" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "13px 28px", borderRadius: 12,
                border: "1px solid rgba(45,212,191,0.25)",
                background: "rgba(45,212,191,0.05)",
                color: "rgba(148,163,184,0.8)", fontFamily: TNR,
                fontSize: "0.95rem", textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.5)"; e.currentTarget.style.color = "#2dd4bf"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(45,212,191,0.25)"; e.currentTarget.style.color = "rgba(148,163,184,0.8)"; }}
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="divider" />
      <footer style={{ padding: "28px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <p style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.3)", fontFamily: TNR }}>
            © {new Date().getFullYear()} ProofFolio · Skill Evidence Platform
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Mail, href: "mailto:hello@ProofFolio.io" },
            ].map(({ icon: Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" style={{ color: "rgba(148,163,184,0.3)", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#2dd4bf"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(148,163,184,0.3)"}
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}