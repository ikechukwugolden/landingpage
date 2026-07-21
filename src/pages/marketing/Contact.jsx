import { useState } from "react";
import { Send, Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ background: "#000", color: "#000", minHeight: "100vh" }}>
      <section style={{ padding: "120px 20px 60px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "16px" }}>
            Get in <span style={{ color: "#fbbf24" }}>Touch</span>
          </h1>
          <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1.1rem" }}>
            Have questions? We would love to hear from you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "24px" }}>Contact Information</h3>
            {[
              { icon: <Mail size={20} />, label: "Email", value: "hello@omaevents.com", href: "mailto:hello@omaevents.com" },
              { icon: <Phone size={20} />, label: "Phone", value: "+234 800 OMA EVENT", href: "tel:+23480006238368" },
              { icon: <MapPin size={20} />, label: "Address", value: "Lagos, Nigeria", href: "#" },
              { icon: <Clock size={20} />, label: "Hours", value: "Mon - Fri, 9am - 6pm WAT", href: "#" },
              { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "Chat with us", href: "#" },
            ].map((item, i) => (
              <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "12px", background: "rgba(0,0,0,0.03)", marginBottom: "12px", textDecoration: "none" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(251,191,36,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24" }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem" }}>{item.label}</p>
                  <p style={{ color: "#000", fontSize: "0.95rem" }}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div style={{ padding: "32px", borderRadius: "16px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)" }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "24px" }}>Send a Message</h3>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#22c55e" }}>
                  <Send size={28} />
                </div>
                <h4 style={{ marginBottom: "8px" }}>Message Sent!</h4>
                <p style={{ color: "rgba(0,0,0,0.5)" }}>We will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: "16px", padding: "8px 20px", borderRadius: "8px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", cursor: "pointer" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.95rem" }} />
                <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.95rem" }} />
                <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.95rem" }} />
                <textarea placeholder="Your Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows="5" required style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.95rem", resize: "vertical" }} />
                <button type="submit" style={{ padding: "14px", borderRadius: "10px", background: "linear-gradient(135deg, #fbbf24, #d97706)", border: "none", color: "#000", fontWeight: 700, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <Send size={18} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
