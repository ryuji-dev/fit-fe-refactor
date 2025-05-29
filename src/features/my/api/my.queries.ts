import { useQuery } from '@tanstack/react-query';
import { getMyMiniProfileApi } from './my';

// 내 미니 프로필 조회
export const useGetMyMiniProfile = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: async () => {
      const data = await getMyMiniProfileApi();
      // 필요한 정보만 추출해서 반환
      return {
        email: data.email ?? '',
        nickname: data.nickname ?? '',
        profileImage: data.profile?.profileImage?.find((img) => img.isMain)?.imageUrl ?? '',
      };
    },
  });
};
