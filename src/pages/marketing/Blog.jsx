import { Calendar, ArrowRight, Tag } from "lucide-react";

const posts = [
  { title: "The Future of Event Planning in Africa", excerpt: "How technology is transforming the way Africans plan and execute events, from weddings to corporate conferences.", date: "Jan 15, 2026", category: "Industry", readTime: "5 min" },
  { title: "10 Tips for Choosing the Perfect Wedding Venue", excerpt: "A comprehensive guide to selecting the right venue for your dream wedding without breaking the bank.", date: "Jan 10, 2026", category: "Planning", readTime: "7 min" },
  { title: "How Oma AI is Revolutionizing Event Management", excerpt: "Discover how artificial intelligence is making event planning faster, smarter, and more efficient.", date: "Jan 5, 2026", category: "Technology", readTime: "4 min" },
  { title: "Budget-Friendly Corporate Event Ideas", excerpt: "Creative and professional corporate event ideas that won't stretch your budget.", date: "Dec 28, 2025", category: "Corporate", readTime: "6 min" },
  { title: "Vendor Spotlight: Top Caterers in Lagos", excerpt: "Meet the top-rated caterers making waves in Lagos with exceptional food and service.", date: "Dec 20, 2025", category: "Vendors", readTime: "5 min" },
  { title: "Understanding Escrow Payments for Events", excerpt: "Why escrow payments protect both clients and vendors, and how OMA Pay makes it seamless.", date: "Dec 15, 2025", category: "Finance", readTime: "4 min" },
];

export default function Blog() {
  return (
    <div style={{ background: "#000", color: "#000", minHeight: "100vh" }}>
      <section style={{ padding: "120px 20px 60px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "16px" }}>
            Blog & <span style={{ color: "#fbbf24" }}>Resources</span>
          </h1>
          <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "1.1rem" }}>
            Insights, guides, and stories from the event industry.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {posts.map((post, i) => (
            <div key={i} style={{ borderRadius: "16px", background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s" }}>
              <div style={{ height: "160px", background: `linear-gradient(135deg, rgba(251,191,36,${0.1 + i * 0.03}), rgba(0,0,0,0.5))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "2rem", color: "#fbbf24", fontWeight: 800, opacity: 0.3 }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}><Calendar size={12} /> {post.date}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#fbbf24", fontSize: "0.75rem" }}><Tag size={12} /> {post.category}</span>
                  <span style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "8px", lineHeight: 1.3 }}>{post.title}</h3>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem", lineHeight: 1.6 }}>{post.excerpt}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "12px", color: "#fbbf24", fontSize: "0.85rem", fontWeight: 500 }}>
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
