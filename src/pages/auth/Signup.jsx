import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

import ProgressSteps from "../../components/auth/ProgressSteps";
import SignupForm from "../../components/auth/SignupForm";
import AuthLayout from "../../components/layout/AuthLayout";
import { auth, db } from "../../firebase/firebase";

const steps = [
  "Account",
  "Profile",
  "Dashboard",
];

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSignup = async (event) => {

    event.preventDefault();

    setError("");

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {

      setLoading(true);

      const { user } =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      await setDoc(doc(db, "users", user.uid), {
        createdAt: serverTimestamp(),
        email: formData.email,
        fullName: formData.fullName.trim(),
        onboardingCompleted: false,
        role: null,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      navigate("/onboarding");

    } catch (signupError) {

      console.log(signupError);

      switch (signupError.code) {

        case "auth/email-already-in-use":
          setError("This email is already in use");
          break;

        case "auth/invalid-email":
          setError("Invalid email address");
          break;

        case "auth/weak-password":
          setError("Password is too weak");
          break;

        default:
          setError("Signup failed");
      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSignup}
        className="auth-card auth-card-wide glass"
      >
        <div className="auth-step-copy">
          <p className="auth-kicker">
            Step 1 of 3
          </p>

          <h2 className="auth-card-title">
            Create your account
          </h2>

          <p className="auth-card-subtitle">
            Set up your login details first, then we will tailor the workspace to you.
          </p>
        </div>

        <ProgressSteps
          steps={steps}
          currentStep={1}
        />

        {error && <div className="auth-error">{error}</div>}

        <SignupForm
          formData={formData}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="auth-submit"
        >
          {
            loading
              ? "Creating..."
              : "Continue to onboarding"
          }
        </button>

        <p className="auth-switch-text">
          Already have an account?{" "}

          <Link
            to="/login"
            className="auth-switch-link"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
