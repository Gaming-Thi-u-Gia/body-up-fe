import { create } from "zustand";
import { persist } from "zustand/middleware";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export type User = {
  uid?: string;
  username?: string;
  email?: string;
  avatar?: string;
  // Add more properties as needed
};

type UserFirebaseStore = {
  currentUser: User | null;
  setUser: (user: User | null) => void;
  fetchUserInfo: (uid: string) => Promise<void>;
  updateUserFirebase: (profile: Partial<User>) => void;
};

const useUserFirebaseStore = create(
  persist<UserFirebaseStore>(
    (set) => ({
      currentUser: null,
      setUser: (user) => set({ currentUser: user }),
      fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null });

        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            set({ currentUser: docSnap.data() });
          } else {
            set({ currentUser: null });
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      },
      updateUserFirebase: async (profile: Partial<User>) => {
        try {
          if (!profile || !profile.uid) {
            throw new Error("Invalid profile data");
          }

          const { uid, ...profileData } = profile;
          const docRef = doc(db, "users", uid);
          await updateDoc(docRef, profileData);

          set((state) => ({
            currentUser: {
              ...state.currentUser,
              uid,
              ...profileData,
            },
          }));
        } catch (error) {
          console.error("Error updating user profile:", error);
          throw error; // Rethrow the error for handling in UI or other parts of the application
        }
      },
    }),
    {
      name: "user-firebase-store", // unique name for localStorage key
      getStorage: () => localStorage, // specify localStorage as the storage option
    }
  )
);
export default useUserFirebaseStore;
