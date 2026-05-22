import { useEffect, useState } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import ProgressSteps from "../../components/auth/ProgressSteps";
import RoleSelector from "../../components/auth/RoleSelector";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/firebase";

const steps = [
  "Account",
  "Profile",
  "Dashboard",
];

export default function Onboarding() {

  const navigate = useNavigate();

  const {
    profile,
    refreshProfile,
    user,
  } = useAuth();

  const [formData, setFormData] =
    useState({
      businessName: "",
      planningFocus: "",
      role: "",
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!profile) {
      return;
    }

    setFormData((currentData) => ({
      businessName:
        profile.businessName ?? currentData.businessName,
      planningFocus:
        profile.planningFocus ?? currentData.planningFocus,
      role:
        profile.role ?? currentData.role,
    }));
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.role) {
      setError("Select how you want to use OMA");
      return;
    }

    if (!formData.planningFocus.trim()) {
      setError("Tell us what you want to manage");
      return;
    }

    try {
      setLoading(true);

      await setDoc(doc(db, "users", user.uid), {
        businessName: formData.businessName.trim(),
        onboardingCompleted: true,
        planningFocus: formData.planningFocus.trim(),
        role: formData.role,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      await refreshProfile(user.uid);

      navigate("/dashboard");
    } catch (saveError) {
      console.error(saveError);
      setError("We could not finish your setup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="auth-card auth-card-wide glass"
      >
        <div className="auth-step-copy">
          <p className="auth-kicker">
            Step 2 of 3
          </p>

          <h2 className="auth-card-title">
            Personalize your workspace
          </h2>

          <p className="auth-card-subtitle">
            Choose your role and describe the kind of events or services you want to manage.
          </p>
        </div>

        <ProgressSteps
          steps={steps}
          currentStep={2}
        />

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-role-section">
          <RoleSelector
            selectedRole={formData.role}
            onSelect={(role) =>
              setFormData((currentData) => ({
                ...currentData,
                role,
              }))
            }
          />
        </div>

        <div className="auth-form-fields">
          <input
            type="text"
            name="businessName"
            placeholder="Business or team name (optional)"
            value={formData.businessName}
            onChange={handleChange}
            className="auth-input"
          />

          <textarea
            name="planningFocus"
            placeholder="What are you planning or selling on OMA?"
            value={formData.planningFocus}
            onChange={handleChange}
            className="auth-input auth-textarea"
            rows="4"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="auth-submit"
        >
          {
            loading
              ? "Finishing setup..."
              : "Finish and open dashboard"
          }
        </button>
      </form>
    </AuthLayout>
  );
}
