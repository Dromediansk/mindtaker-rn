import { CreateIdeaParams } from "../types";

export const resolveCreateIdea = (idea: CreateIdeaParams) => {
  const { content, categoryId } = idea;

  return {
    content: content.trim(),
    category_id: categoryId,
  };
};
