import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const eventTypeColors = {
  wedding: "#fbbf24",
  birthday: "#ec4899",
  corporate: "#3b82f6",
  "baby-shower": "#8b5cf6",
  "bridal-shower": "#f472b6",
  conference: "#06b6d4",
  concert: "#ef4444",
  other: "#6b7280",
};

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const q = query(collection(db, "events"), where("userId", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => { setCurrentDate(new Date()); setSelectedDay(new Date().getDate()); };

  const eventsOnDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return events.filter((e) => e.date === dateStr);
  };

  const selectedDayEvents = selectedDay ? eventsOnDay(selectedDay) : [];
  const today = new Date();
  const isToday = (day) => today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  const upcomingEvents = events
    .filter((e) => {
      if (!e.date) return false;
      const d = new Date(e.date);
      return d >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Calendar</div>
            <h1>Event Calendar</h1>
            <p>View and manage your event schedule at a glance.</p>
          </div>
          <button onClick={goToday} style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", cursor: "pointer", fontSize: "0.85rem" }}>
            Today
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>
          {/* Calendar Grid */}
          <div className="glass" style={{ padding: "20px", borderRadius: "16px" }}>
            {/* Month Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <button onClick={prevMonth} style={{ padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", border: "none", color: "#000", cursor: "pointer" }}><ChevronLeft size={20} /></button>
              <h2 style={{ color: "#fbbf24", fontSize: "1.2rem" }}>{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} style={{ padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", border: "none", color: "#000", cursor: "pointer" }}><ChevronRight size={20} /></button>
            </div>

            {/* Day Headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
              {DAYS.map((d) => (
                <div key={d} style={{ textAlign: "center", padding: "8px 0", color: "rgba(0,0,0,0.4)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase" }}>{d}</div>
              ))}
            </div>

            {/* Day Cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} style={{ aspectRatio: "1", borderRadius: "8px" }} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = eventsOnDay(day);
                const selected = selectedDay === day;
                const today = isToday(day);

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(selected ? null : day)}
                    style={{
                      aspectRatio: "1",
                      borderRadius: "8px",
                      padding: "4px",
                      cursor: "pointer",
                      background: selected ? "rgba(251,191,36,0.2)" : today ? "rgba(251,191,36,0.08)" : "rgba(0,0,0,0.03)",
                      border: today ? "2px solid #fbbf24" : selected ? "2px solid rgba(251,191,36,0.5)" : "2px solid transparent",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "2px",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ color: today ? "#fbbf24" : "#000", fontSize: "0.85rem", fontWeight: today || selected ? 700 : 400 }}>{day}</span>
                    {dayEvents.length > 0 && (
                      <div style={{ display: "flex", gap: "2px" }}>
                        {dayEvents.slice(0, 3).map((e, idx) => (
                          <div key={idx} style={{ width: "5px", height: "5px", borderRadius: "50%", background: eventTypeColors[e.eventType] || "#fbbf24" }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Selected Day Events */}
            {selectedDay && (
              <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
                <h3 style={{ color: "#fbbf24", fontSize: "0.95rem", marginBottom: "12px" }}>
                  {MONTHS[month]} {selectedDay}, {year}
                </h3>
                {selectedDayEvents.length === 0 ? (
                  <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.85rem" }}>No events on this day</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {selectedDayEvents.map((ev) => (
                      <div key={ev.id} style={{ padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", borderLeft: `3px solid ${eventTypeColors[ev.eventType] || "#fbbf24"}` }}>
                        <p style={{ color: "#000", fontWeight: 500, fontSize: "0.9rem" }}>{ev.title}</p>
                        {ev.location && <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={10} /> {ev.location}</p>}
                        <span style={{ padding: "2px 8px", borderRadius: "10px", background: `${eventTypeColors[ev.eventType] || "#fbbf24"}22`, color: eventTypeColors[ev.eventType] || "#fbbf24", fontSize: "0.7rem", textTransform: "capitalize" }}>{ev.eventType}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Events */}
            <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
              <h3 style={{ color: "#fbbf24", fontSize: "0.95rem", marginBottom: "12px" }}>Upcoming Events</h3>
              {upcomingEvents.length === 0 ? (
                <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.85rem" }}>No upcoming events</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {upcomingEvents.map((ev) => (
                    <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.03)" }}>
                      <div style={{ width: "4px", height: "40px", borderRadius: "2px", background: eventTypeColors[ev.eventType] || "#fbbf24" }} />
                      <div>
                        <p style={{ color: "#000", fontSize: "0.85rem" }}>{ev.title}</p>
                        <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}><CalendarIcon size={10} /> {ev.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
              <h3 style={{ color: "#fbbf24", fontSize: "0.95rem", marginBottom: "12px" }}>Legend</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {Object.entries(eventTypeColors).map(([type, color]) => (
                  <div key={type} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
                    <span style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "capitalize" }}>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
