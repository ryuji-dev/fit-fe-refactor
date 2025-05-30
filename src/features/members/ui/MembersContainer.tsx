'use client';

import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { UserProfile } from '@/features/members/types/api.types';
import { MemberFilters, DEFAULT_MEMBER_FILTERS } from '@/features/members/types/ui.types';
import {
  useGetPublicUserList,
  useGetUserList,
  useGetPublicFilteredUserList,
} from '@/features/members/api/members.queries';
import Spinner from '@/shared/components/ui/spinner';
import { BasicProfileCard } from '@/shared/components/ui/profile-card';
import { useAuthStore } from '@/store/authStore';
import MemberFilterDialog from './MemberFilterDialog';

export default function MembersContainer() {
  const { isAuthenticated } = useAuthStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<MemberFilters>(DEFAULT_MEMBER_FILTERS);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 필터된 비로그인 회원목록 조회
  const {
    data: filteredPublicUserList,
    isLoading: isFilteredPublicLoading,
    fetchNextPage: fetchNextFilteredPublicPage,
    hasNextPage: hasNextFilteredPublicPage,
  } = useGetPublicFilteredUserList({
    region: filters.region,
    ageMin: filters.ageRange[0],
    ageMax: filters.ageRange[1],
    minLikes: filters.likesRange[0],
    maxLikes: filters.likesRange[1],
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

  // 필터가 활성화된 상태인지 판별 (region, ageRange, likesRange 중 하나라도 기본값과 다르면 true)
  const isFilterActive =
    filters.region !== DEFAULT_MEMBER_FILTERS.region ||
    filters.ageRange[0] !== DEFAULT_MEMBER_FILTERS.ageRange[0] ||
    filters.ageRange[1] !== DEFAULT_MEMBER_FILTERS.ageRange[1] ||
    filters.likesRange[0] !== DEFAULT_MEMBER_FILTERS.likesRange[0] ||
    filters.likesRange[1] !== DEFAULT_MEMBER_FILTERS.likesRange[1];

  // 현재 로딩 상태를 판별 (로그인/비로그인, 필터 적용 여부에 따라 다름)
  const isLoading = isAuthenticated
    ? isPrivateLoading // 로그인 시: 개인 회원목록 로딩
    : isFilterActive
      ? isFilteredPublicLoading // 비로그인 + 필터 적용 시: 필터된 회원목록 로딩
      : isPublicLoading; // 비로그인 + 필터 미적용 시: 전체 회원목록 로딩

  // 현재 보여줄 회원목록 데이터 (로그인/비로그인, 필터 적용 여부에 따라 다름)
  const userList = isAuthenticated
    ? privateUserList // 로그인 시: 개인 회원목록
    : isFilterActive
      ? filteredPublicUserList // 비로그인 + 필터 적용 시: 필터된 회원목록
      : publicUserList; // 비로그인 + 필터 미적용 시: 전체 회원목록

  // 무한 스크롤 시 다음 페이지를 불러오는 함수 (상태에 따라 적절한 fetch 함수 사용)
  const fetchNextPage = isAuthenticated
    ? fetchNextPrivatePage
    : isFilterActive
      ? fetchNextFilteredPublicPage
      : fetchNextPublicPage;

  // 다음 페이지가 존재하는지 여부 (상태에 따라 적절한 hasNextPage 사용)
  const hasNextPage = isAuthenticated
    ? hasNextPrivatePage
    : isFilterActive
      ? hasNextFilteredPublicPage
      : hasNextPublicPage;

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

  // 중복 유저 필터링
  const allUsers = userList?.pages
    .flatMap((page) => page.users)
    .filter((user, idx, arr) => arr.findIndex((u) => u.id === user.id) === idx);

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
            {allUsers?.map((user: UserProfile) => (
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
            ))}
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
            initialFilters={filters}
          />
        </div>
      )}
    </main>
  );
}
