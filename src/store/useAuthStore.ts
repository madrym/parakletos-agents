import {create} from 'zustand';
import {User} from '../types/models';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set(() => ({
    user,
    isAuthenticated: !!user,
    isLoading: false,
  })),
  
  setLoading: (isLoading) => set(() => ({
    isLoading,
  })),
  
  signOut: () => set(() => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  })),
})); 