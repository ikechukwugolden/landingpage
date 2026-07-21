import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import AuthLayout from "../../components/layout/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;
        default:
          setError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Google login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Enter your email above first");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
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
      <form
        onSubmit={showReset ? handlePasswordReset : handleLogin}
        className="auth-card glass auth-card-compact"
      >
        <h1 className="auth-card-title">
          {showReset ? "Reset Password" : "Welcome Back"}
        </h1>
        <p className="auth-card-subtitle">
          {showReset
            ? "Enter your email to receive a reset link"
            : "Login into your workspace"}
        </p>

        {error && <div className="auth-error">{error}</div>}
        {resetSent && (
          <div className="auth-success">
            Password reset email sent! Check your inbox.
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

          {!showReset && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          )}
        </div>

        {!showReset && (
          <button
            type="button"
            className="auth-forgot-link"
            onClick={() => {
              setShowReset(true);
              setError("");
              setResetSent(false);
            }}
          >
            Forgot password?
          </button>
        )}

        {showReset && (
          <button
            type="button"
            className="auth-forgot-link"
            onClick={() => {
              setShowReset(false);
              setError("");
              setResetSent(false);
            }}
          >
            Back to login
          </button>
        )}

        <button type="submit" disabled={loading} className="auth-submit">
          {loading
            ? showReset
              ? "Sending..."
              : "Logging in..."
            : showReset
              ? "Send Reset Link"
              : "Login"}
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="auth-social-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        {showReset ? (
          <p className="auth-switch-text">
            Remember your password?{" "}
            <button
              type="button"
              className="auth-switch-link"
              onClick={() => {
                setShowReset(false);
                setError("");
                setResetSent(false);
              }}
            >
              Login
            </button>
          </p>
        ) : (
          <p className="auth-switch-text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-switch-link">
              Create one
            </Link>
          </p>
        )}
      </form>
    </AuthLayout>
  );
};

export default Login;
