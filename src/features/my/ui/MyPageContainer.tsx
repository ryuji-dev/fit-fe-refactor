'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  UserRoundPen,
  Lock,
  SlidersHorizontal,
  Coffee,
  BookOpenText,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useLogout } from '@/features/auth/api/auth.mutations';
import { useGetMyMiniProfile } from '@/features/my/api/my.queries';
import { Button } from '@/shared/components/ui/button';
import Spinner from '@/shared/components/ui/spinner';
import { useAuthStore } from '@/store/authStore';
import defaultProfileImage from '@/assets/images/default.png';
import { Skeleton } from '@/shared/components/ui/skeleton';
import useHydrated from '@/shared/hooks/useHydrated';

export default function MyPageContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout();
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuthStore((state) => state.user);
  const { data: myProfile, isLoading: isLoadingMyProfile } = useGetMyMiniProfile();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {};

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.push('/auth');
      return;
    }
    setIsLoading(false);
  }, [hydrated, user, router]);

  if (!user || !hydrated) return null;

  const { nickname, email, profileImage } = myProfile || {};

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">마이페이지를 불러오는 중...</p>
        </div>
      ) : (
        <div
          className="scrollbar-hide container mx-auto mb-16 max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-4"
          onScroll={handleScroll}
        >
          <header className="mb-4">
            <div className="relative flex items-center">
              <h1 className="text-lg font-bold text-zinc-900">My Fit</h1>
            </div>
          </header>
          <section className="space-y-6">
            {isLoadingMyProfile ? (
              <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-md">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex flex-col justify-center">
                  <Skeleton className="mb-2 h-6 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="ml-auto h-8 w-20" />
              </div>
            ) : (
              <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-md">
                <Image
                  src={profileImage || defaultProfileImage}
                  className="h-16 w-16 rounded-full border-2 border-violet-200 object-cover shadow-sm"
                  alt="프로필"
                  width={64}
                  height={64}
                />
                <div className="flex flex-col justify-center">
                  <div className="text-lg font-bold text-zinc-900">{nickname}</div>
                  <div className="text-xs text-zinc-500">{email}</div>
                </div>
                <Button variant="secondary" size="sm" className="ml-auto">
                  프로필 수정
                </Button>
              </div>
            )}
            <ul className="divide-y divide-zinc-100 rounded-2xl bg-white p-2 shadow-md">
              <li>
                <button className="mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <UserRoundPen className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">내 계정 관리</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="my-1 flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <Lock className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">비밀번호 변경</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="my-1 flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <SlidersHorizontal className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">매칭 필터 설정</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="my-1 flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <Coffee className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">
                    커피 아이템 구매
                  </span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="my-1 flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <BookOpenText className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">앱 사용 가이드</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => logout.mutate()}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-rose-50 focus:bg-rose-100"
                >
                  <LogOut className="h-5 w-5 text-rose-500" />
                  <span className="flex-1 text-left font-medium text-rose-500">로그아웃</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
