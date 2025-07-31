// src/hooks/useSyncUser.ts
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { db } from "../utils/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const useSyncUser = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName || "",
          createdAt: new Date().toISOString(),
        });
        console.log("✅ New user saved to Firestore");
      } else {
        console.log("👤 User already exists");
      }
    };

    syncUser();
  }, [isSignedIn, user]);
};
