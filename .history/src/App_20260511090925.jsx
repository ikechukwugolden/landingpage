import { useState } from 'react'

const navLinks = [
  { href: '#bookings', label: 'Book Services' },
  { href: '#features', label: 'Features' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#why-oma', label: 'Why OMA' },
  { href: '#closing', label: 'Get Started' },
]

const heroHighlights = [
  'Trusted vendors',
  'Smart budgeting',
  'Secure payments',
]

const valuePoints = [
  'No more scattered WhatsApp chats.',
  'No more unreliable vendors.',
  'No more budget surprises.',
]

const coreFeatures = [
  {
    icon: '01',
    title: 'Smart Planning Dashboard',
    text: 'Plan your entire event with timelines, tasks, and real-time collaboration.',
  },
  {
    icon: '02',
    title: 'Verified Vendor Marketplace',
    text: 'Discover trusted vendors with real reviews, ratings, and portfolios.',
  },
  {
    icon: '03',
    title: 'Budget and Expense Control',
    text: 'Track every cost, avoid overspending, and stay in control.',
  },
  {
    icon: '04',
    title: 'Oma AI Assistant',
    text: 'Get intelligent recommendations for vendors, themes, and timelines.',
  },
  {
    icon: '05',
    title: 'Secure Payments with OmaPay',
    text: 'Pay vendors safely with escrow protection and digital contracts.',
  },
  {
    icon: '06',
    title: 'Guest and RSVP Management',
    text: 'Manage invitations, seating, and guest check-ins effortlessly.',
  },
]

const problemPoints = [
  'Too many vendors, no trust',
  'Endless calls and messages',
  'No clear budget control',
  'Everything feels disorganized',
]

const proofPoints = [
  'Thousands of vendors ready to work',
  'Smart tools used by modern planners',
  'Designed for African event culture',
]

const steps = [
  {
    step: '01',
    title: 'Create Your Event',
    text: 'Set your date, budget, and vision.',
  },
  {
    step: '02',
    title: 'Find Vendors',
    text: 'Browse and book verified professionals.',
  },
  {
    step: '03',
    title: 'Manage Everything',
    text: 'Track tasks, payments, and progress.',
  },
  {
    step: '04',
    title: 'Execute Seamlessly',
    text: 'Enjoy your event without stress.',
  },
]

const positioningPoints = [
  'Planning software',
  'Vendor marketplace',
  'Payment infrastructure',
  'AI-powered automation',
]

const whyOmaPoints = [
  'Verified vendors you can trust',
  'Secure escrow payments',
  'AI-powered planning assistance',
  'Built for African realities',
  'Everything in one platform',
]

const serviceBookings = [
  {
    title: 'Weddings',
    text: 'Book full planning, coordination, decor, catering, and guest-flow support for memorable wedding celebrations.',
  },
  {
    title: 'Baby Showers',
    text: 'Create beautiful intimate moments with styling, food service, setup, and stress-free coordination.',
  },
  {
    title: 'Bridal Showers',
    text: 'Plan elegant pre-wedding experiences with trusted vendors, curated themes, and smooth execution.',
  },
  {
    title: 'Decoration',
    text: 'Find decorators for event styling, floral direction, stage setup, table design, and venue transformation.',
  },
  {
    title: 'Interior Decor',
    text: 'Book interior styling support for event-ready spaces, private celebrations, and premium visual presentation.',
  },
]

const portfolioLayers = [
  {
    label: 'Hook Layer',
    title: 'Import Social Proof',
    text: 'Let vendors connect Instagram or TikTok and pull in visual proof so onboarding feels fast and familiar.',
  },
  {
    label: 'Core Layer',
    title: 'Build Native OMA Portfolios',
    text: 'Structured categories, pricing, availability, verified reviews, and case studies help clients choose confidently.',
  },
  {
    label: 'Power Layer',
    title: 'Enable Trusted Transactions',
    text: 'Booking, OmaPay escrow, milestone releases, and digital agreements turn discovery into real business.',
  },
]

const taglines = [
  'Where Events Come Together.',
  'Plan Smart. Celebrate Better.',
  "Africa's Event Operating System.",
  'From Idea to Celebration - Seamlessly.',
  'No Chaos. Just Perfect Events.',
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="topbar__bar">
          <a className="brand-mark" href="#home" aria-label="OMA Events home">
            <img className="brand-mark__logo" src="/oma-logo.jpeg" alt="OMA Events logo" />
            <span className="brand-mark__name">OMA Events</span>
          </a>

          <button
            aria-controls="primary-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`topbar__toggle${menuOpen ? ' topbar__toggle--open' : ''}`}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          id="primary-navigation"
          className={`topbar__nav${menuOpen ? ' topbar__nav--open' : ''}`}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero__content">
            <p className="eyebrow">Africa&apos;s Event Operating System</p>
            <h1>
              Plan Perfect Events.
              <span> Without the Chaos.</span>
            </h1>
            <p className="hero__lead">
              OMA EVENTS is Africa&apos;s first all-in-one platform to plan,
              manage, and execute events with trusted vendors, smart budgeting,
              secure payments, and premium service booking for every celebration.
            </p>

            <div className="hero__actions">
              <a className="button button--dark" href="#closing">
                Start Planning Your Event
              </a>
              <a className="button button--light" href="#features">
                Explore Vendors
              </a>
            </div>

            <p className="hero__trust">
              Trusted by planners, vendors, and creators across Africa
            </p>

            <div className="hero__meta">
              {heroHighlights.map((item) => (
                <div key={item}>
                  <span className="meta-label">Built For</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__visual">
            <div className="showcase-card">
              <img src="/oma-flyer.jpeg" alt="OMA Events flyer and service showcase" />
              <div className="showcase-badge">Gold Standard Events</div>
            </div>
            <div className="hero__quote">
              <p>Social media helps vendors get discovered. OMA helps them get chosen, trusted, and paid.</p>
            </div>
          </div>
        </section>

        <section className="stats-band">
          {proofPoints.map((point) => (
            <article key={point}>
              <strong>OMA</strong>
              <span>{point}</span>
            </article>
          ))}
        </section>

        <section className="section" id="summary">
          <div className="section__intro">
            <p className="eyebrow">Value Proposition</p>
            <h2>Everything you need to plan an event in one place.</h2>
            <p>
              OMA EVENTS gives you a centralized system to plan, collaborate,
              pay, and execute your event from idea to celebration.
            </p>
          </div>

          <div className="feature-strip feature-strip--trio">
            {valuePoints.map((item) => (
              <article className="feature-tile" key={item}>
                <span />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="bookings">
          <div className="section__intro">
            <p className="eyebrow">Book With OMA</p>
            <h2>Clients can book the moments that matter most.</h2>
            <p>
              From weddings to interior decor, OMA EVENTS should be where
              clients discover services, compare trusted options, and book with
              confidence.
            </p>
          </div>

          <div className="booking-grid">
            {serviceBookings.map((service) => (
              <article className="booking-card" key={service.title}>
                <span className="booking-card__tag">Book Now</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a className="booking-card__action" href="#closing">
                  Book {service.title}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="features">
          <div className="section__intro">
            <p className="eyebrow">Core Features</p>
            <h2>Benefits first, stress out.</h2>
            <p>
              From planning to payment, every part of the event workflow lives
              inside one smart system.
            </p>
          </div>

          <div className="cards-grid cards-grid--wide">
            {coreFeatures.map((feature) => (
              <article className="info-card feature-card" key={feature.title}>
                <span className="feature-card__index">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="portfolio">
          <div className="section__intro">
            <p className="eyebrow">Vendor Portfolio Strategy</p>
            <h2>Use social proof to attract vendors, then let OMA close the trust gap.</h2>
            <p>
              Instagram and TikTok are powerful marketing layers, but OMA
              EVENTS should be the operating system where vendors are evaluated,
              booked, and paid.
            </p>
          </div>

          <div className="portfolio-grid">
            {portfolioLayers.map((layer) => (
              <article className="portfolio-card" key={layer.title}>
                <span className="portfolio-card__label">{layer.label}</span>
                <h3>{layer.title}</h3>
                <p>{layer.text}</p>
              </article>
            ))}
          </div>

          <article className="portfolio-callout">
            <p>
              Instagram and TikTok are the showcase. OMA EVENTS is the execution
              layer. That is how the platform becomes infrastructure, not just a
              marketplace.
            </p>
          </article>
        </section>

        <section className="section section--split" id="solution">
          <div>
            <div className="section__intro">
              <p className="eyebrow">Problem</p>
              <h2>Event planning is broken. We fixed it.</h2>
            </div>

            <div className="bullet-panel">
              {problemPoints.map((point) => (
                <div className="bullet-row" key={point}>
                  <span className="bullet-row__dot" />
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </div>

          <article className="panel panel--dark panel--solution">
            <p className="eyebrow">Solution</p>
            <h3>OMA EVENTS brings structure, transparency, and control into your event.</h3>
            <p>
              Everything you need to plan, manage vendors, control budgets, and
              execute with confidence now lives in one platform.
            </p>
          </article>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Social Proof</p>
            <h2>Built for Africa. Designed for excellence.</h2>
            <p>
              From weddings to corporate events, OMA EVENTS is transforming how
              celebrations are planned across the continent.
            </p>
          </div>

          <div className="cards-grid">
            {proofPoints.map((point) => (
              <article className="info-card" key={point}>
                <h3>{point}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="how-it-works">
          <div className="section__intro">
            <p className="eyebrow">How It Works</p>
            <h2>Plan your event in 4 simple steps.</h2>
          </div>

          <div className="roadmap-grid roadmap-grid--four">
            {steps.map((item) => (
              <article className="roadmap-card step-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Product Positioning</p>
            <h2>Not just an app. An Event Operating System.</h2>
            <p>
              OMA EVENTS combines planning software, vendor discovery, payment
              infrastructure, and AI-powered automation into one powerful
              ecosystem for modern event execution.
            </p>
          </div>

          <div className="architecture-strip architecture-strip--four">
            {positioningPoints.map((item) => (
              <div className="architecture-chip" key={item}>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="why-oma">
          <div className="section__intro">
            <p className="eyebrow">Why OMA Events Wins</p>
            <h2>Why OMA EVENTS is different.</h2>
          </div>

          <div className="check-grid">
            {whyOmaPoints.map((point) => (
              <article className="check-card" key={point}>
                <span className="check-card__icon">+</span>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--split">
          <article className="quote-card">
            <p>Every event tells a story. Make yours unforgettable.</p>
          </article>

          <article className="panel">
            <p className="eyebrow">Emotional Close</p>
            <h3>Bring your vision to life without stress, confusion, or compromise.</h3>
            <p>
              OMA EVENTS gives you the tools, the structure, and the confidence
              to create memorable celebrations with clarity from start to
              finish.
            </p>
          </article>
        </section>

        <section className="section section--closing" id="closing">
          <article className="closing-card">
            <p className="eyebrow">Final CTA</p>
            <h2>
              Start planning
              <span> smarter today.</span>
            </h2>
            <p className="closing-card__subtext">
              Join the future of event planning in Africa with a platform built
              for trust, beauty, and seamless execution.
            </p>
            <div className="hero__actions hero__actions--center closing-card__actions">
              <a className="button button--dark" href="#home">
                Get Started Free
              </a>
              <a className="button button--light" href="#features">
                Browse Vendors
              </a>
            </div>
            <div className="closing-card__note">
              Structured planning. Verified vendors. Secure payments.
            </div>
          </article>
        </section>

        <section className="section section--tags">
          <div className="tagline-strip">
            {taglines.map((tagline) => (
              <span key={tagline}>{tagline}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
