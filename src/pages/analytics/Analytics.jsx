import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Calendar, Download } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";
import PieChart from "../../components/charts/PieChart";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";

export default function Analytics() {
  const [events, setEvents] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("all");

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const eventsUnsub = onSnapshot(
      query(collection(db, "events"), where("userId", "==", uid), orderBy("createdAt", "desc")),
      (snap) => { setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() }))); setLoading(false); }
    );

    const expensesUnsub = onSnapshot(
      query(collection(db, "expenses"), where("userId", "==", uid)),
      (snap) => setExpenses(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => { eventsUnsub(); expensesUnsub(); };
  }, []);

  const totalEvents = events.length;
  const completedEvents = events.filter((e) => e.status === "completed").length;
  const totalBudget = events.reduce((s, e) => s + (Number(e.budget) || 0), 0);
  const totalSpent = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const avgBudget = totalEvents > 0 ? totalBudget / totalEvents : 0;
  const budgetVariance = totalBudget - totalSpent;

  const eventTypeData = {};
  events.forEach((e) => {
    const type = e.eventType || "other";
    eventTypeData[type] = (eventTypeData[type] || 0) + 1;
  });
  const pieData = Object.entries(eventTypeData).map(([label, value]) => ({ label: label.charAt(0).toUpperCase() + label.slice(1), value }));

  const categoryTotals = {};
  expenses.forEach((e) => {
    const cat = e.category || "Other";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (Number(e.amount) || 0);
  });
  const barData = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, value]) => ({ label, value }));

  const monthlyData = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = d.toLocaleString("default", { month: "short" });
    const monthEvents = events.filter((e) => {
      const ed = e.date ? new Date(e.date) : null;
      return ed && ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear();
    }).length;
    const monthExpenses = expenses.filter((e) => {
      const ed = e.createdAt?.toDate?.() || new Date();
      return ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear();
    }).reduce((s, e) => s + (Number(e.amount) || 0), 0);
    monthlyData.push({ label: monthStr, value1: monthEvents, value2: monthExpenses / 1000 });
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Analytics</div>
            <h1>Analytics Dashboard</h1>
            <p>Comprehensive insights into your event business performance.</p>
          </div>
          <button style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <Download size={16} /> Export Report
          </button>
        </div>

        {/* Period Filter */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
          {["week", "month", "quarter", "all"].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: "6px 14px", borderRadius: "8px", border: period === p ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: period === p ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.8rem", textTransform: "capitalize" }}>
              {p === "all" ? "All Time" : p}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "1.5rem" }}>
          {[
            { label: "Total Events", value: totalEvents, icon: <Calendar size={20} />, color: "#fbbf24", change: "+12%" },
            { label: "Completed", value: completedEvents, icon: <BarChart3 size={20} />, color: "#22c55e", change: "+8%" },
            { label: "Total Budget", value: `₦${totalBudget.toLocaleString()}`, icon: <DollarSign size={20} />, color: "#3b82f6", change: "+15%" },
            { label: "Total Spent", value: `₦${totalSpent.toLocaleString()}`, icon: <TrendingUp size={20} />, color: "#f97316", change: "+10%" },
            { label: "Budget Variance", value: `₦${budgetVariance.toLocaleString()}`, icon: budgetVariance >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />, color: budgetVariance >= 0 ? "#22c55e" : "#ef4444" },
            { label: "Avg Budget/Event", value: `₦${Math.round(avgBudget).toLocaleString()}`, icon: <DollarSign size={20} />, color: "#8b5cf6" },
          ].map((kpi, i) => (
            <div key={i} className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem" }}>{kpi.label}</span>
                <span style={{ color: kpi.color }}>{kpi.icon}</span>
              </div>
              <h3 style={{ color: "#000", fontSize: "1.3rem" }}>{kpi.value}</h3>
              {kpi.change && <p style={{ color: "#22c55e", fontSize: "0.7rem", marginTop: "4px" }}>{kpi.change} from last period</p>}
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "1.5rem" }}>
          <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
            <PieChart data={pieData.length > 0 ? pieData : [{ label: "No Data", value: 1 }]} title="Event Types" colors={["#fbbf24", "#d97706", "#3b82f6", "#22c55e", "#ef4444", "#8b5cf6"]} />
          </div>
          <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
            <BarChart data={barData.length > 0 ? barData : [{ label: "No Data", value: 1 }]} title="Spending by Category" colors={["#fbbf24"]} />
          </div>
        </div>

        <div className="glass" style={{ padding: "16px", borderRadius: "12px", marginBottom: "1.5rem" }}>
          <LineChart data={monthlyData} title="Events & Spending Trend" lines={[{ key: "value1", stroke: "#fbbf24", label: "Events" }, { key: "value2", stroke: "#3b82f6", label: "Spending (K)" }]} />
        </div>

        {/* Vendor Performance */}
        <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
          <h3 style={{ color: "#fbbf24", marginBottom: "12px" }}>Event Status Breakdown</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {["planning", "in-progress", "completed", "cancelled"].map((status) => {
              const count = events.filter((e) => e.status === status).length;
              const colors = { planning: "#fbbf24", "in-progress": "#3b82f6", completed: "#22c55e", cancelled: "#ef4444" };
              return (
                <div key={status} style={{ textAlign: "center", padding: "16px", borderRadius: "10px", background: `${colors[status]}11` }}>
                  <h3 style={{ color: colors[status], fontSize: "1.5rem" }}>{count}</h3>
                  <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "capitalize" }}>{status.replace("-", " ")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
