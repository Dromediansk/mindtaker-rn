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
  clearCategoryMap: () => void;
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
    const newMap = {} as CategoryMap;
    categories.forEach((category) => {
      if (category.is_category_none) {
        set({ emptyCategory: category });
      }
      newMap[category.id] = category;
    });
    set({ categoryMap: newMap });
  },
  getIdeasByCategory: (categoryId) => {
    const category = get().categoryMap[categoryId];
    return category ? category.ideas : [];
  },
  clearCategoryMap: () => {
    set({ categoryMap: {} });
  },
  setIdeasToCategory: (ideas) => {
    const newMap = { ...get().categoryMap };
    // Group ideas by category_id
    const ideasByCategory: Record<string, Idea[]> = {};
    ideas.forEach((idea) => {
      if (!ideasByCategory[idea.category_id]) {
        ideasByCategory[idea.category_id] = [];
      }
      ideasByCategory[idea.category_id].push(idea);
    });

    // Update each category with its new ideas
    Object.keys(ideasByCategory).forEach((categoryId) => {
      if (newMap[categoryId]) {
        newMap[categoryId] = {
          ...newMap[categoryId],
          ideas: ideasByCategory[categoryId],
        };
      } else {
        console.warn(`Category with id ${categoryId} not found.`);
      }
    });
    set({ categoryMap: newMap });
  },
}));
