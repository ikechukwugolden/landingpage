import "../index.css";
import Navbar from "../components/layout/Navbar";
import "./styles/NewDashboard.css";
import "../secondary-pages.css";
import Footer from "../components/layout/Footer";
import { Building, ShieldCheck, BarChart3, Globe } from "lucide-react";

export default function Enterprise() {
  return (
    <div>
      <Navbar />
      <div className="planner-page">
        <div className="page-header">
          <h1>Enterprise Solutions</h1>
          <p>
            Mission-critical infrastructure for universities, corporations, and global brands running high-scale events across multiple regions.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <Building size={30} />
            <h2>48+</h2>
            <p>Enterprise Organizations Powered</p>
          </div>

          <div className="stat-box">
            <ShieldCheck size={30} />
            <h2>99.9%</h2>
            <p>Secure Event Infrastructure Uptime</p>
          </div>

          <div className="stat-box">
            <BarChart3 size={30} />
            <h2>1.2M+</h2>
            <p>Events Orchestrated Globally</p>
          </div>

          <div className="stat-box">
            <Globe size={30} />
            <h2>22+</h2>
            <p>Countries Connected in Real Time</p>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>The Operating System for Global Event Infrastructure</h3>
          <p>
            OMA Enterprise replaces fragmented event systems with a unified,
            scalable platform designed for high-volume coordination, real-time analytics,
            and automated execution across global teams.
            <br /><br />
            From corporate conferences to university-wide events and international activations,
            OMA ensures every operation is synchronized, secure, and intelligently managed at scale.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>Built for Scale. Designed for Control.</h3>
          <p>
            Enterprise teams use OMA to centralize event operations, enforce compliance,
            streamline vendor coordination, and gain real-time visibility across all events —
            without operational chaos.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}