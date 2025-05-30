export interface UserProfile {
  id: string;
  nickname: string;
  region: string;
  likeCount: number;
  age: number | null;
  profileImage: string;
}

export interface PaginationParams {
  cursor?: string | null;
  take: number;
}

export interface UserProfileList {
  users: UserProfile[];
  nextCursor: string | null;
}

export interface FilteredUserListParams extends PaginationParams {
  region: string;
  ageMin: number;
  ageMax: number;
  minLikes: number;
  maxLikes: number;
}
