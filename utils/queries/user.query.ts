import { User } from "@supabase/supabase-js";
import { supabase } from "../supabase";

export const upsertUserInDb = async (authUser: User) => {
  const { data: users } = await supabase
    .from("users")
    .select()
    .eq("uid", authUser.id);

  if (users?.length === 0) {
    const { error: insertError } = await supabase.from("users").insert({
      email: authUser.email ?? "",
      firstName: authUser.user_metadata?.full_name?.split(" ")[0] ?? "",
      lastName:
        authUser.user_metadata?.full_name?.split(" ").slice(1).join(" ") ?? "",
      uid: authUser.id,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }
  } else {
    const { error: updateError } = await supabase
      .from("users")
      .update({ last_signed_at: new Date().toISOString() })
      .eq("uid", authUser.id);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }
};
