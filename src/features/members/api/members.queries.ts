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
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

// 필터된 로그인 회원목록 조회
