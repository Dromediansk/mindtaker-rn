import { Tables } from "./generated/db.types";

export type Idea = Tables<"ideas">;
export type Category = Tables<"categories">;

export type CreateIdeaParams = {
  title: string;
  description: string;
  categoryId: string | null;
};
