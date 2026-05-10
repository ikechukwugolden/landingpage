const executiveSummaryPoints = [
  'Smart planning tools',
  'Verified vendor marketplace',
  'Financial infrastructure with escrow and payments',
  'AI-powered automation',
  'Data analytics and community ecosystem',
]

const challengePoints = [
  'Fragmented communication across WhatsApp, calls, and spreadsheets',
  'Vendor unreliability and lack of trust',
  'Budget mismanagement and overspending',
  'No unified planning, payment, and coordination system',
  'Difficulty discovering verified vendors and venues',
  'Lack of real-time tracking and analytics',
  'Offline contracts and informal transactions',
]

const solutionLayers = [
  {
    title: 'Smart Planning System',
    text: 'Real-time dashboards, task timelines, collaboration spaces, and automated reminders bring structure to every event.',
  },
  {
    title: 'Verified Marketplace',
    text: 'Trusted vendors and venues with ratings, reviews, and performance tracking help clients book with confidence.',
  },
  {
    title: 'OmaPay Infrastructure',
    text: 'Escrow payments, smart contracts, and milestone-based releases create financial transparency and trust.',
  },
  {
    title: 'Oma AI Intelligence',
    text: 'AI-powered vendor recommendations, budget optimization, and predictive timelines improve planning quality.',
  },
  {
    title: 'Event Execution Tools',
    text: 'RSVP management, QR check-ins, seating workflows, and logistics planning support smooth event delivery.',
  },
  {
    title: 'Data and Analytics',
    text: 'Budget versus actual analysis, vendor performance metrics, and predictive insights improve future decisions.',
  },
  {
    title: 'Community Ecosystem',
    text: 'Vendor certification, learning hubs, and networking opportunities grow the ecosystem around the platform.',
  },
]

const architecture = [
  'SaaS Layer - Planning, dashboards, workflow',
  'Marketplace Layer - Vendors, venues, planners',
  'Fintech Layer - Payments, escrow, contracts',
  'AI Layer - Recommendations, automation, analytics',
  'Community Layer - Education, certification, rewards',
]

const revenueStreams = [
  'Freemium to premium subscription at $10/month',
  'Vendor listing and verification fees',
  '2% to 5% commission per booking',
  'Featured listings and promotions',
  'Enterprise SaaS through OmaPro',
  'Future token economy through OmaCoin',
]

const marketStats = [
  { label: 'Vendors', value: '100,000+' },
  { label: 'Planners', value: '10,000+' },
  { label: 'Events in Nigeria', value: '60,000+' },
]

const projections = [
  { year: '2025', users: '2,000', arr: '$240K', value: '$2.4M' },
  { year: '2026', users: '20,000', arr: '$2.4M', value: '$24M' },
  { year: '2027', users: '100,000', arr: '$12M', value: '$120M' },
  { year: '2028', users: '500,000', arr: '$60M', value: '$600M' },
  { year: '2029-2030', users: '1M+', arr: '$120M', value: '$1.2B+' },
]

const winPoints = [
  {
    title: 'First-Mover Advantage',
    text: 'First Event-OS in Africa combining SaaS, marketplace, fintech, and AI.',
  },
  {
    title: 'Localized Intelligence',
    text: 'Built specifically for African event culture and operating realities.',
  },
  {
    title: 'Trust Infrastructure',
    text: 'Verified vendors and escrow payments form a stronger transaction layer.',
  },
  {
    title: 'Data and AI Moat',
    text: 'Proprietary data and AI personalization create defensible long-term value.',
  },
  {
    title: 'Network Effects',
    text: 'More vendors, more clients, and more transactions reinforce platform growth.',
  },
  {
    title: 'Offline-Online Integration',
    text: 'OMA bridges WhatsApp, mobile, and web workflows in one ecosystem.',
  },
  {
    title: 'Community Lock-In',
    text: 'Certification, rewards, and ecosystem growth keep the network engaged.',
  },
]

