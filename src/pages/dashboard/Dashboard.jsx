import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Loader, LogOut, Home } from "lucide-react";

import { auth } from "../../firebase/firebase";
import DashboardLayout from "../../components/layout/DashboardLayout";
import FloatingOmaAi from "../../components/ui/FloatingOmaAi";
import WeeklyAnalysis from "../../components/dashboard/WeeklyAnalysis";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import PieChart from "../../components/charts/PieChart";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import { useRealTimeStats } from "../../hooks/useFirestoreData";
import "../styles/NewDashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { totalEvents, bookings, revenue, loading } = useRealTimeStats();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Mock data for charts - replace with real Firestore data
  const eventTypeData = [
    { label: "Weddings", value: totalEvents * 0.4 },
    { label: "Birthdays", value: totalEvents * 0.35 },
    { label: "Corporate", value: totalEvents * 0.25 },
  ];

  const topVendorsData = [
    { label: "Venue Pro", value: 820 },
    { label: "Photo Studios", value: 760 },
    { label: "Catering Plus", value: 690 },
    { label: "Decoration Co", value: 640 },
    { label: "Music & DJ", value: 580 },
  ];

  const revenueData = [
    { label: "Mon", value1: 40, value2: 24 },
    { label: "Tue", value1: 35, value2: 28 },
    { label: "Wed", value1: 45, value2: 22 },
    { label: "Thu", value1: 50, value2: 26 },
    { label: "Fri", value1: 60, value2: 30 },
    { label: "Sat", value1: 55, value2: 28 },
  ];

  return (
    <DashboardLayout>
      <div className="new-dashboard-page">
        {/* Header */}
        <div className="dashboard-header-new">
          <div className="header-welcome">
            <h1>Welcome back! 👋</h1>
            <p>Here's what's happening in your event business today.</p>
          </div>
          <div className="header-actions">
            <Link to="/" className="header-btn btn-secondary">
              <Home size={18} />
              Back Home
            </Link>
            <button onClick={handleLogout} className="header-btn btn-primary">
              <LogOut size={18} />
              Log Out
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="overview-section">
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon events-icon">
                <span>📅</span>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Events</p>
                <h3 className="stat-value">
                  {loading ? <Loader size={20} className="spinner" /> : totalEvents}
                </h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon bookings-icon">
                <span>🎫</span>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Bookings</p>
                <h3 className="stat-value">
                  {loading ? <Loader size={20} className="spinner" /> : bookings}
                </h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue-icon">
                <span>💰</span>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Revenue</p>
                <h3 className="stat-value">
                  {loading ? (
                    <Loader size={20} className="spinner" />
                  ) : (
                    `₦${revenue.toLocaleString()}`
                  )}
                </h3>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending-icon">
                <span>⏳</span>
              </div>
              <div className="stat-content">
                <p className="stat-label">Pending</p>
                <h3 className="stat-value">
                  {loading ? <Loader size={20} className="spinner" /> : "0"}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="analytics-section">
          <div className="analytics-row">
            {/* Event Types Pie Chart */}
            <div className="chart-card event-types-card">
              <PieChart
                data={eventTypeData}
                title="Event Types Distribution"
                colors={["#fbbf24", "#d97706", "#000000"]}
              />
            </div>

            {/* Top Vendors Bar Chart */}
            <div className="chart-card top-vendors-card">
              <BarChart
                data={topVendorsData}
                title="Top Vendors by Bookings"
                colors={["#fbbf24"]}
              />
            </div>
          </div>

          <div className="dashboard-bottom-grid">
            <div className="dashboard-left-panel">
              <WeeklyAnalysis />
            </div>

            <div className="dashboard-right-panel">
              <div className="chart-card revenue-trend-card">
                <LineChart
                  data={revenueData}
                  title="Revenue vs Expenses (Last 6 Days)"
                  lines={[
                    { key: "value1", stroke: "#fbbf24", label: "Revenue" },
                    { key: "value2", stroke: "#000000", label: "Expenses" },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="dashboard-section">
          <NotificationsWidget />
        </div>
      </div>

      <FloatingOmaAi />
    </DashboardLayout>
  );
}
