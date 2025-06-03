import { fetcher } from '@/shared/lib/fetcher';
import { ReceivedProfileList } from '@/features/received/types/api.types';

// 받은 호감 목록 조회
export const getReceivedListApi = async (): Promise<ReceivedProfileList> => {
  return await fetcher('/spark-list', {
    method: 'GET',
  });
};
