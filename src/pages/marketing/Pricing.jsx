import { Link } from "react-router-dom";
import { Check, Crown, Star, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for individuals planning their first event.",
    features: ["1 Event", "Basic Dashboard", "Vendor Browse", "Budget Tracker", "OMA AI (Limited)", "Community Access"],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₦15,000",
    period: "/month",
    desc: "For professional planners managing multiple events.",
    features: ["Up to 10 Events", "Full Dashboard", "Vendor Marketplace", "Budget Management", "Guest Management", "OmaPay Wallet", "OMA AI (Full)", "Calendar Sync", "Priority Support", "Analytics"],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "₦500,000",
    period: "/year",
    desc: "For organizations and large-scale event operations.",
    features: ["Unlimited Events", "Multi-Team Management", "Staff Permissions", "Multiple Branches", "Enterprise Billing", "White-label Support", "Custom Integrations", "Dedicated Account Manager", "SLA Guarantee", "OMA Cloud Storage", "API Access"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const addOns = [
  { name: "OMA Cloud Storage", price: "₦5,000/mo", desc: "Extra 100GB photo & video storage" },
  { name: "SMS Notifications", price: "₦2,000/mo", desc: "500 SMS credits for guest notifications" },
  { name: "WhatsApp Integration", price: "₦3,000/mo", desc: "Send invitations via WhatsApp" },
  { name: "Custom Branding", price: "₦10,000/mo", desc: "White-label your event pages" },
];

export default function Pricing() {
  return (
    <div style={{ background: "#000", color: "#000", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "120px 20px 60px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "20px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24", fontSize: "0.85rem", marginBottom: "24px" }}>
          <Star size={16} /> Pricing
        </div>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
          Simple, <span style={{ color: "#fbbf24" }}>Transparent</span> Pricing
        </h1>
        <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1.15rem", lineHeight: 1.7 }}>
          Start free and scale as your event business grows. No hidden fees.
        </p>
      </section>

      {/* Plans */}
      <section style={{ padding: "20px 20px 60px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
          {plans.map((plan, i) => (
            <div key={i} style={{
              padding: "32px",
              borderRadius: "16px",
              background: plan.highlighted ? "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(217,119,6,0.05))" : "rgba(0,0,0,0.03)",
              border: plan.highlighted ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.08)",
              position: "relative",
            }}>
              {plan.highlighted && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: "20px", background: "#fbbf24", color: "#000", fontSize: "0.75rem", fontWeight: 700 }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>{plan.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fbbf24" }}>{plan.price}</span>
                {plan.period && <span style={{ color: "rgba(0,0,0,0.4)" }}>{plan.period}</span>}
              </div>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.9rem", marginBottom: "24px" }}>{plan.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Check size={16} style={{ color: "#22c55e", flexShrink: 0 }} />
                    <span style={{ color: "rgba(0,0,0,0.7)", fontSize: "0.9rem" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/signup" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "12px", borderRadius: "10px",
                background: plan.highlighted ? "linear-gradient(135deg, #fbbf24, #d97706)" : "rgba(0,0,0,0.08)",
                color: plan.highlighted ? "#000" : "#000",
                fontWeight: 600, fontSize: "0.95rem",
                border: plan.highlighted ? "none" : "1px solid rgba(0,0,0,0.15)",
              }}>
                {plan.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "40px" }}>Add-ons</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {addOns.map((addon, i) => (
            <div key={i} style={{ padding: "20px", borderRadius: "12px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)" }}>
              <h4 style={{ marginBottom: "4px" }}>{addon.name}</h4>
              <p style={{ color: "#fbbf24", fontSize: "0.85rem", marginBottom: "8px" }}>{addon.price}</p>
              <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem" }}>{addon.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
