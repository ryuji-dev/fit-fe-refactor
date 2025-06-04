export interface ChatRoomPartner {
  id: string;
  name: string;
  age: number | null;
  region: string;
  profileImage: string;
  isOnline: boolean;
  lastMessage: string | null;
  lastMessageTime: string | null;
  isUnread: boolean;
}

export interface ChatRoomProfile {
  id: string;
  name: string;
  userId: string;
  partner: ChatRoomPartner;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoomProfileList {
  rooms: ChatRoomProfile[];
  totalCount: number;
  currentPage: string;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
