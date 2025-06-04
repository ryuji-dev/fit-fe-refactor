import { PaginationParams } from '@/features/members/types/api.types';
import { ChatRoomProfileList } from '@/features/chats/types/api.types';
import { fetcher } from '@/shared/lib/fetcher';

// 채팅방 목록 조회
export const getChatRoomsApi = async (params: {
  page: number;
  pageSize: number;
}): Promise<ChatRoomProfileList> => {
  const queryParams = new URLSearchParams();
  queryParams.append('page', params.page.toString());
  queryParams.append('pageSize', params.pageSize.toString());

  return await fetcher<ChatRoomProfileList>(`/chat/chatRooms?${queryParams.toString()}`, {
    method: 'GET',
  });
};
