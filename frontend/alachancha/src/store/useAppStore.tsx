import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface AppState {
  user: any;
  userId: number | null;
  setUser: (user: any) => void;
  setUserId: (userId: number | null) => void;
}


export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      userId: null,
      setUser: (user) => set({ user }),
      setUserId: (userId) => set({ userId }),
    }),
    {
      name: 'app-storage', // clave en localStorage
      partialize: (state) => ({ userId: state.userId, user: state.user }), // opcional: define qué guardar
    }
  )
);