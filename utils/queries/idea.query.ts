import { resolveCreateIdea } from "../resolvers/resolveCreateIdea";
import { resolveWithAuth } from "../resolvers/resolveWithAuth";
import { supabase } from "../supabase";
import { CreateIdeaParams } from "../types";

export const createIdeaToDb = resolveWithAuth(
  async (user, params: CreateIdeaParams) => {
    const resolvedIdea = resolveCreateIdea(params);

    const { data, error } = await supabase
      .from("ideas")
      .insert([
        {
          ...resolvedIdea,
          user_id: user.id,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  }
);
