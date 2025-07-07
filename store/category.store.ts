import { CategoryWithIdeas, Idea } from "@/utils/types";
import { create } from "zustand";

type CategoryMap = Record<string, CategoryWithIdeas>;

type CategoryStore = {
  categoryMap: CategoryMap;
  setCategoriesToMap: (categories: CategoryWithIdeas[]) => void;
  clearCategoryMap: () => void;

  getIdeasByCategory: (categoryId: string) => Idea[];
  setIdeasToCategory: (ideas: Idea[]) => void;
  deleteIdeaFromCategory: (ideaId: string, categoryId: string) => void;
};

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  categoryMap: {},
  setCategoriesToMap: (categories) => {
    const newMap = {} as CategoryMap;
    categories.forEach((category) => {
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
  deleteIdeaFromCategory: (ideaId, categoryId) => {
    const category = get().categoryMap[categoryId];
    if (!category) return;

    const newIdeas = category.ideas.filter((idea) => idea.id !== ideaId);
    set({
      categoryMap: {
        ...get().categoryMap,
        [categoryId]: { ...category, ideas: newIdeas },
      },
    });
  },
}));
