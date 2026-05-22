import "../index.css";
import Navbar from "../components/layout/Navbar";
import "./styles/NewDashboard.css";
import "../secondary-pages.css";
import Footer from "../components/layout/Footer";
import { Calendar, Users, Wallet, Star } from "lucide-react";

export default function Clients() {
  return (
    <div>
      <Navbar />
      <div className="planner-page">
        <div className="page-header">
          <h1>Clients Dashboard</h1>
          <p>
            Plan, organize, and experience unforgettable events — weddings, birthdays,
            corporate gatherings, and personal celebrations — all in one intelligent platform.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-box">
            <Calendar size={30} />
            <h2>12</h2>
            <p>Active Events in Planning</p>
          </div>

          <div className="stat-box">
            <Users size={30} />
            <h2>54</h2>
            <p>Trusted Vendors Booked</p>
          </div>

          <div className="stat-box">
            <Wallet size={30} />
            <h2>$18K</h2>
            <p>Total Budget Managed</p>
          </div>

          <div className="stat-box">
            <Star size={30} />
            <h2>4.9</h2>
            <p>Client Experience Rating</p>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Your Event Journey, Simplified</h3>
          <p>
            OMA gives you everything you need to bring your vision to life — from discovering
            venues and hiring trusted vendors to managing budgets, timelines, and payments in real time.
            <br /><br />
            No stress. No chaos. Just beautifully executed events powered by intelligent coordination.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>From Idea to Unforgettable Experience</h3>
          <p>
            Whether you're planning a wedding, birthday, or corporate celebration,
            OMA connects you with verified professionals, transparent pricing,
            and seamless execution tools that ensure nothing is missed.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}