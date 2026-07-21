import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const positions = [
  { title: "Senior Frontend Engineer", type: "Full-time", location: "Remote / Lagos", department: "Engineering", desc: "Build the next generation of event technology with React, Firebase, and modern web APIs." },
  { title: "Backend Engineer", type: "Full-time", location: "Remote / Lagos", department: "Engineering", desc: "Design and build scalable backend systems for payments, messaging, and AI integration." },
  { title: "Product Designer", type: "Full-time", location: "Remote", department: "Design", desc: "Create beautiful, intuitive interfaces that make event planning effortless." },
  { title: "Growth Marketing Lead", type: "Full-time", location: "Lagos", department: "Marketing", desc: "Drive user acquisition and brand awareness across African markets." },
  { title: "Vendor Relations Manager", type: "Full-time", location: "Lagos / Abuja", department: "Operations", desc: "Onboard and manage vendor relationships across Nigeria and beyond." },
  { title: "AI/ML Engineer", type: "Full-time", location: "Remote", department: "Engineering", desc: "Build and optimize Oma AI for event planning intelligence and recommendations." },
  { title: "Content Writer", type: "Part-time", location: "Remote", department: "Marketing", desc: "Create compelling content about events, planning tips, and industry insights." },
  { title: "Customer Success Lead", type: "Full-time", location: "Lagos", department: "Support", desc: "Ensure our users get maximum value from the OMA Events platform." },
];

const benefits = [
  "Competitive salary", "Remote-first culture", "Health insurance", "Learning budget",
  "Equity options", "Team retreats", "Flexible hours", "Latest tech stack",
];

export default function Careers() {
  return (
    <div style={{ background: "#000", color: "#000", minHeight: "100vh" }}>
      <section style={{ padding: "120px 20px 60px", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "16px" }}>
          Join Our <span style={{ color: "#fbbf24" }}>Team</span>
        </h1>
        <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Help us build the operating system for Africa's event industry. We are looking for passionate people who want to make a real impact.
        </p>
      </section>

      {/* Benefits */}
      <section style={{ padding: "20px 20px 60px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "30px" }}>Why Work at <span style={{ color: "#fbbf24" }}>OMA</span>?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ padding: "16px", borderRadius: "10px", background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", textAlign: "center" }}>
              <span style={{ color: "#fbbf24", fontSize: "0.95rem" }}>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ padding: "20px 20px 60px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "30px" }}>Open Positions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {positions.map((pos, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderRadius: "12px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <h3 style={{ fontSize: "1.05rem", marginBottom: "4px" }}>{pos.title}</h3>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>{pos.desc}</p>
                <div style={{ display: "flex", gap: "12px", marginTop: "8px", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(0,0,0,0.4)", fontSize: "0.8rem" }}><Briefcase size={12} /> {pos.department}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(0,0,0,0.4)", fontSize: "0.8rem" }}><MapPin size={12} /> {pos.location}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(0,0,0,0.4)", fontSize: "0.8rem" }}><Clock size={12} /> {pos.type}</span>
                </div>
              </div>
              <button style={{ padding: "10px 20px", borderRadius: "10px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                Apply <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
