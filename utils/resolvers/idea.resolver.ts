import { CreateIdeaParams } from "../types";

export const resolveCreateIdea = (idea: CreateIdeaParams) => {
  const { title, description, categoryId } = idea;

  return {
    title: title.trim(),
    description: description.trim(),
    category_id: categoryId,
  };
};
