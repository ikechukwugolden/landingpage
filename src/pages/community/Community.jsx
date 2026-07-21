import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { Users, BookOpen, Award, MessageSquare, Search, Plus, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const categories = ["All", "Weddings", "Birthday", "Corporate", "Vendor Tips", "Planning", "Q&A"];
const certifications = [
  { name: "Event Planning 101", level: "Beginner", points: 100 },
  { name: "Vendor Management", level: "Intermediate", points: 200 },
  { name: "Budget Mastery", level: "Intermediate", points: 150 },
  { name: "Oma Certified Pro", level: "Advanced", points: 500 },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Planning" });
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    const q = query(collection(db, "communityPosts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content || !auth.currentUser) return;
    await addDoc(collection(db, "communityPosts"), {
      ...newPost,
      userId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName || "Anonymous",
      likes: [],
      comments: [],
      createdAt: serverTimestamp(),
    });
    setNewPost({ title: "", content: "", category: "Planning" });
    setShowNewPost(false);
  };

  const handleLike = async (postId, likes) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const ref = doc(db, "communityPosts", postId);
    if (likes.includes(uid)) {
      await updateDoc(ref, { likes: arrayRemove(uid) });
    } else {
      await updateDoc(ref, { likes: arrayUnion(uid) });
    }
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    if (!text?.trim() || !auth.currentUser) return;
    const ref = doc(db, "communityPosts", postId);
    await updateDoc(ref, {
      comments: arrayUnion({
        text: text.trim(),
        userId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || "Anonymous",
        createdAt: new Date().toISOString(),
      }),
    });
    setCommentText({ ...commentText, [postId]: "" });
  };

  const filteredPosts = posts.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) || p.content?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const trendingPosts = [...posts].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)).slice(0, 5);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Community</div>
            <h1>Community Hub</h1>
            <p>Connect, learn, and grow with the OMA Events community.</p>
          </div>
          {activeTab === "feed" && (
            <button onClick={() => setShowNewPost(true)} className="auth-submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Plus size={18} /> New Post
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
          {[
            { id: "feed", label: "Discussion Feed", icon: <MessageSquare size={16} /> },
            { id: "learn", label: "Learning Hub", icon: <BookOpen size={16} /> },
            { id: "certs", label: "Certifications", icon: <Award size={16} /> },
            { id: "trending", label: "Trending", icon: <TrendingUp size={16} /> },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === tab.id ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: activeTab === tab.id ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Discussion Feed */}
        {activeTab === "feed" && (
          <>
            <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
                <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)" }} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search discussions..." className="auth-input" style={{ paddingLeft: "36px" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              {categories.map((c) => (
                <button key={c} onClick={() => setSelectedCategory(c)} style={{ padding: "4px 12px", borderRadius: "20px", border: selectedCategory === c ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: selectedCategory === c ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.75rem" }}>
                  {c}
                </button>
              ))}
            </div>

            {filteredPosts.map((post) => (
              <div key={post.id} className="glass" style={{ padding: "16px", borderRadius: "12px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.8rem" }}>
                    {post.authorName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p style={{ color: "#000", fontWeight: 500, fontSize: "0.9rem" }}>{post.authorName}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.7rem" }}>{post.createdAt?.toDate?.().toLocaleDateString() || "Just now"}</p>
                  </div>
                  <span style={{ marginLeft: "auto", padding: "2px 10px", borderRadius: "20px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.7rem" }}>{post.category}</span>
                </div>
                <h4 style={{ color: "#000", marginBottom: "8px" }}>{post.title}</h4>
                <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.85rem", lineHeight: "1.6" }}>{post.content}</p>
                <div style={{ display: "flex", gap: "16px", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <button onClick={() => handleLike(post.id, post.likes || [])} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: (post.likes || []).includes(auth.currentUser?.uid) ? "#ef4444" : "rgba(0,0,0,0.4)", cursor: "pointer", fontSize: "0.85rem" }}>
                    <Heart size={16} fill={(post.likes || []).includes(auth.currentUser?.uid) ? "#ef4444" : "none"} /> {post.likes?.length || 0}
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "rgba(0,0,0,0.4)", cursor: "pointer", fontSize: "0.85rem" }}>
                    <MessageCircle size={16} /> {post.comments?.length || 0}
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "rgba(0,0,0,0.4)", cursor: "pointer", fontSize: "0.85rem" }}>
                    <Share2 size={16} /> Share
                  </button>
                </div>
                {/* Comments */}
                <div style={{ marginTop: "12px" }}>
                  {(post.comments || []).slice(-2).map((c, idx) => (
                    <div key={idx} style={{ padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.03)" }}>
                      <p style={{ color: "#fbbf24", fontSize: "0.75rem", fontWeight: 600 }}>{c.authorName}</p>
                      <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "0.8rem" }}>{c.text}</p>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <input
                      value={commentText[post.id] || ""}
                      onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && handleComment(post.id)}
                      placeholder="Add a comment..."
                      style={{ flex: 1, padding: "6px 10px", borderRadius: "8px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.8rem" }}
                    />
                    <button onClick={() => handleComment(post.id)} style={{ padding: "6px 12px", borderRadius: "8px", background: "#fbbf24", color: "#000", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem" }}>Post</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Learning Hub */}
        {activeTab === "learn" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {[
              { title: "Wedding Planning Masterclass", desc: "Complete guide to planning luxury weddings", lessons: 12, duration: "4 hrs" },
              { title: "Vendor Negotiation Skills", desc: "How to get the best deals from vendors", lessons: 8, duration: "2.5 hrs" },
              { title: "Budget Optimization", desc: "Maximize value within your event budget", lessons: 10, duration: "3 hrs" },
              { title: "Event Marketing 101", desc: "Promote events and sell tickets effectively", lessons: 6, duration: "2 hrs" },
              { title: "Client Management", desc: "Build lasting relationships with clients", lessons: 7, duration: "2 hrs" },
              { title: "Oma AI Power User", desc: "Master OMA AI for event intelligence", lessons: 5, duration: "1.5 hrs" },
            ].map((course, i) => (
              <div key={i} className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
                <BookOpen size={28} style={{ color: "#fbbf24", marginBottom: "10px" }} />
                <h3 style={{ color: "#000", fontSize: "1rem", marginBottom: "6px" }}>{course.title}</h3>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", marginBottom: "12px" }}>{course.desc}</p>
                <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>{course.lessons} lessons</span>
                  <span style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>{course.duration}</span>
                </div>
                <button style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24", cursor: "pointer", fontSize: "0.85rem" }}>Start Learning</button>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {activeTab === "certs" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
            {certifications.map((cert, i) => (
              <div key={i} className="glass" style={{ padding: "20px", borderRadius: "12px", textAlign: "center" }}>
                <Award size={40} style={{ color: "#fbbf24", marginBottom: "10px" }} />
                <h3 style={{ color: "#000", marginBottom: "4px" }}>{cert.name}</h3>
                <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem", marginBottom: "8px" }}>{cert.level}</p>
                <p style={{ color: "#fbbf24", fontSize: "0.85rem", marginBottom: "12px" }}>{cert.points} points required</p>
                <button style={{ width: "100%", padding: "8px", borderRadius: "8px", background: "linear-gradient(135deg, #fbbf24, #d97706)", border: "none", color: "#000", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>Enroll</button>
              </div>
            ))}
          </div>
        )}

        {/* Trending */}
        {activeTab === "trending" && (
          <div>
            <h3 style={{ color: "#fbbf24", marginBottom: "16px" }}>Trending Discussions</h3>
            {trendingPosts.map((post, i) => (
              <div key={post.id} className="glass" style={{ padding: "14px", borderRadius: "10px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "1.2rem", minWidth: "30px" }}>#{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#000", fontSize: "0.9rem" }}>{post.title}</p>
                  <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{post.authorName} • {post.likes?.length || 0} likes</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Post Modal */}
        {showNewPost && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
            <form onSubmit={handleNewPost} className="glass" style={{ padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "500px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>New Discussion</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input className="auth-input" placeholder="Title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} required />
                <select className="auth-input" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
                  {categories.filter((c) => c !== "All").map((c) => (<option key={c} value={c} style={{ background: "#ffffff" }}>{c}</option>))}
                </select>
                <textarea className="auth-input auth-textarea" placeholder="Share your thoughts..." value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} rows="5" required />
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button type="submit" className="auth-submit" style={{ flex: 1 }}>Post</button>
                <button type="button" onClick={() => setShowNewPost(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", color: "#000", border: "none", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
