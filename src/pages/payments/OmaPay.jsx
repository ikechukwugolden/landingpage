import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle, Send, Plus, Eye, EyeOff, CreditCard, Lock, TrendingUp } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { auth, db } from "../../firebase/firebase";

const transactionTypes = {
  credit: { color: "#22c55e", icon: <ArrowDownLeft size={16} /> },
  debit: { color: "#ef4444", icon: <ArrowUpRight size={16} /> },
  escrow: { color: "#fbbf24", icon: <Lock size={16} /> },
};

const statusColors = {
  completed: "#22c55e",
  pending: "#f97316",
  failed: "#ef4444",
};

export default function OmaPay() {
  const [wallet, setWallet] = useState({ balance: 0, escrow: 0 });
  const [transactions, setTransactions] = useState([]);
  const [escrowPayments, setEscrowPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFund, setShowFund] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [fundAmount, setFundAmount] = useState("");
  const [payForm, setPayForm] = useState({ recipient: "", amount: "", description: "" });
  const [showBalance, setShowBalance] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const walletUnsub = onSnapshot(doc(db, "wallets", uid), (snap) => {
      if (snap.exists()) {
        setWallet(snap.data());
      }
      setLoading(false);
    });

    const txUnsub = onSnapshot(
      query(collection(db, "transactions"), where("userId", "==", uid), orderBy("createdAt", "desc")),
      (snap) => setTransactions(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    const escrowUnsub = onSnapshot(
      query(collection(db, "escrow"), where("userId", "==", uid), orderBy("createdAt", "desc")),
      (snap) => setEscrowPayments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => { walletUnsub(); txUnsub(); escrowUnsub(); };
  }, [uid]);

  const handleFund = async (e) => {
    e.preventDefault();
    if (!fundAmount || !uid) return;
    const amount = Number(fundAmount);
    if (amount <= 0) return;

    const newBalance = (wallet.balance || 0) + amount;

    await updateDoc(doc(db, "wallets", uid), {
      balance: newBalance,
      updatedAt: serverTimestamp(),
    });

    await addDoc(collection(db, "transactions"), {
      userId: uid,
      type: "credit",
      amount,
      description: "Wallet Funding",
      status: "completed",
      createdAt: serverTimestamp(),
    });

    setFundAmount("");
    setShowFund(false);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!payForm.recipient || !payForm.amount || !uid) return;
    const amount = Number(payForm.amount);
    if (amount <= 0 || amount > wallet.balance) return;

    const newBalance = wallet.balance - amount;

    await updateDoc(doc(db, "wallets", uid), {
      balance: newBalance,
      updatedAt: serverTimestamp(),
    });

    await addDoc(collection(db, "transactions"), {
      userId: uid,
      type: "debit",
      amount,
      description: payForm.description || `Payment to ${payForm.recipient}`,
      recipient: payForm.recipient,
      status: "completed",
      createdAt: serverTimestamp(),
    });

    setPayForm({ recipient: "", amount: "", description: "" });
    setShowPay(false);
  };

  const handleEscrow = async (vendorName, amount, eventId) => {
    if (!uid) return;
    await addDoc(collection(db, "escrow"), {
      userId: uid,
      vendorName,
      eventId,
      amount: Number(amount),
      status: "held",
      createdAt: serverTimestamp(),
    });

    const newBalance = wallet.balance - Number(amount);
    await updateDoc(doc(db, "wallets", uid), { balance: newBalance, updatedAt: serverTimestamp() });

    await addDoc(collection(db, "transactions"), {
      userId: uid,
      type: "escrow",
      amount: Number(amount),
      description: `Escrow for ${vendorName}`,
      status: "pending",
      createdAt: serverTimestamp(),
    });
  };

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">OmaPay</div>
            <h1>Payments & Wallet</h1>
            <p>Manage your wallet, make payments, and track transactions.</p>
          </div>
        </div>

        {/* Wallet Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "1.5rem" }}>
          <div className="glass" style={{ padding: "20px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(217,119,6,0.05))" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>Wallet Balance</p>
              <button onClick={() => setShowBalance(!showBalance)} style={{ background: "none", border: "none", color: "rgba(0,0,0,0.3)", cursor: "pointer" }}>
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
            <h2 style={{ color: "#fbbf24", fontSize: "2rem" }}>
              {showBalance ? `₦${(wallet.balance || 0).toLocaleString()}` : "••••••"}
            </h2>
            <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
              <button onClick={() => setShowFund(true)} style={{ flex: 1, padding: "8px", borderRadius: "8px", background: "linear-gradient(135deg, #fbbf24, #d97706)", border: "none", color: "#000", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>Fund Wallet</button>
              <button onClick={() => setShowPay(true)} style={{ flex: 1, padding: "8px", borderRadius: "8px", background: "rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.15)", color: "#000", cursor: "pointer", fontSize: "0.85rem" }}>Send Money</button>
            </div>
          </div>

          <div className="glass" style={{ padding: "20px", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Lock size={16} style={{ color: "#fbbf24" }} />
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>In Escrow</p>
            </div>
            <h2 style={{ color: "#f97316", fontSize: "1.5rem" }}>₦{(wallet.escrow || 0).toLocaleString()}</h2>
            <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem", marginTop: "4px" }}>Protected payments</p>
          </div>

          <div className="glass" style={{ padding: "20px", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <TrendingUp size={16} style={{ color: "#22c55e" }} />
              <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "0.85rem" }}>Total Spent</p>
            </div>
            <h2 style={{ color: "#22c55e", fontSize: "1.5rem" }}>
              ₦{transactions.filter((t) => t.type === "debit").reduce((s, t) => s + (t.amount || 0), 0).toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
          {["overview", "transactions", "escrow"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 16px", borderRadius: "8px", border: activeTab === tab ? "2px solid #fbbf24" : "1px solid rgba(0,0,0,0.15)", background: activeTab === tab ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.05)", color: "#000", cursor: "pointer", fontSize: "0.85rem", textTransform: "capitalize" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Transactions */}
        {(activeTab === "overview" || activeTab === "transactions") && (
          <div className="glass" style={{ padding: "16px", borderRadius: "12px", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "12px", fontSize: "0.95rem" }}>Recent Transactions</h3>
            {transactions.length === 0 ? (
              <p style={{ color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "2rem" }}>No transactions yet</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {transactions.slice(0, activeTab === "overview" ? 5 : transactions.length).map((tx) => (
                  <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.03)" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${transactionTypes[tx.type]?.color || "#fbbf24"}22`, display: "flex", alignItems: "center", justifyContent: "center", color: transactionTypes[tx.type]?.color || "#fbbf24" }}>
                      {transactionTypes[tx.type]?.icon || <CreditCard size={16} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#000", fontSize: "0.85rem" }}>{tx.description}</p>
                      <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.7rem" }}>{tx.createdAt?.toDate?.().toLocaleDateString() || "—"}</p>
                    </div>
                    <span style={{ color: tx.type === "credit" ? "#22c55e" : "#fbbf24", fontWeight: 600, fontSize: "0.9rem" }}>
                      {tx.type === "credit" ? "+" : "-"}₦{(tx.amount || 0).toLocaleString()}
                    </span>
                    <span style={{ padding: "2px 8px", borderRadius: "10px", background: `${statusColors[tx.status] || "#fbbf24"}22`, color: statusColors[tx.status] || "#fbbf24", fontSize: "0.7rem" }}>
                      {tx.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Escrow */}
        {(activeTab === "overview" || activeTab === "escrow") && (
          <div className="glass" style={{ padding: "16px", borderRadius: "12px" }}>
            <h3 style={{ color: "#fbbf24", marginBottom: "12px", fontSize: "0.95rem" }}>Escrow Payments</h3>
            {escrowPayments.length === 0 ? (
              <p style={{ color: "rgba(0,0,0,0.3)", textAlign: "center", padding: "2rem" }}>No escrow payments</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {escrowPayments.map((ep) => (
                  <div key={ep.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.03)" }}>
                    <Lock size={16} style={{ color: "#fbbf24" }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "#000", fontSize: "0.85rem" }}>{ep.vendorName}</p>
                      <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.7rem" }}>Escrow hold</p>
                    </div>
                    <span style={{ color: "#f97316", fontWeight: 600 }}>₦{(ep.amount || 0).toLocaleString()}</span>
                    <span style={{ padding: "2px 8px", borderRadius: "10px", background: `${ep.status === "released" ? "#22c55e" : ep.status === "disputed" ? "#ef4444" : "#f97316"}22`, color: ep.status === "released" ? "#22c55e" : ep.status === "disputed" ? "#ef4444" : "#f97316", fontSize: "0.7rem", textTransform: "capitalize" }}>
                      {ep.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Fund Modal */}
        {showFund && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
            <form onSubmit={handleFund} className="glass" style={{ padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "400px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>Fund Wallet</h3>
              <input className="auth-input" type="number" placeholder="Amount (₦)" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} required />
              <p style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem", marginTop: "8px" }}>In production, this integrates with Paystack/Flutterwave for card/bank transfers.</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button type="submit" className="auth-submit" style={{ flex: 1 }}>Fund Wallet</button>
                <button type="button" onClick={() => setShowFund(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", color: "#000", border: "none", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Pay Modal */}
        {showPay && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
            <form onSubmit={handlePay} className="glass" style={{ padding: "2rem", borderRadius: "16px", width: "100%", maxWidth: "400px" }}>
              <h3 style={{ color: "#fbbf24", marginBottom: "1rem" }}>Send Money</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input className="auth-input" placeholder="Recipient (name or email)" value={payForm.recipient} onChange={(e) => setPayForm({ ...payForm, recipient: e.target.value })} required />
                <input className="auth-input" type="number" placeholder="Amount (₦)" value={payForm.amount} onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })} required />
                <input className="auth-input" placeholder="Description" value={payForm.description} onChange={(e) => setPayForm({ ...payForm, description: e.target.value })} />
              </div>
              {payForm.amount && Number(payForm.amount) > (wallet.balance || 0) && (
                <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "8px" }}>Insufficient balance. Your balance is ₦{(wallet.balance || 0).toLocaleString()}</p>
              )}
              <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                <button type="submit" disabled={Number(payForm.amount) > (wallet.balance || 0)} className="auth-submit" style={{ flex: 1, opacity: Number(payForm.amount) > (wallet.balance || 0) ? 0.5 : 1 }}>Send Payment</button>
                <button type="button" onClick={() => setShowPay(false)} style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.1)", color: "#000", border: "none", cursor: "pointer" }}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
