import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;
  logout: () => void;

  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      authLoading: false,
      setAuthLoading: (loading) => set({ authLoading: loading }),

      logout: () => set({ user: null, session: null }),

      session: null,
      setSession: (session) => set({ session }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, session: state.session }),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
