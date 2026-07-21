import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  deleteDoc,
  where,
  getDocs,
  count,
} from "firebase/firestore";
import { Shield, Users, CheckCircle, XCircle, Eye, Trash2, BarChart3, Settings, FileText, Search, TrendingUp, AlertTriangle } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [pendingVendors, setPendingVendors] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubUsers = onSnapshot(query(collection(db, "users"), orderBy("createdAt", "desc")), (snap) => {
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    const unsubVendors = onSnapshot(
      query(collection(db, "vendors"), where("verified", "==", false)),
      (snap) => setPendingVendors(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    const unsubEvents = onSnapshot(query(collection(db, "events"), orderBy("createdAt", "desc")), (snap) => {
      setAllEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubUsers(); unsubVendors(); unsubEvents(); };
  }, []);

  const handleApproveVendor = async (vendorId) => {
    await updateDoc(doc(db, "vendors", vendorId), {
      verified: true,
      verifiedAt: serverTimestamp(),
      verifiedBy: auth.currentUser.uid,
    });
  };

  const handleRejectVendor = async (vendorId) => {
    if (!window.confirm("Reject this vendor?")) return;
    await deleteDoc(doc(db, "vendors", vendorId));
  };

  const handleBanUser = async (userId) => {
    if (!window.confirm("Ban this user?")) return;
    await updateDoc(doc(db, "users", userId), {
      banned: true,
      bannedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const stats = {
    totalUsers: users.length,
    totalVendors: users.filter((u) => u.role === "vendor").length,
    totalPlanners: users.filter((u) => u.role === "planner").length,
    totalEvents: allEvents.length,
    pendingApprovals: pendingVendors.length,
    bannedUsers: users.filter((u) => u.banned).length,
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return u.fullName?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.role?.toLowerCase().includes(q);
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
    { id: "users", label: "Users", icon: <Users size={16} /> },
    { id: "vendors", label: "Vendor Approvals", icon: <CheckCircle size={16} /> },
    { id: "events", label: "Events", icon: <FileText size={16} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} /> },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Admin Portal</div>
            <h1>Admin Panel</h1>
            <p>Manage users, vendors, events, and platform settings.</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === tab.id ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: activeTab === tab.id ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "1.5rem" }}>
              {[
                { label: "Total Users", value: stats.totalUsers, color: "#fbbf24" },
                { label: "Vendors", value: stats.totalVendors, color: "#3b82f6" },
                { label: "Planners", value: stats.totalPlanners, color: "#8b5cf6" },
                { label: "Total Events", value: stats.totalEvents, color: "#22c55e" },
                { label: "Pending Approvals", value: stats.pendingApprovals, color: "#f97316" },
                { label: "Banned Users", value: stats.bannedUsers, color: "#ef4444" },
              ].map((s, i) => (
                <div key={i} className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
                  <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem" }}>{s.label}</p>
                  <h3 style={{ color: s.color, fontSize: "1.5rem" }}>{s.value}</h3>
                </div>
              ))}
            </div>

            {/* Recent Users */}
            <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "12px" }}>Recent Users</h3>
              {users.slice(0, 5).map((u) => (
                <div key={u.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.75rem" }}>
                    {u.fullName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#000", fontSize: "0.85rem" }}>{u.fullName}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{u.email}</p>
                  </div>
                  <span style={{ padding: "2px 8px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.7rem", textTransform: "capitalize" }}>{u.role || "user"}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <>
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="auth-input" style={{ paddingLeft: "36px" }} />
            </div>
            <div className="glass" style={{ borderRadius: "12px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#000" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>User</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Role</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "left", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Joined</th>
                    <th style={{ padding: "12px", textAlign: "right", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <td style={{ padding: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.7rem" }}>
                            {u.fullName?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontSize: "0.85rem" }}>{u.fullName}</p>
                            <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.7rem" }}>{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ padding: "2px 8px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.7rem", textTransform: "capitalize" }}>{u.role || "user"}</span>
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ padding: "2px 8px", borderRadius: "10px", background: u.banned ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)", color: u.banned ? "#ef4444" : "#22c55e", fontSize: "0.7rem" }}>
                          {u.banned ? "Banned" : "Active"}
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "rgba(0,0,0,0.4)", fontSize: "0.8rem" }}>
                        {u.createdAt?.toDate?.().toLocaleDateString() || "—"}
                      </td>
                      <td style={{ padding: "12px", textAlign: "right" }}>
                        {!u.banned && (
                          <button onClick={() => handleBanUser(u.id)} style={{ padding: "4px 8px", borderRadius: "4px", background: "rgba(239,68,68,0.15)", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.75rem" }}>Ban</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Vendor Approvals */}
        {activeTab === "vendors" && (
          <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "12px" }}>Pending Vendor Approvals ({pendingVendors.length})</h3>
            {pendingVendors.length === 0 ? (
              <p style={{ color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "2rem" }}>No pending approvals</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {pendingVendors.map((v) => (
                  <div key={v.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.03)" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700 }}>
                      {v.businessName?.charAt(0)?.toUpperCase() || "V"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#000", fontSize: "0.9rem" }}>{v.businessName || "Unnamed Vendor"}</p>
                      <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{v.category || "General"} • {v.email || "No email"}</p>
                    </div>
                    <button onClick={() => handleApproveVendor(v.id)} style={{ padding: "6px 14px", borderRadius: "6px", background: "rgba(34,197,94,0.15)", border: "none", color: "#22c55e", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}>
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button onClick={() => handleRejectVendor(v.id)} style={{ padding: "6px 14px", borderRadius: "6px", background: "rgba(239,68,68,0.15)", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}>
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "12px" }}>All Events ({allEvents.length})</h3>
            {allEvents.map((ev) => (
              <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.03)", marginBottom: "6px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#000", fontSize: "0.9rem" }}>{ev.title}</p>
                  <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{ev.date || "No date"} • {ev.eventType || "Other"}</p>
                </div>
                <span style={{ padding: "2px 8px", borderRadius: "10px", background: ev.status === "completed" ? "rgba(34,197,94,0.1)" : "rgba(251,191,36,0.1)", color: ev.status === "completed" ? "#22c55e" : "#fbbf24", fontSize: "0.7rem", textTransform: "capitalize" }}>
                  {ev.status || "planning"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "16px" }}>Platform Settings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Enable OmaPay", desc: "Allow wallet and payment features", checked: true },
                { label: "Enable Oma AI", desc: "Enable AI assistant across platform", checked: true },
                { label: "Auto-verify Vendors", desc: "Automatically approve vendor registrations", checked: false },
                { label: "Maintenance Mode", desc: "Put platform in maintenance mode", checked: false },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.03)" }}>
                  <div>
                    <p style={{ color: "#000", fontSize: "0.9rem" }}>{s.label}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{s.desc}</p>
                  </div>
                  <label style={{ position: "relative", width: "44px", height: "24px" }}>
                    <input type="checkbox" defaultChecked={s.checked} style={{ display: "none" }} />
                    <div style={{ width: "100%", height: "100%", borderRadius: "12px", background: s.checked ? "#fbbf24" : "rgba(0,0,0,0.2)", cursor: "pointer", transition: "background 0.3s" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#000", position: "absolute", top: "2px", left: s.checked ? "22px" : "2px", transition: "left 0.3s" }} />
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
