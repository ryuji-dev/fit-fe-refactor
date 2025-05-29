// 매칭된 사용자의 프로필 이미지 타입
export interface ProfileImageInterface {
  id: string;
  imageUrl: string;
  key: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface MbtiInterface {
  id: string;
  mbti: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// 관심사 카테고리 타입
interface InterestCategoryInterface {
  id: string;
  name: string;
}

interface UserInterestCategoryInterface {
  id: string;
  interestCategory: InterestCategoryInterface;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// 자기소개 타입
interface IntroductionInterface {
  id: string;
  name: string;
}

interface UserIntroductionInterface {
  id: string;
  introduction: IntroductionInterface;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// 피드백 타입
interface FeedbackInterface {
  id: string;
  name: string;
}

interface UserFeedbackInterface {
  id: string;
  feedback: FeedbackInterface;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// 프로필 타입
interface ProfileInterface {
  id: string;
  userIntroductions: UserIntroductionInterface[];
  userFeedbacks: UserFeedbackInterface[];
  profileImage: ProfileImageInterface[];
  mbti: MbtiInterface;
  interestCategory: UserInterestCategoryInterface[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// 사용자 타입
export interface UserInterface {
  id: string;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  location: string | null;
  gender: string;
  region: string;
  height: number;
  job: string;
  phone: string;
  profile: ProfileInterface;
  latitude: number | null;
  longitude: number | null;
  likeCount: number;
  coffee: number;
  role: string;
  isProfileComplete: boolean;
  authProvider: string;
  socketId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// 매칭 타입
interface MatchInterface {
  matchId: string;
  user1: UserInterface;
  user2: UserInterface;
}

// 매칭 프로필 응답 타입
export interface MatchProfile {
  matches: MatchInterface[];
}
