import { Category, Idea } from "@/utils/types";
import { create } from "zustand";

type IdeaStore = {
  ideas: Idea[];
  setIdeas: (ideas: Idea[]) => void;

  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const useIdeaStore = create<IdeaStore>((set) => ({
  ideas: [],
  setIdeas: (ideas) => set({ ideas }),

  categories: [],
  setCategories: (categories) => set({ categories }),
}));
