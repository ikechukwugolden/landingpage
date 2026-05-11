import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Star,
  BarChart3,
  Users,
  CreditCard,
  Bot,
  LayoutDashboard,
  Search,
  ChevronRight,
  MessageCircle,
  Share2,
  AtSign,
  Mail,
  Sparkles,
  Crown,
  Diamond,
} from "lucide-react";

// --- Data Constants ---

const navLinks = [
  { href: "#bookings", label: "Book Services" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-oma", label: "Why OMA" },
  { href: "#closing", label: "Get Started" },
];

const heroHighlights = [
  "Trusted vendors",
  "Smart budgeting",
  "Secure payments",
];

const valuePoints = [
  "No more scattered WhatsApp chats.",
  "No more unreliable vendors.",
  "No more budget surprises.",
];

const coreFeatures = [
  {
    icon: <LayoutDashboard className="feature-icon" />,
    title: "Smart Planning Dashboard",
    text: "Plan your entire event with timelines, tasks, and real-time collaboration.",
  },
  {
    icon: <Search className="feature-icon" />,
    title: "Verified Vendor Marketplace",
    text: "Discover trusted vendors with real reviews, ratings, and portfolios.",
  },
  {
    icon: <BarChart3 className="feature-icon" />,
    title: "Budget and Expense Control",
    text: "Track every cost, avoid overspending, and stay in control.",
  },
  {
    icon: <Bot className="feature-icon" />,
    title: "Oma AI Assistant",
    text: "Get intelligent recommendations for vendors, themes, and timelines.",
  },
  {
    icon: <CreditCard className="feature-icon" />,
    title: "Secure Payments with OmaPay",
    text: "Pay vendors safely with escrow protection and digital contracts.",
  },
  {
    icon: <Users className="feature-icon" />,
    title: "Guest and RSVP Management",
    text: "Manage invitations, seating, and guest check-ins effortlessly.",
  },
];

const problemPoints = [
  "Too many vendors, no trust",
  "Endless calls and messages",
  "No clear budget control",
  "Everything feels disorganized",
];

const proofPoints = [
  "Thousands of vendors ready to work",
  "Smart tools used by modern planners",
  "Designed for African event culture",
];

const steps = [
  {
    step: "01",
    title: "Create Your Event",
    text: "Set your date, budget, and vision.",
  },
  {
    step: "02",
    title: "Find Vendors",
    text: "Browse and book verified professionals.",
  },
  {
    step: "03",
    title: "Manage Everything",
    text: "Track tasks, payments, and progress.",
  },
  {
    step: "04",
    title: "Execute Seamlessly",
    text: "Enjoy your event without stress.",
  },
];

const positioningPoints = [
  "Planning software",
  "Vendor marketplace",
  "Payment infrastructure",
  "AI-powered automation",
];

const whyOmaPoints = [
  "Verified vendors you can trust",
  "Secure escrow payments",
  "AI-powered planning assistance",
  "Built for African realities",
  "Everything in one platform",
];

const serviceBookings = [
  {
    title: "Weddings",
    text: "Book full planning, coordination, decor, catering, and guest-flow support for memorable wedding celebrations.",
  },
  {
    title: "Baby Showers",
    text: "Create beautiful intimate moments with styling, food service, setup, and stress-free coordination.",
  },
  {
    title: "Bridal Showers",
    text: "Plan elegant pre-wedding experiences with trusted vendors, curated themes, and smooth execution.",
  },
  {
    title: "Decoration",
    text: "Find decorators for event styling, floral direction, stage setup, table design, and venue transformation.",
  },
  {
    title: "Interior Decor",
    text: "Book interior styling support for event-ready spaces, private celebrations, and premium visual presentation.",
  },
];

const taglines = [
  "Where Events Come Together.",
  "Plan Smart. Celebrate Better.",
  "Africa's Event Operating System.",
  "From Idea to Celebration - Seamlessly.",
  "No Chaos. Just Perfect Events.",
];

// --- Components ---

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}

function FloatingParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            top: `${15 + i * 15}%`,
            left: `${10 + i * 15}%`,
            opacity: 0.3,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#home" className="brand">
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
            <Crown size={20} />
          </div>
          <span className="brand-name">OMA Events</span>
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <button className="nav-cta">
            <Sparkles size={14} style={{ marginRight: "6px" }} />
            Get Started
          </button>
        </div>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <button className="mobile-cta">Get Started</button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="ping-dot">
                <span className="ping-ring" />
                <span className="ping-core" />
              </span>
              Africa's Event Operating System
            </div>

            <h1 className="hero-title">
              Plan Perfect Events. <br />
              <span className="hero-gradient-text">Without the Chaos.</span>
            </h1>

            <div className="gold-ornament-left" />

            <p className="hero-lead">
              OMA EVENTS is Africa's first all-in-one platform to plan, manage,
              and execute events with trusted vendors, smart budgeting, and
              secure payments.
            </p>

            <div className="hero-actions">
              <a href="#closing" className="btn-primary">
                Start Planning Your Event <ArrowRight size={18} />
              </a>
              <a href="#features" className="btn-secondary">
                Explore Vendors
              </a>
            </div>

            <div className="hero-trust">
              <p className="hero-trust-text">
                Trusted by planners, vendors, and creators across Africa
              </p>
              <div className="hero-highlights">
                {heroHighlights.map((item) => (
                  <div key={item} className="highlight-item">
                    <CheckCircle2 className="highlight-icon" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="visual-card">
              <img
                src="/oma-logo.jpeg"
                alt="OMA Events flyer and service showcase"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "1rem",
                }}
              />

              <div className="visual-badge">
                <Star className="badge-icon" />
              </div>

              <div className="visual-status">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="stats-band">
      <div className="container stats-grid">
        {proofPoints.map((point, i) => (
          <div key={i} className="stat-card">
            <div className="stat-badge">
              {i === 0 ? <Diamond size={16} /> : i === 1 ? <Sparkles size={16} /> : <Crown size={16} />}
            </div>
            <span className="stat-text">{point}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ValueProp() {
  return (
    <section className="section" id="summary">
      <div className="container">
        <div className="section-intro">
          <p className="section-eyebrow">Value Proposition</p>
          <h2 className="section-title">
            Everything you need to plan an event in one place.
          </h2>
          <div className="gold-ornament" />
          <p className="section-desc">
            OMA EVENTS gives you a centralized system to plan, collaborate, pay,
            and execute your event from idea to celebration.
          </p>
        </div>

        <div className="value-grid">
          {valuePoints.map((item, i) => (
            <div key={i} className="value-card">
              <div className="gold-corner gold-corner-tl" />
              <div className="gold-corner gold-corner-br" />
              <div className="value-icon-box">
                <CheckCircle2 className="value-icon" />
              </div>
              <p className="value-text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bookings() {
  return (
    <section className="section section-alt" id="bookings">
      <div className="container">
        <div className="section-intro">
          <p className="section-eyebrow">Book With OMA</p>
          <h2 className="section-title">
            Clients can book the moments that matter most.
          </h2>
          <div className="gold-ornament" style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)" }} />
          <p className="section-desc">
            From weddings to interior decor, OMA EVENTS should be where clients
            discover services, compare trusted options, and book with
            confidence.
          </p>
        </div>

        <div className="booking-grid">
          {serviceBookings.map((service, i) => (
            <div key={i} className="booking-card">
              <span className="booking-tag">Book Now</span>
              <h3 className="booking-title">{service.title}</h3>
              <p className="booking-text">{service.text}</p>
              <a href="#closing" className="booking-action">
                Book {service.title} <ChevronRight className="action-icon" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-intro">
          <p className="section-eyebrow">Core Features</p>
          <h2 className="section-title">Benefits first, stress out.</h2>
          <div className="gold-ornament" />
          <p className="section-desc">
            From planning to payment, every part of the event workflow lives
            inside one smart system.
          </p>
        </div>

        <div className="features-grid">
          {coreFeatures.map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-box">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="split-section" id="solution">
      <div className="container">
        <div className="split-grid">
          <div>
            <div className="problem-header">
              <p className="section-eyebrow">Problem</p>
              <h2 className="section-title">
                Event planning is broken. We fixed it.
              </h2>
              <div className="gold-ornament-left" />
            </div>

            <div className="problem-list">
              {problemPoints.map((point, i) => (
                <div key={i} className="problem-item">
                  <div className="problem-dot" />
                  <p className="problem-text">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="solution-panel">
            <p className="solution-eyebrow">Solution</p>
            <h3 className="solution-title">
              OMA EVENTS brings structure, transparency, and control into your
              event.
            </h3>
            <p className="solution-text">
              Everything you need to plan, manage vendors, control budgets, and
              execute with confidence now lives in one platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-intro">
          <p className="section-eyebrow">How It Works</p>
          <h2 className="section-title">Plan your event in 4 simple steps.</h2>
          <div className="gold-ornament" />
        </div>

        <div className="steps-grid">
          {steps.map((item, i) => (
            <div key={i} className="step-card">
              <span className="step-number">{item.step}</span>
              <div className="step-content">
                <h3 className="step-title">{item.title}</h3>
                <p className="step-text">{item.text}</p>
              </div>
              {i !== steps.length - 1 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-intro">
          <p className="section-eyebrow">Product Positioning</p>
          <h2 className="section-title">
            Not just an app. An Event Operating System.
          </h2>
          <div className="gold-ornament" style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.5), transparent)" }} />
          <p className="section-desc">
            OMA EVENTS combines planning software, vendor discovery, payment
            infrastructure, and AI-powered automation into one powerful
            ecosystem for modern event execution.
          </p>
        </div>

        <div className="positioning-grid">
          {positioningPoints.map((item, i) => (
            <div key={i} className="positioning-chip">
              <span className="chip-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyOma() {
  return (
    <section className="section" id="why-oma">
      <div className="container">
        <div className="section-intro">
          <p className="section-eyebrow">Why OMA Events Wins</p>
          <h2 className="section-title">Why OMA EVENTS is different.</h2>
          <div className="gold-ornament" />
        </div>

        <div className="why-grid">
          {whyOmaPoints.map((point, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">+</div>
              <p className="why-text">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmotionalClose() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="emotional-grid">
          <div className="quote-box">
            <h3 className="quote-title">
              "Every event tells a story. Make yours unforgettable."
            </h3>
            <p className="quote-author">— OMA Events</p>
          </div>

          <div className="emotional-content">
            <p className="emotional-eyebrow">Emotional Close</p>
            <h3 className="emotional-title">
              Bring your vision to life without stress, confusion, or
              compromise.
            </h3>
            <p className="emotional-text">
              OMA EVENTS gives you the tools, the structure, and the confidence
              to create memorable celebrations with clarity from start to
              finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="cta-section" id="closing">
      <div className="cta-glow" />
      <div className="cta-content">
        <p className="cta-eyebrow">Final CTA</p>
        <h2 className="cta-title">
          Start planning <span className="cta-gradient">smarter today.</span>
        </h2>
        <p className="cta-desc">
          Join the future of event planning in Africa with a platform built for
          trust, beauty, and seamless execution.
        </p>
        <div className="cta-actions">
          <a href="#home" className="btn-primary">
            <Sparkles size={18} style={{ marginRight: "8px" }} />
            Get Started Free
          </a>
          <a href="#features" className="btn-secondary">
            Browse Vendors
          </a>
        </div>
        <p className="cta-note">
          Structured planning. Verified vendors. Secure payments.
        </p>
      </div>
    </section>
  );
}

function Taglines() {
  return (
    <section className="taglines-section">
      <div className="marquee-track">
        {[...taglines, ...taglines].map((tagline, i) => (
          <span key={i} className="marquee-text">
            {tagline}
          </span>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Crown size={16} />
              </div>
              <span className="footer-logo-text">OMA Events</span>
            </div>
            <p className="footer-desc">
              Africa's first all-in-one platform to plan, manage, and execute
              events with elegance and precision.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <MessageCircle className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Share2 className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <AtSign className="social-icon" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li>
                <a href="#features" className="footer-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#bookings" className="footer-link">
                  Book Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="footer-link">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 OMA Events Inc. All rights reserved.
          </p>
          <p>Powered by </p>
          <div className="footer-contact">
            <Mail className="contact-icon" />
            hello@omaevents.com
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <ScrollProgress />
      <FloatingParticles />
      <Navbar />
      <Hero />
      <StatsBand />
      <ValueProp />
      <Bookings />
      <Features />
      <ProblemSolution />
      <HowItWorks />
      <Positioning />
      <WhyOma />
      <EmotionalClose />
      <ClosingCTA />
      <Taglines />
      <Footer />
    </div>
  );
}

export default App;