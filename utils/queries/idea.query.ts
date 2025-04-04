import dayjs from "dayjs";
import { resolveCreateIdea, resolveWithAuth } from "../resolvers";
import { supabase } from "../supabase";
import { CreateIdeaParams } from "../types";

export const createIdeaToDb = resolveWithAuth(
  async (user, params?: CreateIdeaParams) => {
    if (!params) {
      throw new Error("Parameters are required to create an idea.");
    }

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

    return data[0];
  }
);

export const getIdeasFromDb = resolveWithAuth(async (user, date?: string) => {
  const startOfDay = dayjs(date).startOf("day").toISOString();
  const endOfDay = dayjs(date).endOf("day").toISOString();

  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", startOfDay)
    .lte("created_at", endOfDay);

  if (error) throw error;
  return data;
});

export const deleteIdeaFromDb = resolveWithAuth(
  async (user, ideaId?: string) => {
    if (!ideaId) {
      throw new Error("Idea ID is required to delete an idea.");
    }
    const { error } = await supabase
      .from("ideas")
      .delete()
      .eq("user_id", user.id)
      .eq("id", ideaId);

    if (error) throw error;
    return true;
  }
);

export const updateIdeaInDb = resolveWithAuth(
  async (user, params?: { ideaId: string; content: string }) => {
    if (!params?.ideaId || !params?.content) {
      throw new Error("Idea ID and content are required to update an idea.");
    }

    const { data, error } = await supabase
      .from("ideas")
      .update({ content: params.content })
      .eq("user_id", user.id)
      .eq("id", params.ideaId)
      .select();

    if (error) throw error;
    return data;
  }
);
