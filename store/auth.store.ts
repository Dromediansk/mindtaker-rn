import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      authLoading: false,
      setAuthLoading: (loading) => set({ authLoading: loading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
