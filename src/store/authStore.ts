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
    (set, get) => ({
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

        // 30분 후에 한 번만 만료 체크
        if (minimalUser) {
          setTimeout(() => {
            const state = get();
            if (state.expiresAt && Date.now() > state.expiresAt) {
              set({ user: null, isAuthenticated: false, expiresAt: null });
            }
          }, THIRTY_MINUTES);
        }
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

// 스토어 초기화 시 만료 시간 체크
const checkInitialExpiration = () => {
  const state = useAuthStore.getState();
  if (state.expiresAt && Date.now() > state.expiresAt) {
    useAuthStore.getState().logout();
  }
};

// 앱 시작 시 초기 체크 실행
checkInitialExpiration();
