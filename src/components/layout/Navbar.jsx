import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Sparkles,
  Crown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { id: "planners", label: "Planners", href: "/planners" },
  { id: "vendors", label: "Vendors", href: "/vendors" },
  { id: "venues", label: "Venues", href: "/venues" },
  { id: "clients", label: "Clients", href: "/clients" },
  { id: "enterprise", label: "OmaPro", href: "/enterprise" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, onboardingCompleted } = useAuth();

  const startLink = user
    ? onboardingCompleted
      ? "/dashboard"
      : "/onboarding"
    : "/signup";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.75rem",
              background: "linear-gradient(135deg, #fbbf24, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000000",
              fontWeight: "bold",
              fontSize: "1.25rem",
              boxShadow: "0 4px 20px rgba(251, 191, 36, 0.3)",
            }}
          >
            <Crown size={18} />
          </div>
          <span className="brand-name">OMA Events</span>
        </Link>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.id} to={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          {user && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}
          <Link to={startLink} className="nav-cta">
            <Sparkles size={14} style={{ marginRight: "6px" }} />
            {user ? "Go to App" : "Get Started"}
          </Link>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <Link key={link.id} to={link.href} className="mobile-link" onClick={() => setIsOpen(false)}>
            {link.label}
          </Link>
        ))}
        {user && (
          <Link to="/dashboard" className="mobile-link" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
        )}
        <Link to={startLink} className="mobile-cta" onClick={() => setIsOpen(false)}>
          {user ? "Go to App" : "Get Started"}
        </Link>
      </div>
    </nav>
  );
}