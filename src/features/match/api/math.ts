import { MatchProfile } from '@/features/match/types/api.types';
import { fetcher } from '@/shared/lib/fetcher';

// 비로그인 사용자 랜덤 매칭 조회
export const getPublicRandomMatchApi = async (): Promise<MatchProfile> => {
  return fetcher<MatchProfile>('/match/random/public', {
    method: 'GET',
  });
};

// 로그인 사용자 랜덤 매칭 조회
export const getRandomMatchApi = async (): Promise<MatchProfile> => {
  return fetcher<MatchProfile>('/match/random', {
    method: 'GET',
  });
};
