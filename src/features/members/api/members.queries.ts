import { useInfiniteQuery } from '@tanstack/react-query';
import { getPublicUserListApi, getUserListApi, getPublicFilteredUserListApi } from './members';
import { FilteredUserListParams } from '../types/api.types';

const TAKE = 6;

// 비로그인 회원목록 조회
export const useGetPublicUserList = () => {
  return useInfiniteQuery({
    queryKey: ['publicUserList'],
    queryFn: ({ pageParam }) =>
      getPublicUserListApi({ cursor: pageParam as string | null, take: TAKE }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

// 로그인 회원목록 조회
export const useGetUserList = (options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ['userList'],
    queryFn: ({ pageParam }) => getUserListApi({ cursor: pageParam as string | null, take: TAKE }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: options?.enabled,
  });
};

// 필터된 비로그인 회원목록 조회
export const useGetPublicFilteredUserList = (
  filters: Omit<FilteredUserListParams, 'cursor' | 'take'>,
) => {
  return useInfiniteQuery({
    queryKey: ['publicFilteredUserList', filters],
    queryFn: ({ pageParam }) =>
      getPublicFilteredUserListApi({
        ...filters,
        cursor: pageParam as string | null,
        take: TAKE,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage, allPages) => {
      // 모든 유저 id를 flat하게 모음
      const allUserIds = allPages.flatMap((page) => page.users.map((u) => u.id));
      // 마지막 페이지의 유저 id가 이미 allUserIds에 다 포함되어 있으면 중단
      const isAllDuplicated = lastPage.users.every(
        (u) => allUserIds.filter((id) => id === u.id).length > 1,
      );
      if (isAllDuplicated) return undefined;
      return lastPage.nextCursor;
    },
  });
};

// 필터된 로그인 회원목록 조회
