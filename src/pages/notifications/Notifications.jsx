import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Bell, Check, Trash2, Filter } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const typeIcons = {
  event: "📅",
  booking: "🎫",
  payment: "💰",
  alert: "⚠️",
  message: "💬",
  system: "⚙️",
};

const typeColors = {
  event: "#fbbf24",
  booking: "#3b82f6",
  payment: "#22c55e",
  alert: "#ef4444",
  message: "#8b5cf6",
  system: "#6b7280",
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return unsub;
  }, []);

  const handleMarkRead = async (id) => {
    await updateDoc(doc(db, "notifications", id), {
      read: true,
      readAt: serverTimestamp(),
    });
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    for (const n of unread) {
      await updateDoc(doc(db, "notifications", n.id), {
        read: true,
        readAt: serverTimestamp(),
      });
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notifications", id));
  };

  const handleClearAll = async () => {
    if (!window.confirm("Delete all notifications?")) return;
    for (const n of notifications) {
      await deleteDoc(doc(db, "notifications", n.id));
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Notifications</div>
            <h1>Notifications</h1>
            <p>Stay updated on events, bookings, and platform activity.</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllRead} style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={16} /> Mark All Read ({unreadCount})
              </button>
            )}
            <button onClick={handleClearAll} style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
              <Trash2 size={16} /> Clear All
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {["all", "unread", "event", "booking", "payment", "alert", "message", "system"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: "20px", border: filter === f ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: filter === f ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.8rem", textTransform: "capitalize" }}>
              {f === "all" ? `All (${notifications.length})` : f === "unread" ? `Unread (${unreadCount})` : `${f} (${notifications.filter((n) => n.type === f).length})`}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {loading ? (
          <p style={{ color: "rgba(0,0,0,0.5)", textAlign: "center", padding: "2rem" }}>Loading notifications...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "rgba(0,0,0,0.3)" }}>
            <Bell size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
            <p>No notifications to show.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {filtered.map((notif) => (
              <div
                key={notif.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  background: notif.read ? "rgba(0,0,0,0.02)" : "rgba(251,191,36,0.05)",
                  border: notif.read ? "1px solid rgba(0,0,0,0.05)" : "1px solid rgba(251,191,36,0.15)",
                  cursor: "pointer",
                }}
                onClick={() => !notif.read && handleMarkRead(notif.id)}
              >
                <span style={{ fontSize: "1.3rem" }}>{typeIcons[notif.type] || "📌"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <h4 style={{ color: "#000", fontSize: "0.9rem", fontWeight: notif.read ? 400 : 600 }}>{notif.title}</h4>
                    {!notif.read && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fbbf24" }} />}
                  </div>
                  <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>{notif.message}</p>
                  <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.7rem", marginTop: "4px" }}>
                    {notif.createdAt?.toDate?.().toLocaleString() || "Just now"}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                  style={{ padding: "4px", borderRadius: "4px", background: "rgba(239,68,68,0.1)", border: "none", color: "#ef4444", cursor: "pointer", flexShrink: 0 }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
