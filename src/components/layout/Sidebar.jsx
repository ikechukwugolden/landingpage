import {
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Bell,
  Store,
  CreditCard,
  House,
  Users,
  DollarSign,
  MapPin,
  Clock,
  BarChart3,
  Cloud,
  Globe,
  Heart,
  Crown,
  Shield,
  Megaphone,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user, onboardingCompleted, role } = useAuth();
  const homePath = user
    ? onboardingCompleted
      ? "/dashboard"
      : "/onboarding"
    : "/";

  const mainLinks = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { title: "Events", icon: <Calendar size={20} />, path: "/event-list" },
    { title: "Create Event", icon: <Calendar size={20} />, path: "/events" },
    { title: "Calendar", icon: <Clock size={20} />, path: "/calendar" },
    { title: "Guests", icon: <Users size={20} />, path: "/guests" },
    { title: "Budget", icon: <DollarSign size={20} />, path: "/budget" },
  ];

  const marketplaceLinks = [
    { title: "Vendor Marketplace", icon: <Store size={20} />, path: "/marketplace" },
    { title: "Venue Marketplace", icon: <MapPin size={20} />, path: "/venue-marketplace" },
  ];

  const communicationLinks = [
    { title: "Messages", icon: <MessageCircle size={20} />, path: "/messages" },
    { title: "Notifications", icon: <Bell size={20} />, path: "/notifications" },
  ];

  const financeLinks = [
    { title: "OmaPay", icon: <CreditCard size={20} />, path: "/payments" },
    { title: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },
  ];

  const platformLinks = [
    { title: "Oma AI", icon: <Crown size={20} />, path: "/oma-ai" },
    { title: "Oma Cloud", icon: <Cloud size={20} />, path: "/cloud" },
    { title: "Community", icon: <Globe size={20} />, path: "/community" },
    { title: "Social", icon: <Heart size={20} />, path: "/social" },
  ];

  const adminLinks = role === "admin" ? [
    { title: "Admin Panel", icon: <Shield size={20} />, path: "/admin" },
  ] : [];

  const enterpriseLinks = role === "organization" || role === "enterprise" ? [
    { title: "Enterprise", icon: <Crown size={20} />, path: "/enterprise-dashboard" },
  ] : [];

  const renderLinkGroup = (links) =>
    links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `sidebar-link${isActive ? " active" : ""}`
        }
      >
        {link.icon}
        <span>{link.title}</span>
      </NavLink>
    ));

  return (
    <aside className="sidebar">
      <NavLink to={homePath} className="sidebar-logo">
        OMA
      </NavLink>

      <div className="sidebar-links">
        {renderLinkGroup(mainLinks)}

        <div style={{ padding: "8px 12px 4px", marginTop: "8px" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" }}>Marketplace</span>
        </div>
        {renderLinkGroup(marketplaceLinks)}

        <div style={{ padding: "8px 12px 4px", marginTop: "8px" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" }}>Communication</span>
        </div>
        {renderLinkGroup(communicationLinks)}

        <div style={{ padding: "8px 12px 4px", marginTop: "8px" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" }}>Finance</span>
        </div>
        {renderLinkGroup(financeLinks)}

        <div style={{ padding: "8px 12px 4px", marginTop: "8px" }}>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" }}>Platform</span>
        </div>
        {renderLinkGroup(platformLinks)}

        {adminLinks.length > 0 && (
          <>
            <div style={{ padding: "8px 12px 4px", marginTop: "8px" }}>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" }}>Admin</span>
            </div>
            {renderLinkGroup(adminLinks)}
          </>
        )}

        {enterpriseLinks.length > 0 && (
          <>
            <div style={{ padding: "8px 12px 4px", marginTop: "8px" }}>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" }}>Enterprise</span>
            </div>
            {renderLinkGroup(enterpriseLinks)}
          </>
        )}
      </div>

      <div className="sidebar-footer">
        <NavLink to={homePath} className="sidebar-link sidebar-home-link">
          <House size={20} />
          <span>Back Home</span>
        </NavLink>
      </div>
    </aside>
  );
}
