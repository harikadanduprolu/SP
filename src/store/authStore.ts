import { create } from 'zustand';
import type { User } from '../types';
import { getCurrentUser } from '../lib/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: Error | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  initialize: async () => {
    try {
      const user = await getCurrentUser();
      set({ user, loading: false });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
}));