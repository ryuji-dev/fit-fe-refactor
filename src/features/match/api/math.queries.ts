import { useQuery } from '@tanstack/react-query';
import { getPublicRandomMatchApi, getRandomMatchApi } from './math';

// 비로그인 사용자 랜덤 매칭 조회
export const useGetPublicRandomMatch = () => {
  return useQuery({
    queryKey: ['publicRandomMatch'],
    queryFn: getPublicRandomMatchApi,
  });
};

// 로그인 사용자 랜덤 매칭 조회
export const useGetRandomMatch = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['randomMatch'],
    queryFn: getRandomMatchApi,
    enabled: options?.enabled,
  });
};
