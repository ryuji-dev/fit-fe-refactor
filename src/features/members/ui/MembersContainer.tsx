'use client';

import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { UserProfile } from '@/features/members/types/api.types';
import { MemberFilters } from '@/features/members/types/ui.types';
import { useGetPublicUserList, useGetUserList } from '@/features/members/api/members.queries';
import Spinner from '@/shared/components/ui/spinner';
import { BasicProfileCard } from '@/shared/components/ui/profile-card';
import { useAuthStore } from '@/store/authStore';
import MemberFilterDialog from './MemberFilterDialog';

export default function MembersContainer() {
  const { isAuthenticated } = useAuthStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<MemberFilters>({
    region: '',
    ageRange: [20, 50],
    likesRange: [0, 500],
  });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer를 사용한 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 감지된 요소가 화면에 보이고, 다음 페이지가 있으며, 로딩 중이 아닐 때만 API 호출
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      {
        root: null, // 뷰포트를 기준으로 감지
        rootMargin: '100px', // 요소가 화면 하단에서 100px 떨어졌을 때 미리 감지 (미리 로딩 시작)
        threshold: 0.1, // 요소가 10% 이상 보일 때 감지
      },
    );

    // 로딩 요소가 있으면 관찰 시작
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    // 컴포넌트 언마운트 시 observer 정리 (메모리 누수 방지)
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, fetchNextPage, isLoading]);

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
        <div className="scrollbar-hide container mx-auto mb-16 max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-8">
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

          {/* 무한 스크롤 감지를 위한 요소 (Intersection Observer가 이 요소를 관찰) */}
          <div ref={loadMoreRef} className="h-4 w-full">
            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <Spinner size="md" />
              </div>
            )}
          </div>

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
