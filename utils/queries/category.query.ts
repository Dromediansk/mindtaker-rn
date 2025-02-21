import { Tables } from "../generated/db.types";
import { supabase } from "../supabase";

export const getCategoriesFromDb = async (): Promise<
  Tables<"categories">[]
> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
};