const techStack = [
  'Frontend: React Native, Next.js',
  'Backend: Node.js, Express',
  'Database: MongoDB, Firebase',
  'Payments: Paystack, Flutterwave, OmaPay',
  'AI: OpenAI plus custom ML models',
  'AR/VR: Unity, WebXR',
  'Analytics: Data dashboards',
]

const competitiveRows = [
  {
    category: 'Event Tools',
    competitor: 'Eventbrite',
    limitation: 'Ticketing only',
  },
  {
    category: 'Vendor Platforms',
    competitor: 'WeddingWire',
    limitation: 'Listings only',
  },
  {
    category: 'Project Tools',
    competitor: 'Notion, Monday',
    limitation: 'Not event-specific',
  },
]

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    text: 'Launch the MVP in Lagos and onboard 200+ vendors.',
  },
  {
    phase: 'Phase 2',
    title: 'Growth',
    text: 'Expand across Nigeria and launch AI plus payment infrastructure.',
  },
  {
    phase: 'Phase 3',
    title: 'Intelligence',
    text: 'Add analytics, learning hubs, and deeper platform insight loops.',
  },
  {
    phase: 'Phase 4',
    title: 'Expansion',
    text: 'Enter new African markets and establish regional market presence.',
  },
  {
    phase: 'Phase 5',
    title: 'Domination',
    text: 'Reach 1M+ users, launch the token ecosystem, and prepare for IPO readiness.',
  },
]

const partnerships = [
  {
    title: 'Payment Providers',
    text: 'Partners like Paystack and Flutterwave strengthen the platform payment layer.',
  },
  {
    title: 'Event Venues',
    text: 'Hotels, halls, and destination venues expand trusted booking access.',
  },
  {
    title: 'Logistics Partners',
    text: 'Service providers support smooth execution, movement, and fulfillment.',
  },
  {
    title: 'Educational Institutions',
    text: 'Training and certification partnerships help grow the event ecosystem.',
  },
]

const coreValues = ['Trust', 'Innovation', 'Culture', 'Community', 'Excellence']

