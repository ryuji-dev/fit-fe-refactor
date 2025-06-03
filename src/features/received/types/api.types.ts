import { UserProfile } from '@/features/members/types/api.types';

export interface ReceivedProfileList {
  likeList: UserProfile[];
  coffeeChatList: UserProfile[];
  matchList: (UserProfile & {
    isSuccess: boolean;
  })[];
}
