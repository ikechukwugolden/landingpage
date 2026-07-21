import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import AuthLayout from "../../components/layout/AuthLayout";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        default:
          setError("Could not send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleReset} className="auth-card glass auth-card-compact">
        <h1 className="auth-card-title">Reset Password</h1>
        <p className="auth-card-subtitle">
          Enter your email and we will send you a reset link
        </p>

        {error && <div className="auth-error">{error}</div>}
        {sent && (
          <div className="auth-success">
            Reset email sent! Check your inbox and follow the link.
          </div>
        )}

        <div className="auth-form-fields">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
        </div>

        <button type="submit" disabled={loading} className="auth-submit">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="auth-switch-text">
          <Link to="/login" className="auth-switch-link">
            Back to Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