const futureVision = [
  'Event financing and insurance platform',
  'AI-driven event automation engine',
  'AR and VR event experiences',
  'Global celebration infrastructure',
]

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand-mark" href="#home" aria-label="OMA Events home">
          <img className="brand-mark__logo" src="/oma-logo.jpeg" alt="OMA Events logo" />
          <span className="brand-mark__name">OMA Events</span>
        </a>
        <nav className="topbar__nav" aria-label="Primary">
          <a href="#summary">Summary</a>
          <a href="#solution">Solution</a>
          <a href="#market">Market</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#closing">Positioning</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero__content">
            <p className="eyebrow">OMA Events Whitepaper</p>
            <h1>Reinventing event planning across Africa.</h1>
            <p className="hero__lead">
              OMA Events is a multi-layered Event Operating System designed to
              digitize the celebration economy with planning tools, trusted
              vendor discovery, financial infrastructure, AI automation, and
              ecosystem intelligence.
            </p>

            <div className="hero__actions">
              <a className="button button--dark" href="#market">
                View Market Opportunity
              </a>
              <a className="button button--light" href="#summary">
                Read the Vision
              </a>
            </div>

            <div className="hero__meta">
              <div>
                <span className="meta-label">Founder</span>
                <strong>Omalichawa Egwim</strong>
              </div>
              <div>
                <span className="meta-label">Editor</span>
                <strong>Victor Okere</strong>
              </div>
              <div>
                <span className="meta-label">Business Model</span>
                <strong>SaaS + Marketplace + Fintech + AI</strong>
              </div>
              <div>
                <span className="meta-label">Category</span>
                <strong>Event Operating System</strong>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="logo-card">
              <img src="/oma-logo.jpeg" alt="OMA Events logo" />
            </div>
            <div className="hero__quote">
              <p>
                &ldquo;Celebration is not just an event. It&apos;s a story, a
                memory, and a connection.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <section className="stats-band">
          <article>
            <strong>$20B+</strong>
            <span>African event industry opportunity</span>
          </article>
          <article>
            <strong>90%+</strong>
            <span>Of the ecosystem still operating manually</span>
          </article>
          <article>
            <strong>1M+</strong>
            <span>Projected users by 2029-2030</span>
          </article>
          <article>
            <strong>$1.2B+</strong>
            <span>Projected valuation at scale</span>
          </article>
        </section>

        <section className="section" id="summary">
          <div className="section__intro">
            <p className="eyebrow">Executive Summary</p>
            <h2>Infrastructure for the future of celebrations.</h2>
            <p>
              The platform replaces fragmented manual workflows with a
              centralized, intelligent, and trust-based system built for event
              planning across Africa.
            </p>
          </div>

          <div className="summary-layout">
            <article className="panel panel--dark">
              <p className="eyebrow">Mission</p>
              <h3>To simplify, digitize, and elevate event planning.</h3>
              <p>
                OMA enables seamless collaboration, financial transparency, and
                exceptional execution through one unified platform.
              </p>
            </article>

            <article className="panel">
              <p className="eyebrow">Vision</p>
              <h3>Africa&apos;s most trusted and intelligent event ecosystem.</h3>
              <p>
                OMA connects people, culture, and celebration through
                technology designed specifically for local realities.
              </p>
            </article>
          </div>

          <div className="feature-strip">
            {executiveSummaryPoints.map((item) => (
              <article className="feature-tile" key={item}>
                <span />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--split">
          <div className="section__intro">
            <p className="eyebrow">Industry Problem</p>
            <h2>A multi-billion-dollar market is still running inefficiently.</h2>
            <p>
              The African event ecosystem remains fragmented, informal, and hard
              to trust at scale, leaving massive value on the table.
            </p>
          </div>

          <div className="bullet-panel">
            {challengePoints.map((point) => (
              <div className="bullet-row" key={point}>
                <span className="bullet-row__dot" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="solution">
          <div className="section__intro">
            <p className="eyebrow">OMA as the Solution</p>
            <h2>A full-stack digital ecosystem for planning, trust, execution, and growth.</h2>
            <p>
              OMA Events introduces seven connected solution layers that turn
              event planning into a structured, data-rich, and dependable
              experience.
            </p>
          </div>

          <div className="cards-grid cards-grid--wide">
            {solutionLayers.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Product Architecture</p>
            <h2>OMA operates across five integrated layers.</h2>
            <p>
              This Event-OS model positions OMA as industry infrastructure, not
              just another software tool.
            </p>
          </div>

          <div className="architecture-strip architecture-strip--stacked">
            {architecture.map((layer) => (
              <div className="architecture-chip" key={layer}>
                {layer}
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="market">
          <div className="section__intro">
            <p className="eyebrow">Market Opportunity</p>
            <h2>Huge demand, low infrastructure, clear room to win.</h2>
          </div>

          <div className="market-grid">
            <article className="market-card">
              <span>TAM</span>
              <strong>$20B+ annually</strong>
              <p>Largely untapped digital infrastructure across the African event market.</p>
            </article>
            <article className="market-card">
              <span>SAM</span>
              <strong>Nigeria plus key African markets</strong>
              <p>Initial focus across Nigeria, Ghana, Kenya, and South Africa.</p>
            </article>
            <article className="market-card">
              <span>SOM</span>
              <strong>1% initial penetration target</strong>
              <p>Equivalent to about $200M in annual revenue potential at scale.</p>
            </article>
          </div>

          <div className="counts-grid">
            {marketStats.map((stat) => (
              <article className="count-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Business Model</p>
            <h2>Revenue is diversified from day one.</h2>
          </div>

          <div className="revenue-layout">
            <div className="bullet-panel">
              {revenueStreams.map((stream) => (
                <div className="bullet-row" key={stream}>
                  <span className="bullet-row__dot" />
                  <p>{stream}</p>
                </div>
              ))}
            </div>

            <article className="panel panel--accent">
              <p className="eyebrow">Positioning</p>
              <h3>OMA Events equals Africa&apos;s all-in-one event ecosystem.</h3>
              <p>
                The platform brings planning, payments, vendor discovery, data,
                and intelligence together inside one coordinated operating
                system.
              </p>
            </article>
          </div>
        </section>

        <section className="section section--projection">
          <div className="section__intro">
            <p className="eyebrow">Growth and Financial Projection</p>
            <h2>A five-year path with clear unicorn potential.</h2>
            <p>OMA Events projects strong user growth, ARR expansion, and rising market value from 2025 through 2030.</p>
          </div>

          <div className="projection-table" role="table" aria-label="Growth projections">
            <div className="projection-table__head" role="row">
              <span>Year</span>
              <span>Users</span>
              <span>ARR</span>
              <span>Valuation</span>
            </div>
            {projections.map((item) => (
              <div className="projection-table__row" role="row" key={item.year}>
                <span>{item.year}</span>
                <span>{item.users}</span>
                <span>{item.arr}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Why OMA Wins</p>
            <h2>Built for local trust, local culture, and platform-scale growth.</h2>
          </div>

          <div className="cards-grid">
            {winPoints.map((point) => (
              <article className="info-card" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Technology Stack</p>
            <h2>Modern infrastructure designed for web, mobile, AI, and growth.</h2>
          </div>

          <div className="stack-grid">
            {techStack.map((item) => (
              <article className="stack-card" key={item}>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Competitive Positioning</p>
            <h2>Existing tools solve pieces. OMA connects the whole workflow.</h2>
          </div>

          <div className="competitive-table" role="table" aria-label="Competitive positioning">
            <div className="competitive-table__head" role="row">
              <span>Category</span>
              <span>Competitors</span>
              <span>Limitation</span>
            </div>
            {competitiveRows.map((row) => (
              <div className="competitive-table__row" role="row" key={row.category}>
                <span>{row.category}</span>
                <span>{row.competitor}</span>
                <span>{row.limitation}</span>
              </div>
            ))}
          </div>

          <article className="panel panel--dark panel--statement">
            <h3>OMA Events = All-in-One Ecosystem</h3>
          </article>
        </section>

        <section className="section" id="roadmap">
          <div className="section__intro">
            <p className="eyebrow">Roadmap</p>
            <h2>From Lagos MVP to continental category leadership.</h2>
          </div>

          <div className="roadmap-grid roadmap-grid--five">
            {roadmap.map((item) => (
              <article className="roadmap-card" key={item.phase}>
                <span>{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--split">
          <div>
            <div className="section__intro">
              <p className="eyebrow">Partnership Strategy</p>
              <h2>Growth depends on strong ecosystem relationships.</h2>
            </div>

            <div className="partner-grid">
              {partnerships.map((item) => (
                <article className="partner-card" key={item.title}>
                  <span className="partner-card__dot" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="philosophy-grid">
            <article className="quote-card">
              <p>
                Celebration is not just an event. It&apos;s a story, a memory,
                and a connection.
              </p>
            </article>

            <article className="panel">
              <p className="eyebrow">Core Values</p>
              <div className="value-list">
                {coreValues.map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section__intro">
            <p className="eyebrow">Long-Term Vision</p>
            <h2>From event planning platform to global celebration infrastructure.</h2>
          </div>

          <div className="vision-grid">
            {futureVision.map((item) => (
              <article className="info-card" key={item}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--closing" id="closing">
          <article className="closing-card">
            <p className="eyebrow">Closing Statement</p>
            <h2>OMA Events is building the digital backbone of celebrations in Africa.</h2>
            <p>
              It transforms chaos into structure, risk into trust, and
              fragmentation into ecosystem. This is not just event planning.
              This is event infrastructure for a continent.
            </p>
            <a className="button button--dark" href="#roadmap">
              Explore the Roadmap
            </a>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
