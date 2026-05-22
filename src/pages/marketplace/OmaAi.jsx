import { useState, useEffect, useRef } from "react";
import { getAIResponse } from "../../services/geminiAPI";
import DashboardLayout from "../../components/layout/DashboardLayout";

// 🔥 FIREBASE IMPORTS
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function OmaAI() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "OMA AI is online. I help you design, plan, and optimize events in real time. Describe your event, budget, or operational goals and I will generate structured execution plans.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState("client"); // 🔥 NEW
  const chatEndRef = useRef(null);

  /* =========================================================
     🔐 GET USER ROLE FROM FIREBASE
  ========================================================= */
  const getUserRole = async () => {
    const user = auth.currentUser;
    if (!user) return "client";

    try {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        return snap.data().role || "client";
      }

      return "client";
    } catch (error) {
      console.error("Failed to fetch user role:", error);
      return "client";
    }
  };

  /* =========================================================
     🚀 LOAD ROLE ON MOUNT
  ========================================================= */
  useEffect(() => {
    const loadRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
    };

    loadRole();
  }, []);

  /* =========================================================
     📜 AUTO SCROLL CHAT
  ========================================================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* =========================================================
     📊 PAGE CONTEXT BUILDER
  ========================================================= */
  const buildPageContext = () => {
    if (typeof document === "undefined") return "";

    const title = document.title || "";

    const headings = Array.from(
      document.querySelectorAll(
        "h1, h2, h3, h4, .chart-title, .analysis-title, .stat-label, .header-welcome p"
      )
    )
      .map((node) => node.textContent?.trim())
      .filter(Boolean);

    const stats = Array.from(
      document.querySelectorAll(
        ".stat-card, .analysis-stats, .dashboard-header-new, .analytics-section"
      )
    )
      .map((node) => node.textContent?.trim())
      .filter(Boolean);

    return [...new Set([title, ...headings, ...stats])]
      .join(" | ")
      .slice(0, 1200);
  };

  /* =========================================================
     💬 SEND MESSAGE (ROLE-AWARE AI)
  ========================================================= */
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input };
    setMessages((current) => [...current, userMessage]);

    setInput("");
    setIsLoading(true);

    try {
      const pageContext = buildPageContext();

      // 🔥 ROLE IS NOW PASSED INTO AI
      const aiResponse = await getAIResponse(
        input,
        pageContext,
        userRole
      );

      setMessages((current) => [
        ...current,
        { role: "model", text: aiResponse },
      ]);
    } catch (error) {
      console.error("AI request failed:", error);

      setMessages((current) => [
        ...current,
        {
          role: "model",
          text: "OMA AI is currently unavailable. Please check your connection or API configuration.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
     🎨 UI
  ========================================================= */
  return (
    <DashboardLayout>
      <div className="dashboard-page bg-[#0A0B0C] min-h-screen text-slate-200">

        {/* HEADER */}
        <div className="dashboard-topbar p-6 border-b border-slate-800">
          <div className="dashboard-header flex justify-between items-center">
            <div>

              <div className="inline-block bg-blue-500/10 text-blue-400 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20 mb-2">
                OMA AI CORE // {userRole.toUpperCase()} MODE
              </div>

              <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                Intelligence Command Center
              </h1>

              <p className="text-xs text-slate-500 mt-1">
                Role-aware AI system optimized for {userRole} workflows.
              </p>
            </div>
          </div>
        </div>

        {/* CHAT */}
        <div className="max-w-5xl mx-auto p-6 space-y-4">

          <div className="h-[480px] bg-slate-900/20 border border-slate-800/80 rounded-xl p-6 overflow-y-auto space-y-4 backdrop-blur-md shadow-2xl">

            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3.5 rounded-xl text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      : "bg-[#0A0B0C]/90 border border-slate-800 text-slate-300 rounded-bl-none"
                  }`}
                >
                  <span className="whitespace-pre-wrap">{message.text}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-950/60 border border-slate-800/60 text-blue-400 px-4 py-3 rounded-xl text-xs font-mono animate-pulse">
                  Generating execution model...
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <div className="flex gap-2">
            <input
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-4 text-sm outline-none transition-all text-slate-200 font-mono"
              placeholder={`Ask OMA AI (${userRole} mode)...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />

            <button
              className={`px-8 py-4 font-bold rounded-xl text-sm tracking-widest uppercase transition-all text-white ${
                isLoading
                  ? "bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 active:scale-95"
              }`}
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? "PROCESSING" : "SEND"}
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}