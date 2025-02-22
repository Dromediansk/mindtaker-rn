import { CategoryWithIdeas, Idea } from "@/utils/types";
import { create } from "zustand";

type CategoryMap = Record<string, CategoryWithIdeas>;

type CategoryStore = {
  categoryMap: CategoryMap;
  setCategories: (categories: CategoryWithIdeas[]) => void;

  getIdeasByCategory: (categoryId: string) => Idea[];
  setIdeasToCategory: (ideas: Idea[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categoryMap: {},
  setCategories: (categories) => {
    const newMap = { ...get().categoryMap };
    categories.forEach((category) => {
      // if category already exists, merge the ideas
      if (newMap[category.id]) {
        newMap[category.id] = {
          ...newMap[category.id],
          ideas: [...newMap[category.id].ideas, ...category.ideas],
        };
      }
      // if category doesn't exist, add it
      else {
        newMap[category.id] = category;
      }
    });
    set({ categoryMap: newMap });
  },
  getIdeasByCategory: (categoryId) => {
    const category = get().categoryMap[categoryId];
    return category ? category.ideas : [];
  },
  setIdeasToCategory: (ideas) => {
    const newMap = { ...get().categoryMap };
    ideas.forEach((idea) => {
      const ideaCategoryId = idea.category_id || "uncategorized";
      const category = newMap[ideaCategoryId];
      // if category already exists, add the idea
      if (category) {
        category.ideas.push(idea);
      }
      // if category doesn't exist, create it
      else {
        newMap[ideaCategoryId] = {
          id: ideaCategoryId,
          name: "No Category",
          ideas: [idea],
        };
      }
    });
    set({ categoryMap: newMap });
  },
}));
