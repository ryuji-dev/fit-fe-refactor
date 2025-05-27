import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  nickname: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
    if (user) {
      Cookies.set('isAuthenticated', 'true', { expires: 0.5 });
    } else {
      Cookies.set('isAuthenticated', 'false', { expires: 0.5 });
    }
  },
  logout: () => {
    Cookies.set('isAuthenticated', 'false', { expires: 0.5 });
    set({ user: null, isAuthenticated: false });
  },
  initializeAuth: () => {
    const isAuthenticated = Cookies.get('isAuthenticated') === 'true';
    set({ user: null, isAuthenticated });
  },
}));
