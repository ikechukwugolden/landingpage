import "../index.css";
import Navbar from "../components/layout/Navbar";
import "./styles/NewDashboard.css";
import "../secondary-pages.css";
import Footer from "../components/layout/Footer";
import { Building, ShieldCheck, BarChart3, Globe, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Building size={28} />,
    title: "Multi-Team Management",
    text: "Coordinate across departments, branches, and regions with unified event operations.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Enterprise Security",
    text: "Role-based access, compliance controls, and secure infrastructure for global operations.",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Real-Time Analytics",
    text: "Live dashboards, cross-event reporting, and actionable insights for decision-makers.",
  },
  {
    icon: <Globe size={28} />,
    title: "Global Scale",
    text: "Manage events across multiple countries with localised vendor networks and currencies.",
  },
];

const benefits = [
  "Unlimited events and team members",
  "Custom integrations and API access",
  "Dedicated account manager",
  "White-label event pages",
  "SLA guarantees and priority support",
  "Multi-currency payment processing",
];

export default function Enterprise() {
  return (
    <div>
      <Navbar />
      <div className="planner-page">
        <section className="planner-hero">
          <div className="container">
            <div className="planner-hero-grid">
              <div className="planner-content">
                <span className="planner-badge">
                  🏢 OmaPro Enterprise
                </span>
                <h1 className="planner-title">
                  The Operating System For{" "}
                  <span className="hero-gradient-text">Global Events</span>
                </h1>
                <p className="planner-text">
                  Mission-critical infrastructure for universities, corporations,
                  and brands running high-scale events across multiple regions.
                </p>
                <div className="planner-actions">
                  <Link to="/signup" className="btn-primary">
                    Start Free Trial <ArrowRight size={18} />
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    Contact Sales
                  </Link>
                </div>
                <div className="planner-stats">
                  <div className="planner-stat">
                    <h3>48+</h3>
                    <p>Enterprise Clients</p>
                  </div>
                  <div className="planner-stat">
                    <h3>1.2M+</h3>
                    <p>Events Orchestrated</p>
                  </div>
                  <div className="planner-stat">
                    <h3>22+</h3>
                    <p>Countries Connected</p>
                  </div>
                </div>
              </div>
              <div className="planner-visual">
                <div className="planner-card glass">
                  <div className="planner-card-top">
                    <h3>OMA Enterprise Console</h3>
                    <span className="planner-live">LIVE</span>
                  </div>
                  <div className="planner-metrics">
                    <div className="planner-metric">
                      <p>Organizations</p>
                      <h2>48</h2>
                    </div>
                    <div className="planner-metric">
                      <p>Uptime</p>
                      <h2>99.9%</h2>
                    </div>
                    <div className="planner-metric">
                      <p>Events</p>
                      <h2>1.2M</h2>
                    </div>
                    <div className="planner-metric">
                      <p>Countries</p>
                      <h2>22</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="planner-features section">
          <div className="container">
            <div className="section-intro">
              <span className="section-eyebrow">OMA PRO ENTERPRISE</span>
              <h2 className="section-title">Built for Scale. Designed for Control.</h2>
              <p className="section-desc">
                Enterprise teams use OMA to centralize event operations, enforce compliance,
                and gain real-time visibility across all events — without operational chaos.
              </p>
            </div>
            <div className="features-grid">
              {features.map((item, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon-box">
                    {item.icon}
                  </div>
                  <h3 className="feature-title">{item.title}</h3>
                  <p className="feature-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="split-section">
          <div className="container">
            <div className="split-grid">
              <div>
                <div className="problem-header">
                  <span className="section-eyebrow">ENTERPRISE ECOSYSTEM</span>
                  <h2 className="section-title">Why Enterprises Choose OMA</h2>
                </div>
                <div className="problem-list">
                  {benefits.map((item, index) => (
                    <div className="problem-item" key={index}>
                      <CheckCircle2 size={20} color="#fbbf24" />
                      <span className="problem-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="solution-panel">
                <span className="solution-eyebrow">EVENT-OS</span>
                <h2 className="solution-title">OMA Replaces Fragmented Systems</h2>
                <p className="solution-text">
                  From corporate conferences to university-wide events and international
                  activations, OMA ensures every operation is synchronized, secure, and
                  intelligently managed at scale.
                </p>
                <Link to="/signup" className="btn-primary" style={{ marginTop: "2rem", display: "inline-flex" }}>
                  <Sparkles size={18} /> Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-glow"></div>
          <div className="cta-content">
            <span className="cta-eyebrow">THE FUTURE OF ENTERPRISE EVENTS</span>
            <h2 className="cta-title">
              Power Your Global Events With{" "}
              <span className="cta-gradient">OMA</span>
            </h2>
            <p className="cta-desc">
              From idea to execution to payment — everything connected in one
              intelligent platform for global event operations.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn-primary">Get Started</Link>
              <Link to="/contact" className="btn-secondary">Book Demo</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
