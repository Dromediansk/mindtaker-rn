import { Tables } from "./generated/db.types";

export type Idea = Tables<"ideas">;
export type Category = Tables<"categories">;

export type CategoryWithIdeas = Tables<"categories"> & {
  ideas: Tables<"ideas">[];
};

export type CreateIdeaParams = {
  content: string;
  categoryId: string;
};

export type CategoryMap = Record<string, CategoryWithIdeas>;

export enum CategoryEnumType {
  GENERAL = "GENERAL",
  PERSONAL = "PERSONAL",
  BUSINESS = "BUSINESS",
}

// API types

export type AiIdeaAction = "expand" | "summarize";
