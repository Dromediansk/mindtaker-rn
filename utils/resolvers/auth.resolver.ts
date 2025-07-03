import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";
import { useAuthStore } from "@/store/auth.store";
import { router } from "expo-router";

export const resolveWithAuth = <T, R>(
  handler: (user: User, data?: T) => Promise<R>
) => {
  return async (data: T): Promise<R> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Clear auth state and redirect to login
      const { logout } = useAuthStore.getState();
      logout();
      router.replace("/auth");
      throw new Error("Not authenticated");
    }

    return handler(user, data);
  };
};
