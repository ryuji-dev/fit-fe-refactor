'use client';

import { useEffect, useState } from 'react';
import Spinner from '@/shared/components/ui/spinner';
import { Button } from '@/shared/components/ui/button';
import {
  UserRoundPen,
  Lock,
  SlidersHorizontal,
  Coffee,
  BookOpenText,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const dummyUser = {
  profileImage:
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  nickname: '김지은',
  email: 'jieun.kim@email.com',
};

export default function MyPageContainer() {
  const [isLoading, setIsLoading] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {};

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">마이페이지를 불러오는 중...</p>
        </div>
      ) : (
        <div
          className="scrollbar-hide container mx-auto mb-16 max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-8"
          onScroll={handleScroll}
        >
          <header className="mb-8">
            <div className="relative flex items-center justify-center">
              <h1 className="text-2xl font-bold text-zinc-900">마이페이지</h1>
            </div>
          </header>
          <section className="space-y-6">
            <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-md">
              <img
                src={dummyUser.profileImage}
                className="h-16 w-16 rounded-full border-2 border-violet-200 object-cover shadow-sm"
                alt="프로필"
              />
              <div className="flex flex-col justify-center">
                <div className="text-lg font-bold text-zinc-900">{dummyUser.nickname}</div>
                <div className="text-xs text-zinc-500">{dummyUser.email}</div>
              </div>
              <Button variant="secondary" size="sm" className="ml-auto">
                프로필 수정
              </Button>
            </div>
            <ul className="divide-y divide-zinc-100 rounded-2xl bg-white p-2 shadow-md">
              <li>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <UserRoundPen className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">내 계정 관리</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <Lock className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">비밀번호 변경</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <SlidersHorizontal className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">매칭 필터 설정</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <Coffee className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">
                    커피 아이템 구매
                  </span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-violet-50 focus:bg-violet-100">
                  <BookOpenText className="h-5 w-5 text-violet-500" />
                  <span className="flex-1 text-left font-medium text-zinc-900">앱 사용 가이드</span>
                  <ChevronRight className="h-5 w-5 text-zinc-400" />
                </button>
              </li>
              <li>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-4 transition hover:bg-rose-50 focus:bg-rose-100">
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
