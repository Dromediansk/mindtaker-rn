import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";

export const resolveWithAuth = <T, R>(
  handler: (user: User, data?: T) => Promise<R>
) => {
  return async (data: T): Promise<R> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authenticated");

    return handler(user, data);
  };
};
