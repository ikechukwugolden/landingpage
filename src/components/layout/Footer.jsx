import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#050505", color: "#fff", padding: "3rem 0" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ marginBottom: "0.5rem" }}>OMA Events</h3>
          <p style={{ opacity: 0.7 }}>Africa's Event Operating System — plan, book, and pay with confidence.</p>
        </div>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link to="/planners" style={{ color: "#fbbf24" }}>Planners</Link>
          <Link to="/vendors" style={{ color: "#fbbf24" }}>Vendors</Link>
          <Link to="/venues" style={{ color: "#fbbf24" }}>Venues</Link>
          <Link to="/clients" style={{ color: "#fbbf24" }}>Clients</Link>
          <Link to="/enterprise" style={{ color: "#fbbf24" }}>OmaPro</Link>
        </div>
      </div>
    </footer>
  );
}
