import "../index.css";
import Navbar from "../components/layout/Navbar";
import "./styles/NewDashboard.css";
import "../secondary-pages.css";
import Footer from "../components/layout/Footer";
import { Calendar, Users, Wallet, Star, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Discover and compare trusted vendors",
  "Transparent pricing with no hidden fees",
  "Secure escrow payment protection",
  "Real-time budget tracking and alerts",
  "Guest and RSVP management made easy",
  "AI-powered planning assistance",
];

export default function Clients() {
  return (
    <div>
      <Navbar />
      <div className="planner-page">
        <section className="planner-hero">
          <div className="container">
            <div className="planner-hero-grid">
              <div className="planner-content">
                <span className="planner-badge">
                  🎉 Built For Event Hosts
                </span>
                <h1 className="planner-title">
                  Plan Your Perfect{" "}
                  <span className="hero-gradient-text">Celebration</span>
                </h1>
                <p className="planner-text">
                  OMA gives you everything you need to bring your event vision
                  to life — from discovering venues and hiring trusted vendors
                  to managing budgets, timelines, and payments in real time.
                </p>
                <div className="planner-actions">
                  <Link to="/signup" className="btn-primary">
                    Start Planning <ArrowRight size={18} />
                  </Link>
                  <Link to="/vendors" className="btn-secondary">
                    Browse Vendors
                  </Link>
                </div>
                <div className="planner-stats">
                  <div className="planner-stat">
                    <h3>12K+</h3>
                    <p>Events Planned</p>
                  </div>
                  <div className="planner-stat">
                    <h3>5K+</h3>
                    <p>Vendors Available</p>
                  </div>
                  <div className="planner-stat">
                    <h3>4.9</h3>
                    <p>Client Rating</p>
                  </div>
                </div>
              </div>
              <div className="planner-visual">
                <div className="planner-card glass">
                  <div className="planner-card-top">
                    <h3>OMA Client Dashboard</h3>
                    <span className="planner-live">LIVE</span>
                  </div>
                  <div className="planner-metrics">
                    <div className="planner-metric">
                      <p>Events in Planning</p>
                      <h2>12</h2>
                    </div>
                    <div className="planner-metric">
                      <p>Vendors Booked</p>
                      <h2>54</h2>
                    </div>
                    <div className="planner-metric">
                      <p>Budget Managed</p>
                      <h2>$18K</h2>
                    </div>
                    <div className="planner-metric">
                      <p>Experience</p>
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
              <span className="section-eyebrow">WHY CLIENTS CHOOSE OMA</span>
              <h2 className="section-title">Stress-Free Event Planning</h2>
              <p className="section-desc">
                From idea to execution, OMA provides everything you need to create
                unforgettable celebrations with total confidence.
              </p>
            </div>
            <div className="features-grid">
              {benefits.map((item, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-icon-box">
                    <CheckCircle2 className="planner-icon" />
                  </div>
                  <h3 className="feature-title" style={{ fontSize: "1.1rem" }}>{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-glow"></div>
          <div className="cta-content">
            <span className="cta-eyebrow">START YOUR JOURNEY</span>
            <h2 className="cta-title">
              Your Dream Event Is{" "}
              <span className="cta-gradient">One Click Away</span>
            </h2>
            <p className="cta-desc">
              Join thousands of clients who trust OMA to plan their most
              important moments with clarity and confidence.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn-primary">
                <Sparkles size={18} /> Get Started Free
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View Plans
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
