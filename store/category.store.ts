import { Category, CategoryWithIdeas, Idea } from "@/utils/types";
import { create } from "zustand";

type CategoryMap = Record<string, CategoryWithIdeas>;

type CategoryStore = {
  categoryMap: CategoryMap;
  setCategoriesToMap: (categories: CategoryWithIdeas[]) => void;
  emptyCategory: Category;
  setEmptyCategory: (categories: Category[]) => void;

  getIdeasByCategory: (categoryId: string) => Idea[];
  setIdeasToCategory: (ideas: Idea[]) => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categoryMap: {},
  emptyCategory: { id: "", name: "", is_category_none: true },
  setEmptyCategory: (categories) => {
    const category = categories.find((category) => category.is_category_none);
    set({
      emptyCategory: category || { id: "", name: "", is_category_none: true },
    });
  },
  setCategoriesToMap: (categories) => {
    const newMap = { ...get().categoryMap };
    categories.forEach((category) => {
      // if category is the empty category
      if (category.is_category_none) {
        set({ emptyCategory: category });
        return;
      }
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
      const category = newMap[idea.category_id];
      // if category already exists, add the idea
      if (category) {
        category.ideas.push(idea);
      }
      // if category doesn't exist, create it
      else {
        newMap[idea.category_id] = {
          id: idea.category_id,
          name: "No Category",
          ideas: [idea],
          is_category_none: false,
        };
      }
    });
    set({ categoryMap: newMap });
  },
}));
