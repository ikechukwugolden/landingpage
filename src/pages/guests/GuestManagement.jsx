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
import { Users, UserPlus, Trash2, Mail, Phone, CheckCircle, XCircle, Edit3, Search } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const rsvpOptions = ["invited", "confirmed", "declined", "pending"];

export default function GuestManagement() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    group: "General",
    rsvp: "invited",
    plusOne: false,
    notes: "",
  });

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const q = query(collection(db, "events"), where("userId", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setEvents(list);
      if (list.length > 0 && !selectedEvent) {
        setSelectedEvent(list[0].id);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    const q = query(collection(db, "guests"), where("eventId", "==", selectedEvent));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setGuests(list);
    });
    return unsub;
  }, [selectedEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !selectedEvent) return;
    if (editingGuest) {
      await updateDoc(doc(db, "guests", editingGuest.id), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      setEditingGuest(null);
    } else {
      await addDoc(collection(db, "guests"), {
        ...form,
        eventId: selectedEvent,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
    }
    setForm({ name: "", email: "", phone: "", group: "General", rsvp: "invited", plusOne: false, notes: "" });
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this guest?")) return;
    await deleteDoc(doc(db, "guests", id));
  };

  const handleRsvpChange = async (guestId, newRsvp) => {
    await updateDoc(doc(db, "guests", guestId), { rsvp: newRsvp, updatedAt: serverTimestamp() });
  };

  const handleEdit = (guest) => {
    setEditingGuest(guest);
    setForm({
      name: guest.name,
      email: guest.email || "",
      phone: guest.phone || "",
      group: guest.group || "General",
      rsvp: guest.rsvp || "invited",
      plusOne: guest.plusOne || false,
      notes: guest.notes || "",
    });
    setShowAdd(true);
  };

  const filtered = guests.filter((g) => {
    const q = search.toLowerCase();
    return (
      g.name?.toLowerCase().includes(q) ||
      g.email?.toLowerCase().includes(q) ||
      g.group?.toLowerCase().includes(q)
    );
  });

  const rsvpCounts = {
    invited: guests.filter((g) => g.rsvp === "invited").length,
    confirmed: guests.filter((g) => g.rsvp === "confirmed").length,
    declined: guests.filter((g) => g.rsvp === "declined").length,
    pending: guests.filter((g) => g.rsvp === "pending").length,
  };

  const groups = [...new Set(guests.map((g) => g.group || "General"))];

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Guest Management</div>
            <h1>Guest List</h1>
            <p>Manage invitations, RSVPs, and seating for your events.</p>
          </div>
          {selectedEvent && (
            <button
              onClick={() => { setShowAdd(true); setEditingGuest(null); setForm({ name: "", email: "", phone: "", group: "General", rsvp: "invited", plusOne: false, notes: "" }); }}
              className="auth-submit"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <UserPlus size={18} /> Add Guest
            </button>
          )}
        </div>

        {/* Event Selector */}
        {events.length > 0 ? (
          <select
            value={selectedEvent || ""}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="auth-input"
            style={{ maxWidth: "300px", marginBottom: "1.5rem" }}
          >
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.title}</option>
            ))}
          </select>
        ) : (
          <p style={{ color: "rgba(0,0,0,0.5)", textAlign: "center", padding: "2rem" }}>Create an event first to manage guests.</p>
        )}

        {selectedEvent && (
          <>
            {/* RSVP Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px", marginBottom: "1.5rem" }}>
              {rsvpOptions.map((r) => (
                <div key={r} className="glass" style={{ padding: "12px", borderRadius: "10px", textAlign: "center" }}>
                  <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem", textTransform: "capitalize" }}>{r}</p>
                  <h3 style={{ color: "#fbbf24", fontSize: "1.5rem" }}>{rsvpCounts[r]}</h3>
                </div>
              ))}
            </div>

            {/* Groups */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
              {groups.map((g) => (
                <span key={g} style={{ padding: "4px 12px", borderRadius: "20px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.8rem" }}>
                  {g} ({guests.filter((x) => x.group === g).length})
                </span>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guests by name, email, or group..."
                className="auth-input"
                style={{ paddingLeft: "36px" }}
              />
            </div>

            {/* Guest Table */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(0,0,0,0.3)" }}>
                <Users size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                <p>No guests yet. Add your first guest!</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", color: "#000" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                      <th style={{ textAlign: "left", padding: "10px", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Name</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Email</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Phone</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Group</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>RSVP</th>
                      <th style={{ textAlign: "left", padding: "10px", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>+1</th>
                      <th style={{ textAlign: "right", padding: "10px", color: "rgba(0,0,0,0.5)", fontSize: "0.8rem" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((guest) => (
                      <tr key={guest.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                        <td style={{ padding: "10px", fontSize: "0.9rem" }}>{guest.name}</td>
                        <td style={{ padding: "10px", fontSize: "0.85rem", color: "rgba(0,0,0,0.5)" }}>{guest.email || "—"}</td>
                        <td style={{ padding: "10px", fontSize: "0.85rem", color: "rgba(0,0,0,0.5)" }}>{guest.phone || "—"}</td>
                        <td style={{ padding: "10px" }}>
                          <span style={{ padding: "2px 8px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.75rem" }}>
                            {guest.group}
                          </span>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <select
                            value={guest.rsvp}
                            onChange={(e) => handleRsvpChange(guest.id, e.target.value)}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              background: "rgba(0,0,0,0.05)",
                              border: "1px solid rgba(0,0,0,0.15)",
                              color: guest.rsvp === "confirmed" ? "#22c55e" : guest.rsvp === "declined" ? "#ef4444" : "#fbbf24",
                              fontSize: "0.8rem",
                              cursor: "pointer",
                            }}
                          >
                            {rsvpOptions.map((r) => (
                              <option key={r} value={r} style={{ background: "#ffffff" }}>{r}</option>
                            ))}
                          </select>
                        </td>
                        <td style={{ padding: "10px", color: guest.plusOne ? "#22c55e" : "rgba(0,0,0,0.3)" }}>
                          {guest.plusOne ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        </td>
                        <td style={{ padding: "10px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                            <button onClick={() => handleEdit(guest)} style={{ padding: "4px", borderRadius: "4px", background: "rgba(251,191,36,0.15)", border: "none", color: "#fbbf24", cursor: "pointer" }}>
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => handleDelete(guest.id)} style={{ padding: "4px", borderRadius: "4px", background: "rgba(239,68,68,0.15)", border: "none", color: "#ef4444", cursor: "pointer" }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Add/Edit Modal */}
        {showAdd && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
            <form onSubmit={handleSubmit} className="glass" style={{ padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "450px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>{editingGuest ? "Edit Guest" : "Add Guest"}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input className="auth-input" placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input className="auth-input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <input className="auth-input" type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input className="auth-input" placeholder="Group (e.g. Family, VIP)" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} />
                  <select className="auth-input" value={form.rsvp} onChange={(e) => setForm({ ...form, rsvp: e.target.value })}>
                    {rsvpOptions.map((r) => (
                      <option key={r} value={r} style={{ background: "#ffffff" }}>{r}</option>
                    ))}
                  </select>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#000", fontSize: "0.9rem" }}>
                  <input type="checkbox" checked={form.plusOne} onChange={(e) => setForm({ ...form, plusOne: e.target.checked })} style={{ accentColor: "#fbbf24" }} />
                  Allow +1
                </label>
                <textarea className="auth-input auth-textarea" placeholder="Notes (dietary, seating, etc.)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="2" />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button type="submit" className="auth-submit" style={{ flex: 1 }}>{editingGuest ? "Update" : "Add Guest"}</button>
                <button type="button" onClick={() => { setShowAdd(false); setEditingGuest(null); }} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", color: "#000", border: "none", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
