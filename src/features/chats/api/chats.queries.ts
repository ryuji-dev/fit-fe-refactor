import { useQuery } from '@tanstack/react-query';
import { getChatRoomsApi } from './chats';

export const PAGE_SIZE = 5;

// 채팅방 목록 조회
export const useGetChatRooms = (page: number) => {
  return useQuery({
    queryKey: ['chatRooms', page],
    queryFn: () => getChatRoomsApi({ page, pageSize: PAGE_SIZE }),
  });
};
