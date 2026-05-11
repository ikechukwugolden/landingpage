import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Globe,
  Calendar,
  CreditCard,
  Bot,
  LayoutDashboard,
  Search,
  Lock,
  MessageSquare,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Mail
} from 'lucide-react';

// --- Data Constants (from White Paper) ---

const navLinks = [
  { href: '#bookings', label: 'Book Services' },
  { href: '#features', label: 'Features' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#why-oma', label: 'Why OMA' },
  { href: '#closing', label: 'Get Started' },
];

const heroHighlights = [
  'Trusted vendors',
  'Smart budgeting',
  'Secure payments',
];

const valuePoints = [
  'No more scattered WhatsApp chats.',
  'No more unreliable vendors.',
  'No more budget surprises.',
];

const coreFeatures = [
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: 'Smart Planning Dashboard',
    text: 'Plan your entire event with timelines, tasks, and real-time collaboration.',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Verified Vendor Marketplace',
    text: 'Discover trusted vendors with real reviews, ratings, and portfolios.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Budget and Expense Control',
    text: 'Track every cost, avoid overspending, and stay in control.',
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'Oma AI Assistant',
    text: 'Get intelligent recommendations for vendors, themes, and timelines.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Secure Payments with OmaPay',
    text: 'Pay vendors safely with escrow protection and digital contracts.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Guest and RSVP Management',
    text: 'Manage invitations, seating, and guest check-ins effortlessly.',
  },
];

const problemPoints = [
  'Too many vendors, no trust',
  'Endless calls and messages',
  'No clear budget control',
  'Everything feels disorganized',
];

const proofPoints = [
  'Thousands of vendors ready to work',
  'Smart tools used by modern planners',
  'Designed for African event culture',
];

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
];

const positioningPoints = [
  'Planning software',
  'Vendor marketplace',
  'Payment infrastructure',
  'AI-powered automation',
];

const whyOmaPoints = [
  'Verified vendors you can trust',
  'Secure escrow payments',
  'AI-powered planning assistance',
  'Built for African realities',
  'Everything in one platform',
];

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
];

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
];

