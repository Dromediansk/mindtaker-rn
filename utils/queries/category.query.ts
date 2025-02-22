import { resolveWithAuth } from "../resolvers";
import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";
import { CategoryWithIdeas } from "../types";

export const getCategoriesFromDb = resolveWithAuth(async (user: User) => {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `id, 
      name, 
      ideas: ideas (id, title, description, created_at, category_id)`
    )
    .eq("ideas.user_id", user.id)
    .order("name");

  if (error) throw error;

  return data as CategoryWithIdeas[];
});
