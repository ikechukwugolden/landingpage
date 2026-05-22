import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import { getAIResponse } from "../../services/geminiAPI";
import "../styles/FloatingOmaAi.css";

function buildPageContext() {
  if (typeof document === "undefined") return "";

  const title = document.title || "";
  const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, .chart-title, .analysis-title, .stat-label, .notification-item, .header-welcome p"))
    .map((node) => node.textContent?.trim())
    .filter(Boolean);

  const stats = Array.from(document.querySelectorAll(".stat-card, .analysis-stats, .dashboard-header-new, .analytics-section"))
    .map((node) => node.textContent?.trim())
    .filter(Boolean);

  const uniqueContext = [...new Set([title, ...headings, ...stats])].join(" | ");
  return uniqueContext.slice(0, 1200);
}

export default function FloatingOmaAi() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm OMA AI. I can answer questions about this dashboard, your events, booking data, and the marketplace. Ask me anything on the page.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage = {
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const pageContext = buildPageContext();
      const aiResponse = await getAIResponse(input, pageContext);
      const aiMessage = {
        role: "ai",
        text: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage = {
        role: "ai",
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`floating-oma-button ${isOpen ? "open" : ""} ${
          hasNewMessage && !isOpen ? "new-message" : ""
        }`}
        onClick={toggleChat}
        title="OMA AI Assistant"
      >
        <MessageCircle size={24} />
        {hasNewMessage && !isOpen && <span className="notification-dot"></span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="floating-oma-container">
          <div className="floating-oma-header">
            <h3>OMA AI Assistant</h3>
            <button
              onClick={toggleChat}
              className="close-button"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="floating-oma-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`floating-message ${message.role}-message`}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                </div>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="floating-message ai-message loading">
                <div className="message-content">
                  <Loader size={16} className="spinner" />
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="floating-oma-input">
            <input
              type="text"
              placeholder="Tell me about your event..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="send-button"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
