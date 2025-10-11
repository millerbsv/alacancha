import { create } from 'zustand';

interface AppState {
  user: any;
  userId: number | null;
  setUser: (user: any) => void;
  setUserId: (userId: number) => void;
}


export const useAppStore = create<AppState>((set) => ({
  user: null,
  userId: null,
  setUser: (user) => set({ user }),
  setUserId: (userId) => set({ userId }),
}));