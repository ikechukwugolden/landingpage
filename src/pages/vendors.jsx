import "../index.css";
import "../secondary-pages.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  DollarSign,
  Store,
  Star,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Users,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Vendors() {
  const vendorCategories = [
    "Photographers", "Decorators", "Caterers", "DJs & MCs", "Makeup Artists", "Videographers",
  ];

  const features = [
    {
      icon: <TrendingUp size={22} />,
      title: "Business Growth",
      text: "Expand your visibility and attract more clients across the OMA ecosystem.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Verified Reputation",
      text: "Build trust through ratings, reviews, and verified vendor profiles.",
    },
    {
      icon: <CalendarDays size={22} />,
      title: "Smart Booking System",
      text: "Receive bookings, manage schedules, and automate confirmations.",
    },
    {
      icon: <Users size={22} />,
      title: "Client Management",
      text: "Manage customers, conversations, invoices, and event workflows.",
    },
  ];

  const benefits = [
    "Automated booking confirmations",
    "Real-time client communication",
    "Analytics and performance insights",
    "Secure escrow payment protection",
    "AI-powered vendor matching",
    "Multi-category visibility",
  ];

  return (
    <div>
      <Navbar />
      <div className="planner-page">
        <section className="planner-hero">
          <div className="container">
            <div className="planner-hero-grid">
              <div className="planner-content">
                <span className="planner-badge">
                  🛍️ Vendor Marketplace
                </span>
                <h1 className="planner-title">
                  Grow Your Vendor Business With{" "}
                  <span className="hero-gradient-text">OMA Event OS</span>
                </h1>
                <p className="planner-text">
                  OMA helps vendors become discoverable digital brands with
                  bookings, analytics, client management, AI tools, and a
                  verified reputation system.
                </p>
                <div className="planner-actions">
                  <Link to="/signup" className="btn-primary">
                    Become a Vendor <ArrowRight size={18} />
                  </Link>
                  <Link to="/marketplace" className="btn-secondary">
                    Explore Marketplace
                  </Link>
                </div>
                <div className="planner-stats">
                  <div className="planner-stat">
                    <h3>230+</h3>
                    <p>Vendor Profiles</p>
                  </div>
                  <div className="planner-stat">
                    <h3>$240K</h3>
                    <p>Revenue Generated</p>
                  </div>
                  <div className="planner-stat">
                    <h3>4.8★</h3>
                    <p>Vendor Rating</p>
                  </div>
                </div>
              </div>
              <div className="planner-visual">
                <div className="planner-card glass">
                  <div className="planner-card-top">
                    <h3>OMA Vendor Dashboard</h3>
                    <span className="planner-live">LIVE</span>
                  </div>
                  <div className="planner-metrics">
                    <div className="planner-metric">
                      <Store className="planner-icon" />
                      <p>Orders</p>
                      <h2>125</h2>
                    </div>
                    <div className="planner-metric">
                      <DollarSign className="planner-icon" />
                      <p>Monthly Revenue</p>
                      <h2>$18K</h2>
                    </div>
                    <div className="planner-metric">
                      <Briefcase className="planner-icon" />
                      <p>Active Bookings</p>
                      <h2>48</h2>
                    </div>
                    <div className="planner-metric">
                      <Star className="planner-icon" />
                      <p>Reputation</p>
                      <h2>4.9★</h2>
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
              <span className="section-eyebrow">WHY VENDORS CHOOSE OMA</span>
              <h2 className="section-title">More Than A Marketplace</h2>
              <p className="section-desc">
                OMA gives vendors the infrastructure to scale, automate,
                and dominate the modern event industry.
              </p>
            </div>
            <div className="features-grid">
              {features.map((item, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon-box" style={{ width: "60px", height: "60px" }}>
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
                  <span className="section-eyebrow">VENDOR ECOSYSTEM</span>
                  <h2 className="section-title">Thousands Of Event Professionals</h2>
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
                <h2 className="solution-title">Turn Your Talent Into A Scalable Brand</h2>
                <p className="solution-text">
                  Get discovered, receive bookings, grow your reputation,
                  automate workflows, and build a powerful vendor business inside OMA.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "1.5rem" }}>
                  {vendorCategories.map((item, index) => (
                    <span key={index} style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(251,191,36,0.2)",
                      background: "rgba(0,0,0,0.3)",
                      color: "#fbbf24",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-glow"></div>
          <div className="cta-content">
            <span className="cta-eyebrow">OMA EVENT OS</span>
            <h2 className="cta-title">
              Join the{" "}
              <span className="cta-gradient">Vendor Marketplace</span>
            </h2>
            <p className="cta-desc">
              Get discovered by thousands of clients, automate your bookings,
              and grow your business with OMA's intelligent vendor ecosystem.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn-primary">
                <Sparkles size={18} /> Join Marketplace
              </Link>
              <Link to="/marketplace" className="btn-secondary">
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.5rem" }}>
              {["Verified Vendors", "AI Booking System", "Secure Payments"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(0,0,0,0.7)" }}>
                  <CheckCircle2 size={18} color="#fbbf24" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
