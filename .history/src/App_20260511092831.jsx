import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Zap, 
  Shield, 
  BarChart3, 
  Users, 
  Globe,
  Twitter,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Replace with your Logo Image */}
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              L
            </div>
            <span className="text-xl font-bold text-slate-900">LaunchPad</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                {link.name}
              </a>
            ))}
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-slate-600 font-medium py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg font-medium w-full">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-50 to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-purple-50 to-transparent opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              v2.0 is now live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
              Build faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">intelligent tools</span>
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              The all-in-one platform to manage your projects, collaborate with your team, and ship products that your customers love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2">
                Start Building Free <ArrowRight size={18} />
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center">
                  <ChevronRight size={14} className="text-white ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                    U{i}
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ teams</p>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-2xl" />
            <div className="relative bg-slate-100 border border-slate-200 rounded-2xl aspect-[4/3] flex flex-col items-center justify-center overflow-hidden group">
              {/* Replace this div with your <img src="..." /> */}
              <div className="text-center space-y-4 p-8">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center">
                  <Globe className="text-indigo-600" size={40} />
                </div>
                <div>
                  <p className="text-slate-400 font-medium">Hero Image Placeholder</p>
                  <p className="text-slate-300 text-sm">Replace with your dashboard/mockup image</p>
                </div>
              </div>
              
              {/* Floating UI Elements for visual flair */}
              <div className="absolute top-8 right-8 bg-white p-3 rounded-xl shadow-lg border border-slate-100 animate-bounce duration-[3000ms]">
                <Zap size={20} className="text-amber-500" />
              </div>
              <div className="absolute bottom-12 left-8 bg-white p-4 rounded-xl shadow-lg border border-slate-100 max-w-[180px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">Task Done</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoCloud = () => {
  return (
    <section className="py-12 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
          Backed by leading investors and teams
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-32 bg-slate-300 rounded-md flex items-center justify-center">
              <span className="text-xs font-bold text-slate-500">LOGO {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Lightning Fast",
      desc: "Optimized for speed with edge caching and global CDN distribution."
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "Bank-grade Security",
      desc: "SOC2 Type II compliant with end-to-end encryption for all your data."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-500" />,
      title: "Advanced Analytics",
      desc: "Real-time insights into your performance metrics and user behavior."
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Team Collaboration",
      desc: "Built-in commenting, sharing, and real-time editing for your entire team."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
          <p className="text-lg text-slate-600">
            Powerful features to help you build, launch, and grow your business without the complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="group p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center mb-4 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContentSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
               {/* Replace this div with your <img src="..." /> */}
              <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                <span className="text-slate-400 font-medium">Feature Screenshot 1</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <BarChart3 size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Real-time data at your fingertips</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stop guessing and start knowing. Our dashboard gives you a bird's-eye view of your entire operation, updated in real-time.
            </p>
            <ul className="space-y-4">
              {['Customizable widgets', 'Export to PDF/CSV', 'Automated reporting'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 size={20} className="text-indigo-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <Users size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Collaboration made simple</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Work together seamlessly. Share files, leave comments, and track changes without ever leaving the platform.
            </p>
            <button className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              Learn more about collaboration <ArrowRight size={18} />
            </button>
          </div>
          <div>
            <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 rotate-[2deg] hover:rotate-0 transition-transform duration-500">
               {/* Replace this div with your <img src="..." /> */}
              <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                <span className="text-slate-400 font-medium">Feature Screenshot 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "Perfect for individuals and side projects.",
      features: ["1 Workspace", "5 Projects", "Basic Analytics", "Community Support"]
    },
    {
      name: "Pro",
      price: "29",
      desc: "For growing teams that need more power.",
      features: ["Unlimited Workspaces", "Unlimited Projects", "Advanced Analytics", "Priority Support", "Custom Integrations"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "99",
      desc: "Dedicated support and security for large orgs.",
      features: ["SSO & SAML", "Audit Logs", "Dedicated Account Manager", "Uptime SLA", "On-premise Option"]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-600">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-indigo-600 shadow-xl shadow-indigo-100' : 'border-slate-200'} bg-white flex flex-col`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.desc}</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                <span className="text-slate-500">/month</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechFlow",
      content: "This platform completely transformed how our team operates. We've cut our project delivery time in half.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Product Lead at StartUp",
      content: "The analytics features are incredible. I can finally see exactly where our bottlenecks are in real-time.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Freelance Designer",
      content: "I switched from three different tools to just this one. It's simplified my workflow immensely.",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by teams worldwide</h2>
          <p className="text-lg text-slate-400">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"} />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24 bg-indigo-600 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to get started?</h2>
        <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of teams already using LaunchPad to build better products faster.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-colors">
            Start Free Trial
          </button>
          <button className="bg-indigo-700 text-white border border-indigo-500 px-8 py-4 rounded-full font-bold hover:bg-indigo-800 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="text-lg font-bold text-slate-900">LaunchPad</span>
            </div>
            <p className="text-slate-500 mb-6 max-w-xs">
              Making the world more productive, one team at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-indigo-600">Features</a></li>
              <li><a href="#" className="hover:text-indigo-600">Integrations</a></li>
              <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-600">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
              <li><a href="#" className="hover:text-indigo-600">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 LaunchPad Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Mail size={14} />
            hello@launchpad.dev
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <ContentSection />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;