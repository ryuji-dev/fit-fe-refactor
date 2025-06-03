import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

// 보안을 위해 최소한의 유저 정보만 저장
interface User {
  id: string;
  nickname: string;
  profileImage?: string;
}

interface ProfileImage {
  isMain: boolean;
  imageUrl: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  expiresAt: number | null;
  setUser: (
    user: {
      id: string;
      nickname: string;
      profileImage?: string;
      profile?: { profileImage: { isMain: boolean; imageUrl: string }[] };
    } | null,
  ) => void;
  logout: () => void;
}

const THIRTY_MINUTES = 30 * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      expiresAt: null,
      setUser: (user) => {
        let minimalUser: User | null = null;
        if (user) {
          let profileImage = user.profileImage;
          if (user.profile && Array.isArray(user.profile.profileImage)) {
            const mainImg = user.profile.profileImage.find((img: ProfileImage) => img.isMain);
            if (mainImg) {
              profileImage = mainImg.imageUrl;
            }
          }
          minimalUser = {
            id: user.id,
            nickname: user.nickname,
            profileImage,
          };
        }
        set({
          user: minimalUser,
          isAuthenticated: !!minimalUser,
          expiresAt: minimalUser ? Date.now() + THIRTY_MINUTES : null,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, expiresAt: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        expiresAt: state.expiresAt,
      }),
      merge: (persistedState, currentState) => {
        const state = { ...currentState, ...(persistedState as AuthState) };
        if (state.expiresAt && Date.now() > state.expiresAt) {
          return { ...state, user: null, isAuthenticated: false, expiresAt: null };
        }
        return state;
      },
    },
  ),
);
