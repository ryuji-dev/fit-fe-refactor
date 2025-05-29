import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 보안을 위해 최소한의 유저 정보만 저장
interface User {
  id: string;
  nickname: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        let minimalUser: User | null = null;
        if (user) {
          let profileImage = user.profileImage;
          if (user.profile && Array.isArray(user.profile.profileImage)) {
            const mainImg = user.profile.profileImage.find((img: any) => img.isMain);
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
        set({ user: minimalUser, isAuthenticated: !!minimalUser });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
