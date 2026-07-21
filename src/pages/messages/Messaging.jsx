import { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { Send, Search, Plus, Image, Paperclip, Smile } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

export default function Messaging() {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const messagesEndRef = useRef(null);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", uid),
      orderBy("lastMessageTime", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setConversations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [uid]);

  useEffect(() => {
    if (!activeChat) return;
    const q = query(
      collection(db, "messages"),
      where("conversationId", "==", activeChat),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !uid) return;

    await addDoc(collection(db, "messages"), {
      conversationId: activeChat,
      senderId: uid,
      text: newMessage.trim(),
      createdAt: serverTimestamp(),
    });

    await setDoc(
      doc(db, "conversations", activeChat),
      { lastMessage: newMessage.trim(), lastMessageTime: serverTimestamp() },
      { merge: true }
    );

    setNewMessage("");
  };

  const handleNewConversation = async (otherUserId, otherUserName) => {
    if (!uid) return;
    const convId = [uid, otherUserId].sort().join("_");

    const existing = await getDoc(doc(db, "conversations", convId));
    if (existing.exists()) {
      setActiveChat(convId);
      setShowNewChat(false);
      return;
    }

    await setDoc(doc(db, "conversations", convId), {
      participants: [uid, otherUserId],
      participantNames: {
        [uid]: auth.currentUser?.displayName || "You",
        [otherUserId]: otherUserName,
      },
      lastMessage: "",
      lastMessageTime: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    setActiveChat(convId);
    setShowNewChat(false);
  };

  const filteredConvs = conversations.filter((c) => {
    const otherName = Object.entries(c.participantNames || {})
      .filter(([k]) => k !== uid)
      .map(([, v]) => v)
      .join(", ");
    return otherName.toLowerCase().includes(search.toLowerCase());
  });

  const activeConvo = conversations.find((c) => c.id === activeChat);
  const activeChatName = activeConvo
    ? Object.entries(activeConvo.participantNames || {})
        .filter(([k]) => k !== uid)
        .map(([, v]) => v)
        .join(", ") || "Unknown"
    : "";

  return (
    <DashboardLayout>
      <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden" }}>
        {/* Sidebar: Conversations */}
        <div style={{ width: "320px", borderRight: "1px solid rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.02)" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ color: "#fbbf24", fontSize: "1.1rem" }}>Messages</h2>
              <button onClick={() => setShowNewChat(!showNewChat)} style={{ padding: "6px", borderRadius: "6px", background: "rgba(251,191,36,0.15)", border: "none", color: "#fbbf24", cursor: "pointer" }}>
                <Plus size={18} />
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                style={{ width: "100%", padding: "8px 10px 8px 32px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.85rem" }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredConvs.length === 0 ? (
              <p style={{ color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "2rem", fontSize: "0.85rem" }}>No conversations yet</p>
            ) : (
              filteredConvs.map((conv) => {
                const otherName = Object.entries(conv.participantNames || {})
                  .filter(([k]) => k !== uid)
                  .map(([, v]) => v)
                  .join(", ");
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveChat(conv.id)}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      background: activeChat === conv.id ? "rgba(251,191,36,0.1)" : "transparent",
                      borderLeft: activeChat === conv.id ? "3px solid #fbbf24" : "3px solid transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.85rem" }}>
                        {otherName.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: "#000", fontSize: "0.9rem", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{otherName}</p>
                        <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{conv.lastMessage || "Start a conversation"}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Main: Chat Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {!activeChat ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(0,0,0,0.3)" }}>
              <div style={{ textAlign: "center" }}>
                <Send size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div style={{ padding: "12px 20px", borderBottom: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.8rem" }}>
                  {activeChatName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ color: "#000", fontWeight: 500 }}>{activeChatName}</p>
                  <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>Online</p>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {messages.map((msg) => {
                  const isMine = msg.senderId === uid;
                  return (
                    <div key={msg.id} style={{ display: "flex", justifyContent: isMine ? "flex-end" : "flex-start" }}>
                      <div style={{
                        maxWidth: "70%",
                        padding: "10px 14px",
                        borderRadius: isMine ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        background: isMine ? "linear-gradient(135deg, #fbbf24, #d97706)" : "rgba(0,0,0,0.08)",
                        color: isMine ? "#000" : "#000",
                        fontSize: "0.9rem",
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSend} style={{ padding: "12px 20px", borderTop: "1px solid rgba(0,0,0,0.1)", display: "flex", gap: "10px", alignItems: "center" }}>
                <button type="button" style={{ padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", border: "none", color: "rgba(0,0,0,0.4)", cursor: "pointer" }}>
                  <Paperclip size={18} />
                </button>
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.9rem" }}
                />
                <button type="button" style={{ padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", border: "none", color: "rgba(0,0,0,0.4)", cursor: "pointer" }}>
                  <Smile size={18} />
                </button>
                <button type="submit" style={{ padding: "10px 16px", borderRadius: "10px", background: "linear-gradient(135deg, #fbbf24, #d97706)", border: "none", color: "#000", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
