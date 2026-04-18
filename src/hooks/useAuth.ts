import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../services/firebase";
import useAuthStore from "../store/authStore";

const useAuth = () => {
  const { setUser, user, setLoading } = useAuthStore();

  useEffect(() => {
    if (!auth) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
      console.log("CURRENT USER:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
