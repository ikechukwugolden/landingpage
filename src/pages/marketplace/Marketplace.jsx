import { useState } from "react";
import {
  Calendar,
  Camera,
  MapPin,
  Music,
  Search,
  Sparkles,
  Star,
  Utensils,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Venues",
    "Catering",
    "Photography",
    "Music",
    "Decoration",
  ];

  const vendors = [
    {
      category: "Venues",
      id: 1,
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
      location: "Lagos, Nigeria",
      name: "Golden Hall Events",
      rating: 4.9,
    },
    {
      category: "Catering",
      id: 2,
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop",
      location: "Abuja, Nigeria",
      name: "Elite Catering",
      rating: 4.8,
    },
    {
      category: "Photography",
      id: 3,
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
      location: "Port Harcourt",
      name: "Nova Photography",
      rating: 5.0,
    },
    {
      category: "Music",
      id: 4,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
      location: "Lagos, Nigeria",
      name: "DJ Blaze",
      rating: 4.7,
    },
  ];

  const filteredVendors =
    activeCategory === "All"
      ? vendors
      : vendors.filter((vendor) => vendor.category === activeCategory);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">
              Vendor Marketplace
            </div>

            <h1>Find trusted event partners</h1>
            <p>Browse premium vendors, compare categories, and discover the right fit for your event.</p>
          </div>
        </div>

        <div className="dashboard-form-card glass">
          <div className="marketplace-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search vendors, venues, services..."
            />
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-chip ${
                  activeCategory === category ? "active-chip" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === "Music" && <Music size={16} />}
                {category === "Photography" && <Camera size={16} />}
                {category === "Catering" && <Utensils size={16} />}
                {category === "Decoration" && <Sparkles size={16} />}
                {category === "Venues" && <Calendar size={16} />}
                {category}
              </button>
            ))}
          </div>

          <div className="marketplace-grid">
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="market-card">
                <div className="market-card-image">
                  <img src={vendor.image} alt={vendor.name} />
                </div>

                <div className="market-card-content">
                  <div className="market-card-top">
                    <span className="market-card-category">
                      {vendor.category}
                    </span>

                    <div className="market-rating">
                      <Star size={14} fill="#fbbf24" color="#fbbf24" />
                      {vendor.rating}
                    </div>
                  </div>

                  <h3 className="market-card-title">{vendor.name}</h3>

                  <div className="market-location">
                    <MapPin size={15} />
                    <span>{vendor.location}</span>
                  </div>

                  <button className="market-btn">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
