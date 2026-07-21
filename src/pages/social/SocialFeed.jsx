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
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Search, Plus, Star, Users } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const trendingTags = ["#WeddingInspo", "#AfricanWedding", "#EventPlanning", "#DecorIdeas", "#LagosEvents", "#AbujaVibes"];

const mockTrending = [
  { tag: "#TrendingWeddings", posts: 234 },
  { tag: "#BirthdayGoals", posts: 189 },
  { tag: "#CorporateEvents", posts: 156 },
  { tag: "#EventDecor", posts: 142 },
];

export default function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");
  const [newPostType, setNewPostType] = useState("highlight");
  const [showNewPost, setShowNewPost] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "socialPosts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !auth.currentUser) return;
    await addDoc(collection(db, "socialPosts"), {
      content: newPost.trim(),
      type: newPostType,
      userId: auth.currentUser.uid,
      authorName: auth.currentUser.displayName || "Anonymous",
      likes: [],
      comments: [],
      shares: 0,
      createdAt: serverTimestamp(),
    });
    setNewPost("");
    setShowNewPost(false);
  };

  const handleLike = async (postId, likes) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const ref = doc(db, "socialPosts", postId);
    if (likes.includes(uid)) {
      await updateDoc(ref, { likes: arrayRemove(uid) });
    } else {
      await updateDoc(ref, { likes: arrayUnion(uid) });
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Social</div>
            <h1>Event Community</h1>
            <p>Share highlights, discover trends, and connect with event enthusiasts.</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
          {[
            { id: "feed", label: "Feed", icon: <TrendingUp size={16} /> },
            { id: "discover", label: "Discover", icon: <Search size={16} /> },
            { id: "trending", label: "Trending", icon: <Star size={16} /> },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === tab.id ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: activeTab === tab.id ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        {activeTab === "feed" && (
          <>
            {/* New Post */}
            <div className="glass" style={{ padding: "16px", borderRadius: "12px", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.8rem" }}>
                  {auth.currentUser?.displayName?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <input
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share an event highlight, success story, or tip..."
                  style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", color: "#000", fontSize: "0.9rem" }}
                  onFocus={() => setShowNewPost(true)}
                />
                {newPost && (
                  <button onClick={handleNewPost} style={{ padding: "8px 16px", borderRadius: "8px", background: "linear-gradient(135deg, #fbbf24, #d97706)", border: "none", color: "#000", fontWeight: 600, cursor: "pointer" }}>
                    Post
                  </button>
                )}
              </div>
              {showNewPost && (
                <div style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
                  {["highlight", "success-story", "tip", "question"].map((type) => (
                    <button key={type} onClick={() => setNewPostType(type)} style={{ padding: "4px 10px", borderRadius: "20px", border: newPostType === type ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: newPostType === type ? "rgba(251,191,36,0.15)" : "transparent", color: "#000", cursor: "pointer", fontSize: "0.7rem", textTransform: "capitalize" }}>
                      {type.replace("-", " ")}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="glass" style={{ padding: "16px", borderRadius: "12px", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #fbbf24, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: 700, fontSize: "0.8rem" }}>
                    {post.authorName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#000", fontWeight: 500, fontSize: "0.9rem" }}>{post.authorName}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.7rem" }}>{post.createdAt?.toDate?.().toLocaleDateString() || "Just now"}</p>
                  </div>
                  <span style={{ padding: "2px 10px", borderRadius: "20px", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: "0.7rem", textTransform: "capitalize" }}>{post.type?.replace("-", " ")}</span>
                </div>
                <p style={{ color: "rgba(0,0,0,0.8)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "12px" }}>{post.content}</p>
                <div style={{ display: "flex", gap: "20px", paddingTop: "12px", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
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
              </div>
            ))}
          </>
        )}

        {/* Discover */}
        {activeTab === "discover" && (
          <>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.3)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events, vendors, planners..." className="auth-input" style={{ paddingLeft: "36px" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "16px" }}>
              {["Trending Weddings", "Top Decorators", "Best Caterers", "Event Venues", "Photography", "Event Planners"].map((topic, i) => (
                <div key={i} className="glass" style={{ padding: "20px", borderRadius: "12px" }}>
                  <TrendingUp size={24} style={{ color: "#fbbf24", marginBottom: "8px" }} />
                  <h4 style={{ color: "#000", marginBottom: "4px" }}>{topic}</h4>
                  <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.8rem" }}>{Math.floor(Math.random() * 500 + 100)} posts</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Trending */}
        {activeTab === "trending" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <h3 style={{ color: "#fbbf24", marginBottom: "12px" }}>Trending Tags</h3>
              {trendingTags.map((tag) => (
                <div key={tag} className="glass" style={{ padding: "12px", borderRadius: "8px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <HashIcon />
                  <div>
                    <p style={{ color: "#000", fontSize: "0.9rem" }}>{tag}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{Math.floor(Math.random() * 1000 + 200)} posts</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color: "#fbbf24", marginBottom: "12px" }}>Trending Events</h3>
              {mockTrending.map((item, i) => (
                <div key={i} className="glass" style={{ padding: "12px", borderRadius: "8px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "1.1rem", minWidth: "30px" }}>#{i + 1}</span>
                  <div>
                    <p style={{ color: "#000", fontSize: "0.9rem" }}>{item.tag}</p>
                    <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>{item.posts} posts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function HashIcon() {
  return (
    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24", fontWeight: 700 }}>
      #
    </div>
  );
}
