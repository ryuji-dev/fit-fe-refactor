import { MyMiniProfileResponse } from '@/features/my/types/api.types';
import { fetcher } from '@/shared/lib/fetcher';

// 내 미니 프로필 조회
export const getMyMiniProfileApi = async (): Promise<MyMiniProfileResponse> => {
  return await fetcher('/user/me', {
    method: 'GET',
  });
};
