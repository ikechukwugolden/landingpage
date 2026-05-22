import "./styles/NewDashboard.css";
import "../index.css";
import "../secondary-pages.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Building2,
  CalendarCheck,
  MapPin,
  Wallet,
  Star,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function Venues() {
  const venueFeatures = [
    {
      icon: <CalendarCheck size={28} />,
      title: "Smart Booking System",
      text: "Manage reservations, schedules, availability, and event timelines in real time.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Verified Venues",
      text: "Build trust with verified venue profiles, ratings, and professional branding.",
    },
    {
      icon: <Users size={28} />,
      title: "More Client Reach",
      text: "Connect directly with planners, enterprises, and event hosts across OMA.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Premium Experience",
      text: "Showcase your venue with immersive visuals, AI recommendations, and analytics.",
    },
  ];

  const benefits = [
    "Real-time venue availability",
    "Instant booking management",
    "Venue analytics dashboard",
    "AI-powered client matching",
    "Integrated payments system",
    "Multi-city visibility",
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
                🏛️ Built For Event Venues
              </span>

              <h1 className="planner-title">
                The Future Of{" "}
                <span className="hero-gradient-text">
                  Venue Management
                </span>
              </h1>

              <p className="planner-text">
                OMA helps venues manage bookings, attract more clients,
                increase revenue, and become part of the world’s most
                connected event ecosystem.
              </p>

              <div className="planner-actions">
                <button className="btn-primary">
                  List Your Venue
                </button>

                <button className="btn-secondary">
                  Explore Dashboard
                </button>
              </div>

              {/* STATS */}
              <div className="planner-stats">
                <div className="planner-stat">
                  <h3>120+</h3>
                  <p>Listed Venues</p>
                </div>

                <div className="planner-stat">
                  <h3>87%</h3>
                  <p>Booking Rate</p>
                </div>

                <div className="planner-stat">
                  <h3>35+</h3>
                  <p>Cities Covered</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="planner-visual">
              <div className="planner-card glass">
                <div className="planner-card-top">
                  <h3>OMA Venue Dashboard</h3>

                  <span className="planner-live">
                    LIVE
                  </span>
                </div>

                <div className="planner-metrics">
                  <div className="planner-metric">
                    <p>Total Venues</p>
                    <h2>120</h2>
                  </div>

                  <div className="planner-metric">
                    <p>Revenue</p>
                    <h2>$420K</h2>
                  </div>

                  <div className="planner-metric">
                    <p>Bookings</p>
                    <h2>1.2K</h2>
                  </div>

                  <div className="planner-metric">
                    <p>Clients</p>
                    <h2>480</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="planner-features section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-box">
              <Building2 size={30} />
              <h2>120</h2>
              <p>Listed Venues</p>
            </div>

            <div className="stat-box">
              <CalendarCheck size={30} />
              <h2>87%</h2>
              <p>Booking Rate</p>
            </div>

            <div className="stat-box">
              <MapPin size={30} />
              <h2>35</h2>
              <p>Cities Covered</p>
            </div>

            <div className="stat-box">
              <Wallet size={30} />
              <h2>$420K</h2>
              <p>Venue Revenue</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="planner-features section">
        <div className="container">
          <div className="section-intro">
            <span className="section-eyebrow">
              WHY VENUES CHOOSE OMA
            </span>

            <h2 className="section-title">
              Everything Needed To Grow Venue Revenue
            </h2>

            <p className="section-desc">
              OMA transforms venues into digital-first businesses with
              bookings, visibility, analytics, and automation.
            </p>
          </div>

          <div className="features-grid">
            {venueFeatures.map((item, index) => (
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
                  POWERFUL VENUE ECOSYSTEM
                </span>

                <h2 className="section-title">
                  Why Venues Grow Faster On OMA
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
                AIRBNB FOR EVENTS
              </span>

              <h2 className="solution-title">
                OMA Makes Venues Discoverable
              </h2>

              <p className="solution-text">
                From luxury halls to outdoor event spaces,
                OMA connects venues directly with planners,
                enterprises, and event hosts searching for
                the perfect experience.
              </p>

              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div className="problem-item">
                  <Clock3 size={18} color="#fbbf24" />
                  <span className="problem-text">
                    Real-time availability tracking
                  </span>
                </div>

                <div className="problem-item">
                  <Star size={18} color="#fbbf24" />
                  <span className="problem-text">
                    Verified reviews & ratings
                  </span>
                </div>

                <div className="problem-item">
                  <Wallet size={18} color="#fbbf24" />
                  <span className="problem-text">
                    Secure payments & invoices
                  </span>
                </div>
              </div>

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
            THE FUTURE OF VENUES
          </span>

          <h2 className="cta-title">
            Turn Your Venue Into A{" "}
            <span className="cta-gradient">
              Global Event Destination
            </span>
          </h2>

          <p className="cta-desc">
            OMA gives venues the infrastructure to scale bookings,
            attract premium clients, and dominate the event industry.
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