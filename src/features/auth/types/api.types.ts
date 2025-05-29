export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
  message: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  height: number;
  nickname: string;
  birthday: string;
  gender: string;
  phone?: string;
  region: string;
  job: string;
  mbti: string;
  selfintro: string[];
  listening: string[];
  interests: string[];
  images: string[];
  authProvider: 'email' | 'google' | 'kakao' | 'naver';
}

export interface SignupResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
    job: string;
    gender: string;
    birthday: string;
    region: string;
    phone?: string;
    interests: string[];
    listening: string[];
    selfintro: string[];
    createdAt: string;
  };
  message: string;
}

export interface CheckEmailResponse {
  isAvailable: boolean;
  message?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
}
