import { resolveWithAuth } from "../resolvers";
import { supabase } from "../supabase";
import { User } from "@supabase/supabase-js";
import { CategoryWithIdeas } from "../types";
import dayjs from "dayjs";

export const getCategoriesFromDb = resolveWithAuth(
  async (user: User, date?: string) => {
    if (!date) {
      throw new Error("Date is required to get categories.");
    }
    const startOfDay = dayjs(date).startOf("day").toISOString();
    const endOfDay = dayjs(date).endOf("day").toISOString();

    const { data, error } = await supabase
      .from("categories")
      .select(
        `id, 
      name,
      enum_type,
      ideas: ideas (id, content, created_at, category_id)`
      )
      .eq("ideas.user_id", user.id)
      .gte("ideas.created_at", startOfDay)
      .lt("ideas.created_at", endOfDay)
      .order("name");

    if (error) throw error;

    return data as CategoryWithIdeas[];
  }
);
