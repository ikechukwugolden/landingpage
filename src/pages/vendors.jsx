import "../index.css";
import Navbar from "../components/layout/Navbar";
import "./styles/NewDashboard.css";
import Footer from "../components/layout/Footer";
import {
  DollarSign,
  Store,
  Star,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Users,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Vendors() {
  const vendorCategories = [
    "Photographers",
    "Decorators",
    "Caterers",
    "DJs & MCs",
    "Makeup Artists",
    "Videographers",
  ];

  const features = [
    {
      icon: <TrendingUp size={22} />,
      title: "Business Growth",
      text: "Expand your visibility and attract more clients across the OMA ecosystem.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Verified Reputation",
      text: "Build trust through ratings, reviews, and verified vendor profiles.",
    },
    {
      icon: <CalendarDays size={22} />,
      title: "Smart Booking System",
      text: "Receive bookings, manage schedules, and automate confirmations.",
    },
    {
      icon: <Users size={22} />,
      title: "Client Management",
      text: "Manage customers, conversations, invoices, and event workflows.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#050505] text-white px-6 py-10 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 text-sm font-bold">
              🛍️ Vendor Marketplace
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-black leading-tight tracking-tight">
              Grow Your Vendor Business With{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                OMA Event OS
              </span>
            </h1>

            <p className="mt-6 text-white/65 text-lg leading-8 max-w-2xl">
              OMA helps vendors become discoverable digital brands with
              bookings, analytics, client management, AI tools and verified
              reputation systems.
            </p>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-wrap gap-4">

              <button className="px-7 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-105 transition duration-300 shadow-[0_15px_40px_rgba(251,191,36,0.25)]">
                Become a Vendor
              </button>

              <button className="px-7 py-4 rounded-full border border-yellow-400/20 bg-white/5 text-yellow-400 font-bold hover:bg-yellow-400/10 transition duration-300">
                Explore Marketplace
              </button>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="p-5 rounded-3xl border border-yellow-400/15 bg-white/5 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">
                  230+
                </h2>

                <p className="text-white/60 mt-2">
                  Vendor Profiles
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-yellow-400/15 bg-white/5 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">
                  89
                </h2>

                <p className="text-white/60 mt-2">
                  Active Jobs
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-yellow-400/15 bg-white/5 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">
                  $240K
                </h2>

                <p className="text-white/60 mt-2">
                  Revenue Generated
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-yellow-400/15 bg-white/5 backdrop-blur-xl">
                <h2 className="text-3xl font-black text-yellow-400">
                  4.8
                </h2>

                <p className="text-white/60 mt-2">
                  Vendor Rating
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <div className="rounded-[32px] border border-yellow-400/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-8 shadow-[0_25px_80px_rgba(251,191,36,0.12)]">

              <div className="flex items-center justify-between mb-8">

                <h3 className="text-2xl font-black">
                  Vendor Dashboard
                </h3>

                <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  LIVE
                </div>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="p-5 rounded-2xl bg-black/40 border border-yellow-400/10">
                  <Store className="text-yellow-400" />
                  <h2 className="mt-4 text-3xl font-black">125</h2>
                  <p className="text-white/60 mt-1">
                    Orders Completed
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-yellow-400/10">
                  <DollarSign className="text-yellow-400" />
                  <h2 className="mt-4 text-3xl font-black">$18K</h2>
                  <p className="text-white/60 mt-1">
                    Monthly Revenue
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-yellow-400/10">
                  <Briefcase className="text-yellow-400" />
                  <h2 className="mt-4 text-3xl font-black">48</h2>
                  <p className="text-white/60 mt-1">
                    Active Bookings
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-yellow-400/10">
                  <Star className="text-yellow-400" />
                  <h2 className="mt-4 text-3xl font-black">4.9</h2>
                  <p className="text-white/60 mt-1">
                    Vendor Reputation
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto mt-28">

        <div className="text-center mb-16">

          <span className="text-yellow-400 font-bold tracking-widest text-sm">
            WHY VENDORS CHOOSE OMA
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black">
            More Than A Marketplace
          </h2>

          <p className="mt-6 text-white/60 max-w-3xl mx-auto leading-8">
            OMA gives vendors the infrastructure to scale, automate,
            and dominate the modern event industry.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {features.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-[30px] border border-yellow-400/10 bg-white/[0.03] backdrop-blur-xl hover:border-yellow-400/30 hover:-translate-y-2 transition duration-300"
            >

              <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-black">
                {item.title}
              </h3>

              <p className="mt-4 text-white/60 leading-7">
                {item.text}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto mt-28">

        <div className="rounded-[36px] border border-yellow-400/15 bg-gradient-to-br from-yellow-400/10 to-orange-500/5 p-10 overflow-hidden relative">

          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-yellow-400/10 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            <span className="text-yellow-400 font-bold tracking-widest text-sm">
              VENDOR ECOSYSTEM
            </span>

            <h2 className="mt-4 text-4xl font-black">
              Thousands Of Event Professionals
            </h2>

            <p className="mt-5 text-white/65 max-w-3xl leading-8">
              OMA connects every part of the event industry into one
              intelligent ecosystem.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              {vendorCategories.map((item, index) => (
                <div
                  key={index}
                  className="px-5 py-3 rounded-full border border-yellow-400/20 bg-black/30 text-yellow-400 font-bold"
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto mt-28">

        <div className="rounded-[40px] overflow-hidden relative border border-yellow-400/15 bg-gradient-to-br from-yellow-400/10 to-orange-500/5 p-12 text-center">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_35%)]"></div>

          <div className="relative z-10">

            <span className="text-yellow-400 font-bold tracking-widest text-sm">
              OMA EVENT OS
            </span>

            <h2 className="mt-5 text-5xl font-black leading-tight">
              Turn Your Talent Into A{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Scalable Brand
              </span>
            </h2>

            <p className="mt-6 text-white/65 max-w-3xl mx-auto leading-8 text-lg">
              Get discovered, receive bookings, grow your reputation,
              automate workflows and build a powerful vendor business
              inside OMA.
            </p>

            <div className="flex justify-center flex-wrap gap-5 mt-10">

              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black hover:scale-105 transition duration-300 shadow-[0_20px_50px_rgba(251,191,36,0.25)]">
                Join Marketplace
              </button>

              <button className="px-8 py-4 rounded-full border border-yellow-400/20 bg-white/5 text-yellow-400 font-black hover:bg-yellow-400/10 transition duration-300 flex items-center gap-2">
                Learn More
                <ArrowRight size={18} />
              </button>

            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6">

              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle2 size={18} className="text-yellow-400" />
                Verified Vendors
              </div>

              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle2 size={18} className="text-yellow-400" />
                AI Booking System
              </div>

              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle2 size={18} className="text-yellow-400" />
                Secure Payments
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
    <Footer />
    </div>
  );
}