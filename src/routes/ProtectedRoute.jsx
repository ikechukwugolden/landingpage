import { Navigate } from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const {
    onboardingCompleted,
    user,
  } = useAuth();

  if (!user) {

    return <Navigate to="/login" />;
  }

  if (!onboardingCompleted) {

    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
