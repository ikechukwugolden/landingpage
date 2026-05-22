import "./styles/NewDashboard.css";
import { Sparkles, Brain, BarChart, Zap } from "lucide-react";

export default function Omapro() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>OMA Pro</h1>
        <p>
          The AI-powered operating layer for elite event planners, vendors, and enterprise teams.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <Sparkles size={30} />
          <h2>AI Automation</h2>
          <p>Eliminate repetitive planning work with intelligent workflows that execute in seconds.</p>
        </div>

        <div className="stat-box">
          <Brain size={30} />
          <h2>Predictive Intelligence</h2>
          <p>Forecast budgets, attendance, vendor demand, and event outcomes before they happen.</p>
        </div>

        <div className="stat-box">
          <BarChart size={30} />
          <h2>Live Analytics</h2>
          <p>Track performance, spending, and vendor activity in real time across every event.</p>
        </div>

        <div className="stat-box">
          <Zap size={30} />
          <h2>Instant Execution</h2>
          <p>Turn plans into action instantly — from booking to coordination to payment flows.</p>
        </div>
      </div>

      <div className="dashboard-card">
        <h3>The Intelligence Layer for the Event Industry</h3>
        <p>
          OMA Pro transforms fragmented event operations into a unified AI system.
          It connects planners, vendors, and venues through automation, predictive insights,
          and enterprise-grade infrastructure — turning complexity into seamless execution.
        </p>
      </div>
    </div>
  );
}