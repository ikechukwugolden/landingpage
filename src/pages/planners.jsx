import {
  CalendarDays,
  Users,
  BarChart3,
  Wallet,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import "../index.css";
import "../secondary-pages.css";
import Footer from "../components/layout/Footer";

export default function Planners() {
  const features = [
    {
      icon: <CalendarDays className="planner-icon" />,
      title: "Event Management",
      text: "Manage multiple events, schedules, timelines, and workflows from one dashboard.",
    },
    {
      icon: <Users className="planner-icon" />,
      title: "Vendor Coordination",
      text: "Communicate and organize vendors, venues, and clients in one ecosystem.",
    },
    {
      icon: <Wallet className="planner-icon" />,
      title: "Budget Control",
      text: "Track spending, payments, invoices, and event profitability effortlessly.",
    },
    {
      icon: <BarChart3 className="planner-icon" />,
      title: "Analytics & Insights",
      text: "Monitor event performance, customer engagement, and growth metrics.",
    },
  ];

  const benefits = [
    "Manage unlimited events",
    "Real-time vendor communication",
    "Automated planning workflows",
    "Client & booking management",
    "AI-powered event assistance",
    "Centralized event ecosystem",
  ];

  return (
    <div>
      <Navbar />
      <div className="planner-page">
      {/* HERO */}
      <section className="planner-hero">
        <div className="container">
          <div className="planner-hero-grid">
            {/* LEFT */}
            <div className="planner-content">
              <span className="planner-badge">
                🧑‍💼 Built For Event Planners
              </span>

              <h1 className="planner-title">
                The Operating System For{" "}
                <span className="hero-gradient-text">
                  Modern Event Planning
                </span>
              </h1>

              <p className="planner-text">
                OMA helps professional planners manage events, vendors,
                budgets, timelines, bookings, and client communication —
                all in one premium platform.
              </p>

              <div className="planner-actions">
                <button className="btn-primary">
                  Start Planning
                </button>

                <button className="btn-secondary">
                  Explore Dashboard
                </button>
              </div>

              {/* STATS */}
              <div className="planner-stats">
                <div className="planner-stat">
                  <h3>10K+</h3>
                  <p>Events Managed</p>
                </div>

                <div className="planner-stat">
                  <h3>5K+</h3>
                  <p>Verified Vendors</p>
                </div>

                <div className="planner-stat">
                  <h3>99%</h3>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="planner-visual">
              <div className="planner-card glass">
                <div className="planner-card-top">
                  <h3>OMA Planner Dashboard</h3>
                  <span className="planner-live">LIVE</span>
                </div>

                <div className="planner-metrics">
                  <div className="planner-metric">
                    <p>Total Events</p>
                    <h2>124</h2>
                  </div>

                  <div className="planner-metric">
                    <p>Revenue</p>
                    <h2>$48K</h2>
                  </div>

                  <div className="planner-metric">
                    <p>Bookings</p>
                    <h2>87</h2>
                  </div>

                  <div className="planner-metric">
                    <p>Clients</p>
                    <h2>240</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="planner-features section">
        <div className="container">
          <div className="section-intro">
            <span className="section-eyebrow">
              WHY OMA FOR PLANNERS
            </span>

            <h2 className="section-title">
              Everything You Need To Run Events
            </h2>

            <p className="section-desc">
              OMA gives planners a complete infrastructure layer for
              managing the entire event lifecycle.
            </p>
          </div>

          <div className="features-grid">
            {features.map((item, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon-box">
                  {item.icon}
                </div>

                <h3 className="feature-title">
                  {item.title}
                </h3>

                <p className="feature-text">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="split-section">
        <div className="container">
          <div className="split-grid">
            {/* LEFT */}
            <div>
              <div className="problem-header">
                <span className="section-eyebrow">
                  POWERFUL ECOSYSTEM
                </span>

                <h2 className="section-title">
                  Why Event Planners Choose OMA
                </h2>
              </div>

              <div className="problem-list">
                {benefits.map((item, index) => (
                  <div className="problem-item" key={index}>
                    <CheckCircle2
                      size={20}
                      color="#fbbf24"
                    />

                    <span className="problem-text">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="solution-panel">
              <span className="solution-eyebrow">
                EVENT-OS
              </span>

              <h2 className="solution-title">
                OMA Is More Than A Planner App
              </h2>

              <p className="solution-text">
                OMA is a complete Event Operating System connecting
                planners, vendors, venues, clients, enterprises,
                payments, AI, and analytics into one ecosystem.
              </p>

              <button
                className="btn-primary"
                style={{ marginTop: "2rem" }}
              >
                Join OMA
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow"></div>

        <div className="cta-content">
          <span className="cta-eyebrow">
            THE FUTURE OF EVENTS
          </span>

          <h2 className="cta-title">
            Run Your Entire Event Business With{" "}
            <span className="cta-gradient">OMA</span>
          </h2>

          <p className="cta-desc">
            From idea → planning → execution → payment → memory.
            Everything connected in one platform.
          </p>

          <div className="cta-actions">
            <button className="btn-primary">
              Get Started
            </button>

            <button className="btn-secondary">
              Book Demo
            </button>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
}