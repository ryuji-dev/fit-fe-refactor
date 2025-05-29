'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { MemberFilters } from '@/features/members/types/ui.types';
import Spinner from '@/shared/components/ui/spinner';
import { BasicProfileCard } from '@/shared/components/ui/profile-card';
import MemberFilterDialog from './MemberFilterDialog';
import { useGetPublicUserList, useGetUserList } from '../api/members.queries';
import { useAuthStore } from '@/store/authStore';
import { UserProfile } from '../types/api.types';

export default function MembersContainer() {
  const { isAuthenticated } = useAuthStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<MemberFilters>({
    region: '',
    ageRange: [20, 50],
    likesRange: [0, 500],
  });

  // 로그인 상태에 따라 적절한 API 호출
  const {
    data: publicUserList,
    isLoading: isPublicLoading,
    fetchNextPage: fetchNextPublicPage,
    hasNextPage: hasNextPublicPage,
  } = useGetPublicUserList();
  const {
    data: privateUserList,
    isLoading: isPrivateLoading,
    fetchNextPage: fetchNextPrivatePage,
    hasNextPage: hasNextPrivatePage,
  } = useGetUserList({
    enabled: isAuthenticated,
  });

  const isLoading = isAuthenticated ? isPrivateLoading : isPublicLoading;
  const userList = isAuthenticated ? privateUserList : publicUserList;
  const fetchNextPage = isAuthenticated ? fetchNextPrivatePage : fetchNextPublicPage;
  const hasNextPage = isAuthenticated ? hasNextPrivatePage : hasNextPublicPage;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleApplyFilters = (newFilters: MemberFilters) => {
    setFilters(newFilters);
  };

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">회원 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div
          className="scrollbar-hide container mx-auto mb-16 max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-8"
          onScroll={handleScroll}
        >
          <header className="mb-12">
            <div className="relative flex items-center justify-center">
              <h1 className="text-2xl font-bold text-zinc-900">회원 목록</h1>
              <button
                className="absolute right-0 p-2 text-zinc-500 hover:text-zinc-600 active:text-zinc-700"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-center text-sm text-zinc-500">
              현재 접속 중인 이성과 새로운 인연을 만들어보세요.
            </p>
          </header>

          <section className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-2 xl:grid-cols-3">
            {userList?.pages.map((page) =>
              page.users.map((user: UserProfile) => (
                <BasicProfileCard
                  key={user.id}
                  profile={{
                    id: user.id,
                    name: user.nickname,
                    age: user.age || 0,
                    location: user.region,
                    likes: user.likeCount,
                    imageUrl: user.profileImage,
                    isOnline: false,
                  }}
                />
              )),
            )}
          </section>

          {hasNextPage && (
            <div className="mt-8 flex justify-center">
              <Spinner size="md" />
            </div>
          )}

          <MemberFilterDialog
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={handleApplyFilters}
          />
        </div>
      )}
    </main>
  );
}
