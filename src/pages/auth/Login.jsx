import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { auth } from "../../firebase/firebase";

import AuthLayout from "../../components/layout/AuthLayout";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

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

        default:
          setError("Login failed");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <AuthLayout>

      <form
        onSubmit={handleLogin}
        className="auth-card glass auth-card-compact"
      >

        <h1 className="auth-card-title">
          Welcome Back
        </h1>

        <p className="auth-card-subtitle">
          Login into your workspace
        </p>

        {
          error && (
            <div className="auth-error">
              {error}
            </div>
          )
        }

        <div className="auth-form-fields">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="auth-input"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-submit"
        >
          {
            loading
              ? "Logging in..."
              : "Login"
          }
        </button>

        <p className="auth-switch-text">
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="auth-switch-link"
          >
            Create one
          </Link>

        </p>

      </form>

    </AuthLayout>
  );
};

export default Login;
