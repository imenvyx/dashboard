import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  email: string;
  companies: string[];
  reports: string[];
};

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      login: (email, password) => {
        if (email === "technology@kameleonlabs.ai" && password === "#4nrsHSre1#@uPC$3ZR8") {
          const user: User = { 
            email, 
            companies: ['company-1'], 
            reports: ['sales', 'inventory'] 
          };
          set({ user, isLoading: false });
          return true;
        }
        set({ isLoading: false });
        return false;
      },
      logout: () => {
        set({ user: null, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state && state.isLoading !== undefined) {
          state.isLoading = false;
        }
      }
    }
  )
);