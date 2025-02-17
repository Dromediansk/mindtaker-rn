import { create } from "zustand";

type UserStore = {
  user: User | null;
  loading: boolean;
};

export const useUserStore = create<UserStore>(() => ({
  user: null,
  loading: false,
}));

export const setUser = (user: User | null) => useUserStore.setState({ user });

export const getUser = () => useUserStore.getState().user;

export const useUser = () => useUserStore((state) => state.user);

export const setLoading = (loading: boolean) =>
  useUserStore.setState({ loading });

export const getUserLoading = () => useUserStore.getState().loading;

export const useLoading = () => useUserStore((state) => state.loading);
