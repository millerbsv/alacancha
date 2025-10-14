import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface AppState {
  user: any;
  userId: number | null;
  setUser: (user: any) => void;
  setUserId: (userId: number | null) => void;
  profile: any;
  history: any;
  setProfile: (profile: any) => void;
  setHistory: (history: number | null) => void;
}


export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      userId: null,
      setUser: (user) => set({ user }),
      setUserId: (userId) => set({ userId }),
      profile: null,
      setProfile: (profile) => set({ profile }),
      history: null,
      setHistory: (history) => set({ history })
    }),
    {
      name: 'app-storage', // clave en localStorage
      partialize: (state) => ({ userId: state.userId, user: state.user, profile:state.profile, history:state.history }), // opcional: define qué guardar
    }
  )
);