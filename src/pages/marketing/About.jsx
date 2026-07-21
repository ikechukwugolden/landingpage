import { Link } from "react-router-dom";
import { ArrowRight, Crown, Target, Heart, Users, Globe, Shield, Sparkles } from "lucide-react";

const team = [
  { name: "OMA Vision", role: "Founder & CEO", bio: "Building Africa's event operating system." },
  { name: "Tech Team", role: "Engineering", bio: "Crafting the infrastructure for seamless events." },
  { name: "Growth Team", role: "Marketing", bio: "Connecting event professionals across Africa." },
];

const values = [
  { icon: <Shield size={24} />, title: "Trust First", text: "Every vendor is verified. Every payment is protected. Trust is the foundation of everything we build." },
  { icon: <Heart size={24} />, title: "Built for Africa", text: "Designed for African event culture, payment systems, and the way people actually celebrate." },
  { icon: <Users size={24} />, title: "Community Driven", text: "We grow with our users. Every feature is built from real feedback from planners, vendors, and clients." },
  { icon: <Sparkles size={24} />, title: "Innovation", text: "AI-powered automation, escrow payments, and smart tools that redefine event planning." },
];

const milestones = [
  { year: "2025", event: "OMA Events Founded", desc: "Vision to build Africa's first Event-OS" },
  { year: "2025", event: "MVP Launch", desc: "First version with planning, marketplace, and AI" },
  { year: "2026", event: "Full Platform", desc: "OmaPay, Community, Enterprise, and Oma Cloud" },
  { year: "2027", event: "Pan-Africa Expansion", desc: "Operating across 10+ African countries" },
];

export default function About() {
  return (
    <div style={{ background: "#000", color: "#000", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "120px 20px 60px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "20px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24", fontSize: "0.85rem", marginBottom: "24px" }}>
          <Crown size={16} /> About OMA Events
        </div>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
          Africa's Event <span style={{ color: "#fbbf24" }}>Operating System</span>
        </h1>
        <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1.15rem", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
          OMA EVENTS is building the digital infrastructure for Africa's event industry. We combine planning software, vendor discovery, payment infrastructure, and AI-powered automation into one platform.
        </p>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div style={{ padding: "30px", borderRadius: "16px", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)" }}>
            <Target size={32} style={{ color: "#fbbf24", marginBottom: "16px" }} />
            <h2 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Our Mission</h2>
            <p style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.7 }}>
              To make event planning structured, transparent, and accessible for every African. We eliminate chaos, eliminate vendor fraud, and put the power of professional event management in everyone's hands.
            </p>
          </div>
          <div style={{ padding: "30px", borderRadius: "16px", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)" }}>
            <Globe size={32} style={{ color: "#fbbf24", marginBottom: "16px" }} />
            <h2 style={{ fontSize: "1.5rem", marginBottom: "12px" }}>Our Vision</h2>
            <p style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.7 }}>
              To become the operating system for Africa's entire event industry — the default platform where every event is planned, managed, and executed from idea to celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "40px" }}>Our <span style={{ color: "#fbbf24" }}>Core Values</span></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {values.map((v, i) => (
            <div key={i} style={{ padding: "24px", borderRadius: "12px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ color: "#fbbf24", marginBottom: "12px" }}>{v.icon}</div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{v.title}</h3>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.9rem", lineHeight: 1.6 }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "60px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "40px" }}>Our <span style={{ color: "#fbbf24" }}>Journey</span></h2>
        {milestones.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
            <div style={{ minWidth: "60px", textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(251,191,36,0.15)", border: "2px solid #fbbf24", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24", fontWeight: 700, fontSize: "0.8rem" }}>
                {m.year}
              </div>
            </div>
            <div style={{ paddingTop: "8px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{m.event}</h3>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.9rem" }}>{m.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "16px" }}>Join the <span style={{ color: "#fbbf24" }}>Future</span></h2>
        <p style={{ color: "rgba(0,0,0,0.5)", marginBottom: "24px" }}>Be part of Africa's event revolution.</p>
        <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "12px", background: "linear-gradient(135deg, #fbbf24, #d97706)", color: "#000", fontWeight: 700, fontSize: "1rem" }}>
          Get Started <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
