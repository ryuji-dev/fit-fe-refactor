import { useQuery } from '@tanstack/react-query';
import { getReceivedListApi } from './received';

// 받은 호감 목록 조회
export const useGetReceivedList = () => {
  return useQuery({
    queryKey: ['receivedList'],
    queryFn: getReceivedListApi,
  });
};
