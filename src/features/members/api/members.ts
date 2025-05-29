import { PaginationParams, UserProfileList } from '@/features/members/types/api.types';
import { fetcher } from '@/shared/lib/fetcher';

// 비로그인 회원목록 조회
export const getPublicUserListApi = async (params: PaginationParams): Promise<UserProfileList> => {
  const queryParams = new URLSearchParams();
  if (params.cursor) queryParams.append('cursor', params.cursor);
  queryParams.append('take', params.take.toString());

  return await fetcher(`/user-filter/public-list?${queryParams.toString()}`, {
    method: 'GET',
  });
};

// 로그인 회원목록 조회
export const getUserListApi = async (params: PaginationParams): Promise<UserProfileList> => {
  const queryParams = new URLSearchParams();
  if (params.cursor) queryParams.append('cursor', params.cursor);
  queryParams.append('take', params.take.toString());

  return await fetcher(`/user-filter/list?${queryParams.toString()}`, {
    method: 'GET',
  });
};

// 필터된 비로그인 회원목록 조회

// 필터된 로그인 회원목록 조회
