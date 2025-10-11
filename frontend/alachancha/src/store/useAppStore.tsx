import { create } from 'zustand';
export const useAppStore = create((set) => ({
  user: null,
  setUser: (user:any) => set({ user }),
}));