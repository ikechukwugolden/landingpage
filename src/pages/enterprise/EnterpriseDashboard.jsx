import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where, orderBy, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Building2, Users, Settings, CreditCard, BarChart3, Shield, Plus, Crown } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

export default function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [team, setTeam] = useState([]);
  const [branches, setBranches] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const teamUnsub = onSnapshot(query(collection(db, "teamMembers"), where("orgId", "==", uid)), (snap) => {
      setTeam(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const branchUnsub = onSnapshot(query(collection(db, "branches"), where("orgId", "==", uid)), (snap) => {
      setBranches(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const eventsUnsub = onSnapshot(query(collection(db, "events"), where("userId", "==", uid), orderBy("createdAt", "desc")), (snap) => {
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => { teamUnsub(); branchUnsub(); eventsUnsub(); };
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge" style={{ display: "flex", alignItems: "center", gap: "6px" }}><Crown size={14} /> Enterprise</div>
            <h1>OMA Pro - Enterprise</h1>
            <p>Multi-team management, staff permissions, and enterprise billing.</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {[
            { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
            { id: "team", label: "Team", icon: <Users size={16} /> },
            { id: "branches", label: "Branches", icon: <Building2 size={16} /> },
            { id: "permissions", label: "Permissions", icon: <Shield size={16} /> },
            { id: "billing", label: "Billing", icon: <CreditCard size={16} /> },
            { id: "settings", label: "Settings", icon: <Settings size={16} /> },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === tab.id ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: activeTab === tab.id ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "1.5rem" }}>
              {[
                { label: "Team Members", value: team.length, color: "#fbbf24" },
                { label: "Branches", value: branches.length, color: "#3b82f6" },
                { label: "Total Events", value: events.length, color: "#22c55e" },
                { label: "Active Projects", value: events.filter((e) => e.status === "in-progress").length, color: "#f97316" },
              ].map((s, i) => (
                <div key={i} className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
                  <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem" }}>{s.label}</p>
                  <h3 style={{ color: s.color, fontSize: "1.5rem" }}>{s.value}</h3>
                </div>
              ))}
            </div>
            <div className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "12px" }}>Enterprise Plan</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                {["Multi-team Management", "Staff Permissions", "White-label Support", "Multiple Branches", "Enterprise Billing", "Priority Support"].map((feature, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px", borderRadius: "8px", background: "rgba(251,191,36,0.05)" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                    <span style={{ color: "#000", fontSize: "0.85rem" }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Team */}
        {activeTab === "team" && (
          <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#fbbf24" }}>Team Members</h3>
              <button style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                <Plus size={14} /> Invite Member
              </button>
            </div>
            {team.length === 0 ? (
              <p style={{ color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "2rem" }}>No team members yet. Invite your team!</p>
            ) : (
              team.map((member) => (
                <div key={member.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.03)", marginBottom: "6px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.8rem" }}>
                    {member.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#000", fontSize: "0.9rem" }}>{member.name}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{member.email}</p>
                  </div>
                  <span style={{ padding: "2px 8px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.7rem" }}>{member.role || "Member"}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Branches */}
        {activeTab === "branches" && (
          <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ color: "#fbbf24" }}>Branches</h3>
              <button style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                <Plus size={14} /> Add Branch
              </button>
            </div>
            {branches.length === 0 ? (
              <p style={{ color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "2rem" }}>No branches configured yet.</p>
            ) : (
              branches.map((branch) => (
                <div key={branch.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.03)", marginBottom: "6px" }}>
                  <Building2 size={20} style={{ color: "#fbbf24" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#000", fontSize: "0.9rem" }}>{branch.name}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{branch.location}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Permissions */}
        {activeTab === "permissions" && (
          <div className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "16px" }}>Staff Permissions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {[
                { role: "Admin", perms: ["Full access", "Manage team", "Billing", "Settings"] },
                { role: "Manager", perms: ["Manage events", "View reports", "Manage vendors"] },
                { role: "Staff", perms: ["View events", "Update tasks", "View calendar"] },
                { role: "Viewer", perms: ["View only", "Read reports"] },
              ].map((r) => (
                <div key={r.role} className="glass" style={{ padding: "16px", borderRadius: "10px" }}>
                  <h4 style={{ color: "#fbbf24", marginBottom: "8px" }}>{r.role}</h4>
                  {r.perms.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 0" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
                      <span style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.8rem" }}>{p}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing */}
        {activeTab === "billing" && (
          <div className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "16px" }}>Enterprise Billing</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>Current Plan</p>
                <h3 style={{ color: "#fbbf24", fontSize: "1.3rem" }}>OMA Pro Enterprise</h3>
                <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem", marginTop: "4px" }}>₦500,000/year</p>
              </div>
              <div className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>Next Invoice</p>
                <h3 style={{ color: "#000", fontSize: "1.3rem" }}>₦500,000</h3>
                <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem", marginTop: "4px" }}>Due: Jan 1, 2027</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "16px" }}>Organization Settings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input className="auth-input" placeholder="Organization Name" />
              <input className="auth-input" placeholder="Business Email" type="email" />
              <input className="auth-input" placeholder="Phone Number" type="tel" />
              <textarea className="auth-input auth-textarea" placeholder="Organization Description" rows="3" />
              <button className="auth-submit" style={{ alignSelf: "flex-start" }}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
