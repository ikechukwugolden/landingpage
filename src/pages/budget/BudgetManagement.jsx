import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { DollarSign, Plus, Trash2, Edit3, TrendingUp, TrendingDown, AlertTriangle, Upload } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const categories = [
  "Venue", "Catering", "Decoration", "Photography", "Videography",
  "Music & DJ", "MC/Host", "Transport", "Fashion", "Security",
  "Invitation", "Gifts", "Sound & Lighting", "Florist", "Other",
];

const categoryIcons = {
  Venue: "🏛️", Catering: "🍽️", Decoration: "🎨", Photography: "📸",
  Videography: "🎬", "Music & DJ": "🎵", "MC/Host": "🎤", Transport: "🚗",
  Fashion: "👗", Security: "🛡️", Invitation: "💌", Gifts: "🎁",
  "Sound & Lighting": "🔊", Florist: "💐", Other: "📦",
};

export default function BudgetManagement() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Venue",
    vendor: "",
    status: "pending",
    notes: "",
    dueDate: "",
  });

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const q = query(collection(db, "events"), where("userId", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEvents(list);
      if (list.length > 0 && !selectedEvent) setSelectedEvent(list[0].id);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    const q = query(collection(db, "expenses"), where("eventId", "==", selectedEvent));
    const unsub = onSnapshot(q, (snap) => {
      setExpenses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [selectedEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !selectedEvent) return;
    if (editingExpense) {
      await updateDoc(doc(db, "expenses", editingExpense.id), { ...form, amount: Number(form.amount), updatedAt: serverTimestamp() });
      setEditingExpense(null);
    } else {
      await addDoc(collection(db, "expenses"), {
        ...form,
        amount: Number(form.amount),
        eventId: selectedEvent,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
    }
    setForm({ title: "", amount: "", category: "Venue", vendor: "", status: "pending", notes: "", dueDate: "" });
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await deleteDoc(doc(db, "expenses", id));
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      vendor: expense.vendor || "",
      status: expense.status,
      notes: expense.notes || "",
      dueDate: expense.dueDate || "",
    });
    setShowAdd(true);
  };

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, "expenses", id), { status, updatedAt: serverTimestamp() });
  };

  const currentEvent = events.find((e) => e.id === selectedEvent);
  const totalBudget = Number(currentEvent?.budget) || 0;
  const totalSpent = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalPending = expenses.filter((e) => e.status === "pending").reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalPaid = expenses.filter((e) => e.status === "paid").reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const remaining = totalBudget - totalSpent;
  const budgetPercent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;

  const categoryTotals = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + (Number(e.amount) || 0);
  });

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Budget & Finance</div>
            <h1>Budget Management</h1>
            <p>Track expenses, manage invoices, and stay within budget.</p>
          </div>
          {selectedEvent && (
            <button onClick={() => { setShowAdd(true); setEditingExpense(null); setForm({ title: "", amount: "", category: "Venue", vendor: "", status: "pending", notes: "", dueDate: "" }); }} className="auth-submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} /> Add Expense
            </button>
          )}
        </div>

        {events.length > 0 ? (
          <select value={selectedEvent || ""} onChange={(e) => setSelectedEvent(e.target.value)} className="auth-input" style={{ maxWidth: "300px", marginBottom: "1.5rem" }}>
            {events.map((ev) => (<option key={ev.id} value={ev.id}>{ev.title}</option>))}
          </select>
        ) : (
          <p style={{ color: "rgba(0,0,0,0.5)", textAlign: "center", padding: "2rem" }}>Create an event first.</p>
        )}

        {selectedEvent && (
          <>
            {/* Budget Overview Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "1.5rem" }}>
              <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem" }}>Total Budget</p>
                <h3 style={{ color: "#fbbf24", fontSize: "1.4rem" }}>₦{totalBudget.toLocaleString()}</h3>
              </div>
              <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem" }}>Total Spent</p>
                <h3 style={{ color: "#ef4444", fontSize: "1.4rem" }}>₦{totalSpent.toLocaleString()}</h3>
              </div>
              <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem" }}>Remaining</p>
                <h3 style={{ color: remaining >= 0 ? "#22c55e" : "#ef4444", fontSize: "1.4rem" }}>₦{remaining.toLocaleString()}</h3>
              </div>
              <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem" }}>Pending Payments</p>
                <h3 style={{ color: "#f97316", fontSize: "1.4rem" }}>₦{totalPending.toLocaleString()}</h3>
              </div>
            </div>

            {/* Budget Progress Bar */}
            {totalBudget > 0 && (
              <div className="glass" style={{ padding: "16px", borderRadius: "12px", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "#000", fontSize: "0.85rem" }}>Budget Usage</span>
                  <span style={{ color: budgetPercent > 90 ? "#ef4444" : "#fbbf24", fontSize: "0.85rem", fontWeight: 600 }}>{budgetPercent.toFixed(1)}%</span>
                </div>
                <div style={{ width: "100%", height: "10px", background: "rgba(0,0,0,0.1)", borderRadius: "5px", overflow: "hidden" }}>
                  <div style={{ width: `${budgetPercent}%`, height: "100%", background: budgetPercent > 90 ? "#ef4444" : budgetPercent > 70 ? "#f97316" : "linear-gradient(90deg, #fbbf24, #d97706)", borderRadius: "5px", transition: "width 0.3s" }} />
                </div>
                {budgetPercent > 90 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px", color: "#ef4444", fontSize: "0.8rem" }}>
                    <AlertTriangle size={14} /> Warning: You are approaching your budget limit!
                  </div>
                )}
              </div>
            )}

            {/* Category Breakdown */}
            {Object.keys(categoryTotals).length > 0 && (
              <div className="glass" style={{ padding: "16px", borderRadius: "12px", marginBottom: "1.5rem" }}>
                <h4 style={{ color: "#fbbf24", marginBottom: "12px", fontSize: "0.9rem" }}>Spending by Category</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {Object.entries(categoryTotals)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, total]) => (
                      <div key={cat} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ fontSize: "1.2rem" }}>{categoryIcons[cat] || "📦"}</span>
                        <span style={{ color: "#000", fontSize: "0.85rem", minWidth: "120px" }}>{cat}</span>
                        <div style={{ flex: 1, height: "6px", background: "rgba(0,0,0,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ width: `${(total / totalSpent) * 100}%`, height: "100%", background: "#fbbf24", borderRadius: "3px" }} />
                        </div>
                        <span style={{ color: "#fbbf24", fontSize: "0.85rem", minWidth: "80px", textAlign: "right" }}>₦{total.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Expenses List */}
            <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
              <h4 style={{ color: "#fbbf24", marginBottom: "12px", fontSize: "0.9rem" }}>All Expenses ({expenses.length})</h4>
              {expenses.length === 0 ? (
                <p style={{ color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "2rem" }}>No expenses recorded yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {expenses.map((exp) => (
                    <div key={exp.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.03)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <span style={{ fontSize: "1.2rem" }}>{categoryIcons[exp.category] || "📦"}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: "#000", fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{exp.title}</p>
                        <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>{exp.category} {exp.vendor ? `• ${exp.vendor}` : ""}</p>
                      </div>
                      <span style={{ color: "#fbbf24", fontWeight: 600, fontSize: "0.9rem", whiteSpace: "nowrap" }}>₦{Number(exp.amount).toLocaleString()}</span>
                      <select
                        value={exp.status}
                        onChange={(e) => handleStatusChange(exp.id, e.target.value)}
                        style={{
                          padding: "4px 8px", borderRadius: "6px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.15)",
                          color: exp.status === "paid" ? "#22c55e" : exp.status === "overdue" ? "#ef4444" : "#fbbf24", fontSize: "0.75rem", cursor: "pointer",
                        }}
                      >
                        <option value="pending" style={{ background: "#ffffff" }}>Pending</option>
                        <option value="paid" style={{ background: "#ffffff" }}>Paid</option>
                        <option value="overdue" style={{ background: "#ffffff" }}>Overdue</option>
                      </select>
                      <button onClick={() => handleEdit(exp)} style={{ padding: "4px", borderRadius: "4px", background: "rgba(251,191,36,0.15)", border: "none", color: "#fbbf24", cursor: "pointer" }}><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(exp.id)} style={{ padding: "4px", borderRadius: "4px", background: "rgba(239,68,68,0.15)", border: "none", color: "#ef4444", cursor: "pointer" }}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Add/Edit Modal */}
        {showAdd && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
            <form onSubmit={handleSubmit} className="glass" style={{ padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "450px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>{editingExpense ? "Edit Expense" : "Add Expense"}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input className="auth-input" placeholder="Expense Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input className="auth-input" type="number" placeholder="Amount (₦) *" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
                  <select className="auth-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {categories.map((c) => (<option key={c} value={c} style={{ background: "#ffffff" }}>{c}</option>))}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input className="auth-input" placeholder="Vendor Name" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} />
                  <select className="auth-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="pending" style={{ background: "#ffffff" }}>Pending</option>
                    <option value="paid" style={{ background: "#ffffff" }}>Paid</option>
                    <option value="overdue" style={{ background: "#ffffff" }}>Overdue</option>
                  </select>
                </div>
                <input className="auth-input" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                <textarea className="auth-input auth-textarea" placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="2" />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button type="submit" className="auth-submit" style={{ flex: 1 }}>{editingExpense ? "Update" : "Add Expense"}</button>
                <button type="button" onClick={() => { setShowAdd(false); setEditingExpense(null); }} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", color: "#000", border: "none", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
