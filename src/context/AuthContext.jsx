import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState(null);

  const [role, setRole] = useState(null);

  const refreshProfile = async (uid) => {

    if (!uid) {
      setProfile(null);
      setRole(null);
      return null;
    }

    const docRef =
      doc(db, "users", uid);

    const docSnap =
      await getDoc(docRef);

    if (!docSnap.exists()) {
      setProfile(null);
      setRole(null);
      return null;
    }

    const profileData =
      docSnap.data();

    setProfile(profileData);
    setRole(profileData.role ?? null);

    return profileData;
  };

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, async (currentUser) => {

        try {

          if (currentUser) {

            setUser(currentUser);
            await refreshProfile(currentUser.uid);

          } else {

            setUser(null);
            setProfile(null);
            setRole(null);
          }

        } catch (error) {

          console.error("Auth context failed to load profile:", error);
          setUser(currentUser ?? null);
          setProfile(null);
          setRole(null);

        } finally {

          setLoading(false);
        }
      });

    return unsubscribe;

  }, []);

  return (
    <AuthContext.Provider
      value={{
        refreshProfile,
        profile,
        user,
        role,
        onboardingCompleted:
          Boolean(profile?.onboardingCompleted),
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(AuthContext);
}
