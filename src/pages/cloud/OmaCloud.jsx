import { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Upload, Image, Video, Trash2, Download, Eye, Plus, X, Camera } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db, storage } from "../../firebase/firebase";

export default function OmaCloud() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [filter, setFilter] = useState("all");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    const q = query(collection(db, "events"), where("userId", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    const q = query(
      collection(db, "cloudFiles"),
      where("eventId", "==", selectedEvent),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setFiles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [selectedEvent]);

  const handleUpload = async (e) => {
    const fileList = e.target.files;
    if (!fileList || !selectedEvent || !auth.currentUser) return;

    setUploading(true);
    for (const file of fileList) {
      try {
        const storageRef = ref(storage, `omacloud/${selectedEvent}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        const fileType = file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "other";

        await addDoc(collection(db, "cloudFiles"), {
          eventId: selectedEvent,
          userId: auth.currentUser.uid,
          fileName: file.name,
          fileUrl: url,
          fileType,
          fileSize: file.size,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm("Delete this file?")) return;
    await deleteDoc(doc(db, "cloudFiles", fileId));
  };

  const filteredFiles = files.filter((f) => filter === "all" || f.fileType === filter);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">Oma Cloud</div>
            <h1>Event Gallery</h1>
            <p>Store, manage, and share your event photos and videos.</p>
          </div>
        </div>

        {/* Event Selector */}
        {events.length > 0 ? (
          <select value={selectedEvent || ""} onChange={(e) => setSelectedEvent(e.target.value)} className="auth-input" style={{ maxWidth: "300px", marginBottom: "1.5rem" }}>
            <option value="">Select an event</option>
            {events.map((ev) => (<option key={ev.id} value={ev.id}>{ev.title}</option>))}
          </select>
        ) : (
          <p style={{ color: "rgba(0,0,0,0.5)", textAlign: "center", padding: "2rem" }}>Create an event first.</p>
        )}

        {selectedEvent && (
          <>
            {/* Upload & Filter Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                {["all", "image", "video"].map((f) => (
                  <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: "8px", border: filter === f ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: filter === f ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.8rem", textTransform: "capitalize" }}>
                  {f === "all" ? "All" : f + "s"}
                </button>
              ))}
              </div>
              <div>
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" onChange={handleUpload} style={{ display: "none" }} />
                <button onClick={() => fileInputRef.current?.click()} disabled={uploading} style={{ padding: "8px 16px", borderRadius: "8px", background: "linear-gradient(135deg, #fbbf24, #d97706)", border: "none", color: "#000", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>
                  <Upload size={16} /> {uploading ? "Uploading..." : "Upload Files"}
                </button>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "1.5rem" }}>
              <div className="glass" style={{ padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                <Image size={24} style={{ color: "#fbbf24", marginBottom: "4px" }} />
                <h3 style={{ color: "#000" }}>{files.filter((f) => f.fileType === "image").length}</h3>
                <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>Photos</p>
              </div>
              <div className="glass" style={{ padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                <Video size={24} style={{ color: "#3b82f6", marginBottom: "4px" }} />
                <h3 style={{ color: "#000" }}>{files.filter((f) => f.fileType === "video").length}</h3>
                <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>Videos</p>
              </div>
              <div className="glass" style={{ padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                <Camera size={24} style={{ color: "#22c55e", marginBottom: "4px" }} />
                <h3 style={{ color: "#000" }}>{files.length}</h3>
                <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "0.75rem" }}>Total Files</p>
              </div>
            </div>

            {/* Files Grid */}
            {filteredFiles.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "rgba(0,0,0,0.3)" }}>
                <Upload size={48} style={{ marginBottom: "1rem", opacity: 0.3 }} />
                <p>No files uploaded yet. Upload photos and videos from your event.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                {filteredFiles.map((file) => (
                  <div key={file.id} className="glass" style={{ borderRadius: "12px", overflow: "hidden" }}>
                    {file.fileType === "image" ? (
                      <div style={{ height: "160px", overflow: "hidden", cursor: "pointer" }} onClick={() => setPreviewFile(file)}>
                        <img src={file.fileUrl} alt={file.fileName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{ height: "160px", background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Video size={40} style={{ color: "#3b82f6", opacity: 0.5 }} />
                      </div>
                    )}
                    <div style={{ padding: "10px" }}>
                      <p style={{ color: "#000", fontSize: "0.8rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{file.fileName}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
                        <span style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.7rem" }}>{(file.fileSize / 1024 / 1024).toFixed(1)} MB</span>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <a href={file.fileUrl} target="_blank" rel="noreferrer" style={{ padding: "4px", borderRadius: "4px", background: "rgba(59,130,246,0.15)", color: "#3b82f6", cursor: "pointer" }}><Download size={12} /></a>
                          <button onClick={() => handleDelete(file.id)} style={{ padding: "4px", borderRadius: "4px", background: "rgba(239,68,68,0.15)", border: "none", color: "#ef4444", cursor: "pointer" }}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Preview Modal */}
        {previewFile && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "2rem" }} onClick={() => setPreviewFile(null)}>
            <button onClick={() => setPreviewFile(null)} style={{ position: "absolute", top: "20px", right: "20px", padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", border: "none", color: "#000", cursor: "pointer" }}><X size={24} /></button>
            <img src={previewFile.fileUrl} alt={previewFile.fileName} style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px", objectFit: "contain" }} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
