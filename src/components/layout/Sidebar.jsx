import {
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Bell,
  Store,
  CreditCard,
  House,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user, onboardingCompleted } = useAuth();
  const homePath = user
    ? onboardingCompleted
      ? "/dashboard"
      : "/onboarding"
    : "/";

  const links = [

    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      title: "Events",
      icon: <Calendar size={20} />,
      path: "/events",
    },

    {
      title: "Marketplace",
      icon: <Store size={20} />,
      path: "/marketplace",
    },

    {
      title: "Messages",
      icon: <MessageCircle size={20} />,
      path: "/messages",
    },

    {
      title: "Notifications",
      icon: <Bell size={20} />,
      path: "/notifications",
    },

    {
      title: "Payments",
      icon: <CreditCard size={20} />,
      path: "/payments",
    },
  ];

  return (

    <aside className="sidebar">

      <NavLink to={homePath} className="sidebar-logo">
        OMA
      </NavLink>

      <div className="sidebar-links">

        {links.map((link) => (

          <NavLink
            key={link.title}
            to={link.path}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >

            {link.icon}

            <span>{link.title}</span>

          </NavLink>
        ))}
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
