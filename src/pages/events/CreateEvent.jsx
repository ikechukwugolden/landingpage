import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

export default function CreateEvent() {
  const [form, setForm] = useState({
    budget: "",
    date: "",
    description: "",
    eventType: "wedding",
    location: "",
    status: "planning",
    title: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setError("You must be logged in to create an event");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "events"), {
        ...form,
        budget: form.budget ? Number(form.budget) : 0,
        userId: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        bookings: 0,
        revenue: 0,
        checklist: [],
        tasks: [],
        guests: [],
      });

      setSuccess(true);
      setForm({
        budget: "",
        date: "",
        description: "",
        eventType: "wedding",
        location: "",
        status: "planning",
        title: "",
      });
    } catch (submitError) {
      console.log(submitError);
      setError("We could not create your event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Event Builder</div>
            <h1>Create a new event</h1>
            <p>Capture the key details, lock the plan, and move straight into execution.</p>
          </div>
        </div>

        <div className="dashboard-form-card glass">
          {success && <div className="auth-success">Event created successfully.</div>}
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form-fields">
            <input
              className="auth-input"
              placeholder="Event Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <div className="auth-grid-two">
              <input
                className="auth-input"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
              <input
                className="auth-input"
                type="number"
                placeholder="Budget (₦)"
                name="budget"
                value={form.budget}
                onChange={handleChange}
              />
            </div>

            <div className="auth-grid-two">
              <select
                className="auth-input"
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
              >
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                <option value="baby-shower">Baby Shower</option>
                <option value="bridal-shower">Bridal Shower</option>
                <option value="conference">Conference</option>
                <option value="concert">Concert</option>
                <option value="other">Other</option>
              </select>

              <select
                className="auth-input"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <input
              className="auth-input"
              placeholder="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
            />

            <textarea
              className="auth-input auth-textarea"
              placeholder="Describe your event"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
            />

            <button className="auth-submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
