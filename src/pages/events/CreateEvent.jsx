import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { db } from "../../firebase/firebase";

export default function CreateEvent() {
  const [form, setForm] = useState({
    budget: "",
    date: "",
    description: "",
    location: "",
    title: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await addDoc(collection(db, "events"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setForm({
        budget: "",
        date: "",
        description: "",
        location: "",
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
            <div className="dashboard-badge">
              Event Builder
            </div>

            <h1>Create a new event</h1>
            <p>Capture the key details, lock the plan, and move straight into execution.</p>
          </div>
        </div>

        <div className="dashboard-form-card glass">
          {success && (
            <div className="auth-success">
              Event created successfully.
            </div>
          )}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-fields">
            <input
              className="auth-input"
              placeholder="Event Title"
              name="title"
              value={form.title}
              onChange={handleChange}
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
                placeholder="Budget"
                name="budget"
                value={form.budget}
                onChange={handleChange}
              />
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
