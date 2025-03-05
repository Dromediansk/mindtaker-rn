import { Tables } from "./generated/db.types";

export type Idea = Tables<"ideas">;
export type Category = Tables<"categories">;

export type CategoryWithIdeas = Tables<"categories"> & {
  ideas: Tables<"ideas">[];
};

export type CreateIdeaParams = {
  content: string;
  categoryId: Category["id"];
};

// API types

export type AiIdeaAction = "expand" | "summarize";
