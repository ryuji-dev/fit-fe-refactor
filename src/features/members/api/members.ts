import {
  PaginationParams,
  UserProfileList,
  FilteredUserListParams,
} from '@/features/members/types/api.types';
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
export const getPublicFilteredUserListApi = async (
  params: FilteredUserListParams,
): Promise<UserProfileList> => {
  const queryParams = new URLSearchParams();
  if (params.cursor) queryParams.append('cursor', params.cursor);
  queryParams.append('take', params.take.toString());
  queryParams.append('region', params.region);
  queryParams.append('ageMin', params.ageMin.toString());
  queryParams.append('ageMax', params.ageMax.toString());
  queryParams.append('minLikes', params.minLikes.toString());
  queryParams.append('maxLikes', params.maxLikes.toString());

  return await fetcher(`/user-filter/public-filtered-list?${queryParams.toString()}`, {
    method: 'GET',
  });
};

// 필터된 로그인 회원목록 조회
export const getFilteredUserListApi = async (
  params: FilteredUserListParams,
): Promise<UserProfileList> => {
  const queryParams = new URLSearchParams();
  if (params.cursor) queryParams.append('cursor', params.cursor);
  queryParams.append('take', params.take.toString());
  queryParams.append('region', params.region);
  queryParams.append('ageMin', params.ageMin.toString());
  queryParams.append('ageMax', params.ageMax.toString());
  queryParams.append('minLikes', params.minLikes.toString());
  queryParams.append('maxLikes', params.maxLikes.toString());

  return await fetcher(`/user-filter/filtered-list?${queryParams.toString()}`, {
    method: 'GET',
  });
};
