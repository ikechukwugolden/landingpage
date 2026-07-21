import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  { q: "What is OMA Events?", a: "OMA Events is Africa's first Event Operating System (Event-OS). It combines event planning, vendor marketplace, payment infrastructure, AI-powered automation, and social networking into one platform." },
  { q: "How does OMA Pay work?", a: "OMA Pay is our built-in fintech system. It includes a wallet for funding, escrow payments to protect both clients and vendors, milestone-based payments, and digital contracts. Payments are secure and transparent." },
  { q: "What is Oma AI?", a: "Oma AI is our intelligent event assistant powered by Google Gemini. It can help you plan events, create budgets, generate timelines, recommend vendors, and provide logistics support — all through natural conversation." },
  { q: "How are vendors verified?", a: "Every vendor on OMA Events goes through a verification process. Our team reviews their portfolio, certifications, and track record before approving them on the platform. Verified vendors get a trust badge." },
  { q: "Can I use OMA Events for free?", a: "Yes! Our Starter plan is completely free and includes 1 event, basic dashboard, vendor browsing, and limited OMA AI access. You can upgrade to Professional or Enterprise for advanced features." },
  { q: "How does the vendor marketplace work?", a: "Vendors create profiles with their portfolio, pricing, and availability. Clients can browse, filter by category and location, compare options, read reviews, and book vendors directly through the platform." },
  { q: "Is my data secure?", a: "Absolutely. We use Firebase Authentication and Firestore security rules to protect your data. All payments are processed through secure channels with encryption. We never share your data with third parties." },
  { q: "Can I manage multiple events?", a: "Professional plan users can manage up to 10 events simultaneously. Enterprise users get unlimited events with multi-team management, staff permissions, and branch support." },
  { q: "What industries does OMA Events serve?", a: "OMA Events serves weddings, birthdays, baby showers, bridal showers, corporate events, conferences, concerts, and more. Our platform is designed for all event types." },
  { q: "How do I become a vendor on OMA?", a: "Sign up for an account, select 'Vendor' as your role during onboarding, complete your business profile with portfolio and pricing, then submit for verification. Our team reviews within 48 hours." },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ background: "#000", color: "#000", minHeight: "100vh" }}>
      <section style={{ padding: "120px 20px 60px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "20px", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24", fontSize: "0.85rem", marginBottom: "24px" }}>
            <HelpCircle size={16} /> FAQs
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "16px" }}>
            Frequently Asked <span style={{ color: "#fbbf24" }}>Questions</span>
          </h1>
          <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1.1rem" }}>
            Everything you need to know about OMA Events.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderRadius: "12px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden" }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", color: "#000", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontSize: "1rem", fontWeight: 500 }}>{faq.q}</span>
                {openIndex === i ? <ChevronUp size={20} style={{ color: "#fbbf24", flexShrink: 0 }} /> : <ChevronDown size={20} style={{ color: "rgba(0,0,0,0.3)", flexShrink: 0 }} />}
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 24px 20px", color: "rgba(0,0,0,0.6)", fontSize: "0.95rem", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