const taglines = [
  'Where Events Come Together.',
  'Plan Smart. Celebrate Better.',
  "Africa's Event Operating System.",
  'From Idea to Celebration - Seamlessly.',
  'No Chaos. Just Perfect Events.',
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all">
              O
            </div>
            <span className="text-xl font-bold text-white tracking-tight">OMA Events</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-slate-400 hover:text-amber-400 transition-colors">
                {link.label}
              </a>
            ))}
            <button className="bg-amber-500 text-slate-950 px-5 py-2.5 rounded-full font-bold hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/20">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-800 shadow-2xl py-6 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-300 font-medium py-2 hover:text-amber-400" onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
          <button className="bg-amber-500 text-slate-950 px-5 py-3 rounded-lg font-bold w-full mt-2">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Africa's Event Operating System
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Plan Perfect Events. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                Without the Chaos.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              OMA EVENTS is Africa's first all-in-one platform to plan, manage, and execute events with trusted vendors, smart budgeting, and secure payments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2">
                Start Planning Your Event <ArrowRight size={18} />
              </button>
              <button className="bg-slate-900 text-white border border-slate-800 px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                Explore Vendors
              </button>
            </div>

            <div className="pt-4">
              <p className="text-sm text-slate-500 mb-4">Trusted by planners, vendors, and creators across Africa</p>
              <div className="flex flex-wrap gap-6">
                {heroHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-amber-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Visual Placeholder */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-indigo-500/20 rounded-3xl opacity-30 blur-2xl" />
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center overflow-hidden group shadow-2xl">
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl border border-slate-700 mx-auto flex items-center justify-center shadow-inner">
                  <Calendar className="text-amber-500" size={40} />
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Hero Image Placeholder</p>
                  <p className="text-slate-500 text-sm">Replace with your OMA Flyer / Showcase</p>
                </div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-8 right-8 bg-slate-800/80 backdrop-blur p-3 rounded-xl shadow-lg border border-slate-700 animate-bounce duration-[3000ms]">
                <Star size={20} className="text-amber-400 fill-amber-400" />
              </div>
              <div className="absolute bottom-12 left-8 bg-slate-800/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-700 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-green-400" />
                  </div>
                  <span className="text-sm font-semibold text-white">Vendor Verified</span>
                </div>
                <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsBand = () => {
  return (
    <section className="py-12 border-y border-slate-900 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {proofPoints.map((point, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                OMA
              </div>
              <span className="text-slate-300 font-medium">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueProp = () => {
  return (
    <section className="py-24 bg-slate-950" id="summary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">Value Proposition</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to plan an event in one place.</h2>
          <p className="text-lg text-slate-400">
            OMA EVENTS gives you a centralized system to plan, collaborate, pay, and execute your event from idea to celebration.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {valuePoints.map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                <CheckCircle2 className="text-slate-400 group-hover:text-amber-500" size={24} />
              </div>
              <p className="text-xl font-semibold text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Bookings = () => {
  return (
    <section className="py-24 bg-slate-950 relative" id="bookings">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">Book With OMA</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Clients can book the moments that matter most.</h2>
          <p className="text-lg text-slate-400">
            From weddings to interior decor, OMA EVENTS should be where clients discover services, compare trusted options, and book with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceBookings.map((service, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 transition-all flex flex-col">
              <span className="inline-block self-start px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold mb-6">
                Book Now
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-8 flex-1">{service.text}</p>
              <a href="#closing" className="inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                Book {service.title} <ChevronRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="py-24 bg-slate-950" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">Core Features</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Benefits first, stress out.</h2>
          <p className="text-lg text-slate-400">
            From planning to payment, every part of the event workflow lives inside one smart system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/30 transition-all group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section className="py-24 bg-slate-950" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">Vendor Portfolio Strategy</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Use social proof to attract vendors, then let OMA close the trust gap.</h2>
          <p className="text-lg text-slate-400">
            Instagram and TikTok are powerful marketing layers, but OMA EVENTS should be the operating system where vendors are evaluated, booked, and paid.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {portfolioLayers.map((layer, i) => (
            <div key={i} className="relative p-8 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="absolute top-0 left-8 -translate-y-1/2 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full">
                {layer.label}
              </span>
              <h3 className="text-xl font-bold text-white mb-4 mt-2">{layer.title}</h3>
              <p className="text-slate-400">{layer.text}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-500/20 text-center">
          <p className="text-lg text-slate-300 italic">
            "Instagram and TikTok are the showcase. OMA EVENTS is the execution layer. That is how the platform becomes infrastructure, not just a marketplace."
          </p>
        </div>
      </div>
    </section>
  );
};

const ProblemSolution = () => {
  return (
    <section className="py-24 bg-slate-950" id="solution">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="space-y-8">
            <div>
              <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">Problem</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Event planning is broken. We fixed it.</h2>
            </div>

            <div className="space-y-4">
              {problemPoints.map((point, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <p className="text-slate-300 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-3xl bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 flex flex-col justify-center">
            <p className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-4">Solution</p>
            <h3 className="text-3xl font-bold text-white mb-6">OMA EVENTS brings structure, transparency, and control into your event.</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Everything you need to plan, manage vendors, control budgets, and execute with confidence now lives in one platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-slate-950" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Plan your event in 4 simple steps.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <div key={i} className="relative p-8 rounded-2xl bg-slate-900 border border-slate-800 group hover:border-amber-500/30 transition-all">
              <span className="text-5xl font-bold text-slate-800 group-hover:text-amber-500/20 transition-colors absolute top-6 right-6">
                {item.step}
              </span>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.text}</p>
              </div>
              {i !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-800" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Positioning = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">Product Positioning</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Not just an app. An Event Operating System.</h2>
          <p className="text-lg text-slate-400">
            OMA EVENTS combines planning software, vendor discovery, payment infrastructure, and AI-powered automation into one powerful ecosystem for modern event execution.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {positioningPoints.map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center hover:bg-slate-800 transition-colors">
              <span className="text-slate-300 font-semibold">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyOma = () => {
  return (
    <section className="py-24 bg-slate-950" id="why-oma">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-4">Why OMA Events Wins</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why OMA EVENTS is different.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyOmaPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-xl bg-slate-900 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-500 font-bold">
                +
              </div>
              <p className="text-lg text-slate-300 font-medium pt-0.5">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EmotionalClose = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">"Every event tells a story. Make yours unforgettable."</h3>
            <p className="text-slate-900/80 font-medium text-lg">OMA Events</p>
          </div>

          <div className="space-y-6">
            <p className="text-amber-500 font-bold tracking-wider uppercase text-sm">Emotional Close</p>
            <h3 className="text-3xl font-bold text-white">Bring your vision to life without stress, confusion, or compromise.</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              OMA EVENTS gives you the tools, the structure, and the confidence to create memorable celebrations with clarity from start to finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClosingCTA = () => {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden" id="closing">
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-amber-500 font-bold tracking-wider uppercase text-sm mb-6">Final CTA</p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Start planning <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">smarter today.</span>
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Join the future of event planning in Africa with a platform built for trust, beauty, and seamless execution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-amber-400 transition-all hover:shadow-lg hover:shadow-amber-500/25">
            Get Started Free
          </button>
          <button className="bg-slate-900 text-white border border-slate-800 px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all">
            Browse Vendors
          </button>
        </div>
        <p className="text-slate-500 text-sm">Structured planning. Verified vendors. Secure payments.</p>
      </div>
    </section>
  );
};

const Taglines = () => {
  return (
    <section className="py-12 bg-slate-950 border-t border-slate-900 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...taglines, ...taglines].map((tagline, i) => (
          <span key={i} className="text-2xl md:text-4xl font-bold text-slate-800 mx-8">
            {tagline}
          </span>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-slate-950 font-bold text-sm">
                O
              </div>
              <span className="text-lg font-bold text-white">OMA Events</span>
            </div>
            <p className="text-slate-500 mb-6 max-w-xs">
              Africa's first all-in-one platform to plan, manage, and execute events.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/30 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/30 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-500/30 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Features</a></li>
              <li><a href="#bookings" className="hover:text-amber-400 transition-colors">Book Services</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Vendor Portfolio</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">© 2026 OMA Events Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <Mail size={14} />
            hello@omaevents.com
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <Navbar />
      <Hero />
      <StatsBand />
      <ValueProp />
      <Bookings />
      <Features />
      <Portfolio />
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
};

export default App;