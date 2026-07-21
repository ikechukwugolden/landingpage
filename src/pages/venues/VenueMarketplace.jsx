import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { MapPin, Star, Search, Filter, Heart, Calendar, Users, DollarSign, Eye, Clock } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const venueTypes = ["All", "Banquet Hall", "Hotel", "Garden", "Rooftop", "Beach", "Church/Mosque", "Conference Center", "Restaurant", "Castle"];

const mockVenues = [
  { id: "1", name: "Grand Ballroom Palace", type: "Banquet Hall", location: "Lagos, Nigeria", capacity: 500, price: 500000, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400", amenities: ["AC", "Parking", "Stage", "Lighting"], available: true, description: "Premium event space with world-class facilities" },
  { id: "2", name: "Serenity Garden", type: "Garden", location: "Abuja, Nigeria", capacity: 200, price: 250000, rating: 4.6, reviews: 89, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400", amenities: ["Outdoor", "Parking", "Kitchen"], available: true, description: "Beautiful outdoor garden venue" },
  { id: "3", name: "Skyline Rooftop", type: "Rooftop", location: "Victoria Island, Lagos", capacity: 150, price: 350000, rating: 4.9, reviews: 67, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400", amenities: ["City View", "Bar", "AC", "Sound System"], available: true, description: "Stunning rooftop venue with panoramic views" },
  { id: "4", name: "Oceanview Beach Resort", type: "Beach", location: "Lekki, Lagos", capacity: 300, price: 400000, rating: 4.7, reviews: 156, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", amenities: ["Beach Access", "Changing Room", "Parking", "Catering"], available: false, description: "Exclusive beachfront event space" },
  { id: "5", name: "Royal Castle Hall", type: "Castle", location: "Ikoyi, Lagos", capacity: 400, price: 750000, rating: 4.9, reviews: 45, image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400", amenities: ["Luxury", "AC", "Full Service", "Valet"], available: true, description: "Luxury castle-style venue for premium events" },
  { id: "6", name: "Conference Hub Center", type: "Conference Center", location: "Wuse, Abuja", capacity: 1000, price: 600000, rating: 4.5, reviews: 203, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400", amenities: ["Projector", "WiFi", "Stage", "Microphones"], available: true, description: "Professional conference and event facility" },
];

export default function VenueMarketplace() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [bookingModal, setBookingModal] = useState(null);
  const [bookingForm, setBookingForm] = useState({ date: "", guests: "", name: "", email: "", phone: "" });

  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!bookingModal || !auth.currentUser) return;
    try {
      await addDoc(collection(db, "venueBookings"), {
        venueId: bookingModal.id,
        venueName: bookingModal.name,
        userId: auth.currentUser.uid,
        ...bookingForm,
        guests: Number(bookingForm.guests),
        status: "pending",
        totalAmount: bookingModal.price,
        createdAt: serverTimestamp(),
      });
      alert("Booking request submitted! The venue will confirm shortly.");
      setBookingModal(null);
      setBookingForm({ date: "", guests: "", name: "", email: "", phone: "" });
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  const filtered = mockVenues.filter((v) => {
    const matchType = selectedType === "All" || v.type === selectedType;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Venue Marketplace</div>
            <h1>Discover Venues</h1>
            <p>Find and book the perfect venue for your event.</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "1rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search venues by name or location..." className="auth-input" style={{ paddingLeft: "36px" }} />
          </div>
        </div>

        {/* Venue Type Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {venueTypes.map((t) => (
            <button key={t} onClick={() => setSelectedType(t)} style={{ padding: "6px 14px", borderRadius: "20px", border: selectedType === t ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: selectedType === t ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.8rem" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Venue Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filtered.map((venue) => (
            <div key={venue.id} className="glass" style={{ borderRadius: "16px", overflow: "hidden", transition: "transform 0.2s" }}>
              <div style={{ position: "relative", height: "200px" }}>
                <img src={venue.image} alt={venue.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "6px" }}>
                  <button onClick={() => toggleFavorite(venue.id)} style={{ padding: "6px", borderRadius: "50%", background: favorites.includes(venue.id) ? "#ef4444" : "rgba(0,0,0,0.5)", border: "none", color: "#000", cursor: "pointer" }}>
                    <Heart size={16} fill={favorites.includes(venue.id) ? "#000" : "none"} />
                  </button>
                </div>
                {!venue.available && (
                  <div style={{ position: "absolute", top: "10px", left: "10px", padding: "4px 10px", borderRadius: "6px", background: "#ef4444", color: "#000", fontSize: "0.75rem", fontWeight: 600 }}>
                    Unavailable
                  </div>
                )}
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div>
                    <h3 style={{ color: "#000", fontSize: "1rem", marginBottom: "4px" }}>{venue.name}</h3>
                    <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={12} /> {venue.location}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#fbbf24", fontSize: "0.85rem" }}>
                    <Star size={14} fill="#fbbf24" /> {venue.rating} <span style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>({venue.reviews})</span>
                  </div>
                </div>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", marginBottom: "10px" }}>{venue.description}</p>
                <div style={{ display: "flex", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <span style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Users size={12} /> Up to {venue.capacity}
                  </span>
                  <span style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}>
                    <DollarSign size={12} /> ₦{venue.price.toLocaleString()}/event
                  </span>
                </div>
                <div style={{ display: "flex", gap: "4px", marginBottom: "12px", flexWrap: "wrap" }}>
                  {venue.amenities.map((a) => (
                    <span key={a} style={{ padding: "2px 8px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.7rem" }}>{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setSelectedVenue(venue)} style={{ flex: 1, padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.08)", border: "none", color: "#000", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <Eye size={14} /> View Details
                  </button>
                  <button
                    onClick={() => venue.available && setBookingModal(venue)}
                    disabled={!venue.available}
                    style={{ flex: 1, padding: "8px", borderRadius: "8px", background: venue.available ? "linear-gradient(135deg, #fbbf24, #d97706)" : "rgba(0,0,0,0.05)", border: "none", color: venue.available ? "#000" : "rgba(0,0,0,0.3)", cursor: venue.available ? "pointer" : "not-allowed", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <Calendar size={14} /> Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Venue Detail Modal */}
        {selectedVenue && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
            <div className="glass" style={{ borderRadius: "16px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflow: "auto" }}>
              <img src={selectedVenue.image} alt={selectedVenue.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "16px 16px 0 0" }} />
              <div style={{ padding: "20px" }}>
                <h2 style={{ color: "#fbbf24", marginBottom: "8px" }}>{selectedVenue.name}</h2>
                <p style={{ color: "rgba(0,0,0,0.5)", marginBottom: "16px" }}>{selectedVenue.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                  <div className="glass" style={{ padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>Capacity</p>
                    <p style={{ color: "#000", fontWeight: 600 }}>{selectedVenue.capacity} guests</p>
                  </div>
                  <div className="glass" style={{ padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>Price</p>
                    <p style={{ color: "#fbbf24", fontWeight: 600 }}>₦{selectedVenue.price.toLocaleString()}</p>
                  </div>
                </div>
                <h4 style={{ color: "#000", marginBottom: "8px" }}>Amenities</h4>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                  {selectedVenue.amenities.map((a) => (
                    <span key={a} style={{ padding: "4px 12px", borderRadius: "20px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.8rem" }}>{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setBookingModal(selectedVenue)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "linear-gradient(135deg, #fbbf24, #d97706)", border: "none", color: "#000", fontWeight: 600, cursor: "pointer" }}>Book This Venue</button>
                  <button onClick={() => setSelectedVenue(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", border: "none", color: "#000", cursor: "pointer" }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {bookingModal && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1001, padding: "1rem" }}>
            <form onSubmit={handleBooking} className="glass" style={{ padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "450px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "0.5rem" }}>Book: {bookingModal.name}</h3>
              <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.85rem", marginBottom: "1rem" }}>₦{bookingModal.price.toLocaleString()} per event</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input className="auth-input" type="date" value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} required />
                <input className="auth-input" type="number" placeholder="Number of Guests" value={bookingForm.guests} onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })} required />
                <input className="auth-input" placeholder="Your Full Name" value={bookingForm.name} onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })} required />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <input className="auth-input" type="email" placeholder="Email" value={bookingForm.email} onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })} required />
                  <input className="auth-input" type="tel" placeholder="Phone" value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button type="submit" className="auth-submit" style={{ flex: 1 }}>Submit Booking</button>
                <button type="button" onClick={() => setBookingModal(null)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", color: "#000", border: "none", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
