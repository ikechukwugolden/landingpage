import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { Plus, Calendar, MapPin, Trash2, Edit3, Eye, CheckCircle, Clock, XCircle, Copy, ChevronDown } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const statusColors = {
  planning: "#fbbf24",
  "in-progress": "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

const statusIcons = {
  planning: <Clock size={14} />,
  "in-progress": <Eye size={14} />,
  completed: <CheckCircle size={14} />,
  cancelled: <XCircle size={14} />,
};

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showChecklist, setShowChecklist] = useState(null);
  const [newCheckItem, setNewCheckItem] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const q = query(collection(db, "events"), where("userId", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => {
        const da = a.createdAt?.toDate?.() || new Date(0);
        const db = b.createdAt?.toDate?.() || new Date(0);
        return db - da;
      });
      setEvents(list);
      setLoading(false);
    });

    return unsub;
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Delete this event?")) return;
    await deleteDoc(doc(db, "events", eventId));
  };

  const handleStatusChange = async (eventId, newStatus) => {
    await updateDoc(doc(db, "events", eventId), {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
  };

  const handleDuplicate = async (event) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const { id, createdAt, updatedAt, ...rest } = event;
    await addDoc(collection(db, "events"), {
      ...rest,
      title: `${rest.title} (Copy)`,
      status: "planning",
      userId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;
    await updateDoc(doc(db, "events", editingEvent.id), {
      title: editingEvent.title,
      date: editingEvent.date,
      location: editingEvent.location,
      budget: Number(editingEvent.budget) || 0,
      description: editingEvent.description,
      eventType: editingEvent.eventType,
      updatedAt: serverTimestamp(),
    });
    setEditingEvent(null);
  };

  const handleAddCheckItem = async (eventId) => {
    if (!newCheckItem.trim()) return;
    await updateDoc(doc(db, "events", eventId), {
      checklist: arrayUnion({ text: newCheckItem.trim(), done: false, id: Date.now().toString() }),
      updatedAt: serverTimestamp(),
    });
    setNewCheckItem("");
  };

  const handleToggleCheckItem = async (eventId, item) => {
    const ev = events.find((e) => e.id === eventId);
    if (!ev) return;
    const updated = (ev.checklist || []).map((c) =>
      c.id === item.id ? { ...c, done: !c.done } : c
    );
    await updateDoc(doc(db, "events", eventId), {
      checklist: updated,
      updatedAt: serverTimestamp(),
    });
  };

  const handleAddTask = async (eventId) => {
    if (!newTask.trim()) return;
    await updateDoc(doc(db, "events", eventId), {
      tasks: arrayUnion({ text: newTask.trim(), done: false, id: Date.now().toString() }),
      updatedAt: serverTimestamp(),
    });
    setNewTask("");
  };

  const filtered = events.filter((e) => filter === "all" || e.status === filter);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Events</div>
            <h1>Your Events</h1>
            <p>Manage, track, and execute all your events from one place.</p>
          </div>
          <Link to="/events" className="auth-submit" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Plus size={18} /> New Event
          </Link>
        </div>

        {/* Filter Bar */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {["all", "planning", "in-progress", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "6px 16px",
                borderRadius: "8px",
                border: filter === s ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)",
                background: filter === s ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)",
                color: "#000",
                cursor: "pointer",
                fontSize: "0.85rem",
                textTransform: "capitalize",
              }}
            >
              {s === "all" ? "All" : s.replace("-", " ")}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "rgba(0,0,0,0.5)", textAlign: "center", padding: "2rem" }}>Loading events...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "rgba(0,0,0,0.5)" }}>
            <Calendar size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
            <p>No events found. <Link to="/events" style={{ color: "#fbbf24" }}>Create your first event</Link></p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {filtered.map((event) => (
              <div key={event.id} className="glass" style={{ padding: "1.25rem", borderRadius: "12px", borderLeft: `4px solid ${statusColors[event.status] || "#fbbf24"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <h3 style={{ color: "#000", fontSize: "1.1rem" }}>{event.title}</h3>
                      <span style={{
                        padding: "2px 10px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        background: `${statusColors[event.status]}22`,
                        color: statusColors[event.status],
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}>
                        {statusIcons[event.status]} {event.status?.replace("-", " ")}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>
                      {event.date && <span><Calendar size={14} /> {event.date}</span>}
                      {event.location && <span><MapPin size={14} /> {event.location}</span>}
                      {event.budget > 0 && <span>₦{Number(event.budget).toLocaleString()}</span>}
                    </div>
                    {event.description && (
                      <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.85rem", marginTop: "6px" }}>
                        {event.description.slice(0, 120)}{event.description.length > 120 ? "..." : ""}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {/* Status dropdown */}
                    <select
                      value={event.status}
                      onChange={(e) => handleStatusChange(event.id, e.target.value)}
                      style={{ padding: "6px", borderRadius: "6px", background: "#ffffff", color: "#000", border: "1px solid rgba(0,0,0,0.15)", fontSize: "0.8rem" }}
                    >
                      <option value="planning">Planning</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button onClick={() => setEditingEvent(event)} title="Edit" style={{ padding: "6px", borderRadius: "6px", background: "rgba(251,191,36,0.15)", border: "none", color: "#fbbf24", cursor: "pointer" }}>
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDuplicate(event)} title="Duplicate" style={{ padding: "6px", borderRadius: "6px", background: "rgba(59,130,246,0.15)", border: "none", color: "#3b82f6", cursor: "pointer" }}>
                      <Copy size={16} />
                    </button>
                    <button onClick={() => setShowChecklist(showChecklist === event.id ? null : event.id)} title="Checklist" style={{ padding: "6px", borderRadius: "6px", background: "rgba(34,197,94,0.15)", border: "none", color: "#22c55e", cursor: "pointer" }}>
                      <CheckCircle size={16} />
                    </button>
                    <button onClick={() => handleDelete(event.id)} title="Delete" style={{ padding: "6px", borderRadius: "6px", background: "rgba(239,68,68,0.15)", border: "none", color: "#ef4444", cursor: "pointer" }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Checklist & Tasks Panel */}
                {showChecklist === event.id && (
                  <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                      {/* Checklist */}
                      <div>
                        <h4 style={{ color: "#fbbf24", marginBottom: "8px", fontSize: "0.9rem" }}>Checklist</h4>
                        {(event.checklist || []).map((item, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => handleToggleCheckItem(event.id, item)}
                              style={{ accentColor: "#fbbf24" }}
                            />
                            <span style={{ color: item.done ? "rgba(0,0,0,0.3)" : "#000", textDecoration: item.done ? "line-through" : "none", fontSize: "0.85rem" }}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                        <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                          <input
                            value={newCheckItem}
                            onChange={(e) => setNewCheckItem(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddCheckItem(event.id)}
                            placeholder="Add item..."
                            style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.15)", color: "#000", fontSize: "0.85rem" }}
                          />
                          <button onClick={() => handleAddCheckItem(event.id)} style={{ padding: "6px 12px", borderRadius: "6px", background: "#fbbf24", color: "#000", border: "none", cursor: "pointer", fontWeight: 600 }}>+</button>
                        </div>
                      </div>

                      {/* Tasks */}
                      <div>
                        <h4 style={{ color: "#fbbf24", marginBottom: "8px", fontSize: "0.9rem" }}>Tasks</h4>
                        {(event.tasks || []).map((item, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={async () => {
                                const updated = (event.tasks || []).map((t) => t.id === item.id ? { ...t, done: !t.done } : t);
                                await updateDoc(doc(db, "events", event.id), { tasks: updated, updatedAt: serverTimestamp() });
                              }}
                              style={{ accentColor: "#fbbf24" }}
                            />
                            <span style={{ color: item.done ? "rgba(0,0,0,0.3)" : "#000", textDecoration: item.done ? "line-through" : "none", fontSize: "0.85rem" }}>
                              {item.text}
                            </span>
                          </div>
                        ))}
                        <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                          <input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTask(event.id)}
                            placeholder="Add task..."
                            style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.15)", color: "#000", fontSize: "0.85rem" }}
                          />
                          <button onClick={() => handleAddTask(event.id)} style={{ padding: "6px 12px", borderRadius: "6px", background: "#fbbf24", color: "#000", border: "none", cursor: "pointer", fontWeight: 600 }}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingEvent && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
            <form onSubmit={handleUpdateEvent} className="glass" style={{ padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflow: "auto" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>Edit Event</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input className="auth-input" placeholder="Title" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} />
                <input className="auth-input" type="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                <input className="auth-input" type="number" placeholder="Budget" value={editingEvent.budget} onChange={(e) => setEditingEvent({ ...editingEvent, budget: e.target.value })} />
                <input className="auth-input" placeholder="Location" value={editingEvent.location} onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })} />
                <select className="auth-input" value={editingEvent.eventType} onChange={(e) => setEditingEvent({ ...editingEvent, eventType: e.target.value })}>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="bridal-shower">Bridal Shower</option>
                  <option value="conference">Conference</option>
                  <option value="other">Other</option>
                </select>
                <textarea className="auth-input auth-textarea" placeholder="Description" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} rows="3" />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button type="submit" className="auth-submit" style={{ flex: 1 }}>Save Changes</button>
                <button type="button" onClick={() => setEditingEvent(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", color: "#000", border: "none", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
