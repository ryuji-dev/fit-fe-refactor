export interface MyMiniProfileImage {
  isMain: boolean;
  imageUrl: string;
}

export interface MyMiniProfile {
  profileImage: MyMiniProfileImage[];
}

export interface MyMiniProfileResponse {
  email: string;
  nickname: string;
  profile?: MyMiniProfile;
}
