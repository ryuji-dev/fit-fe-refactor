import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  CheckEmailResponse,
  CategoryItem,
} from '@/features/auth/types/api.types';
import { fetcher } from '@/shared/lib/fetcher';

// 로그인
export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  return fetcher<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 로그아웃
export const logoutApi = async (): Promise<void> => {
  return fetcher<void>('/auth/logout', {
    method: 'POST',
  });
};

// 회원가입
export const signupApi = async (data: SignupRequest): Promise<SignupResponse> => {
  return fetcher<SignupResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 이메일 중복 확인
export const checkEmailDuplicationApi = async (email: string): Promise<CheckEmailResponse> => {
  const response = await fetcher<CheckEmailResponse>('/auth/check-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  // 서버에서 빈 객체를 반환하는 경우, 이메일이 사용 가능한 것으로 처리
  if (!response || Object.keys(response).length === 0) {
    return { isAvailable: true, message: '사용 가능한 이메일입니다.' };
  }

  return response;
};

// 이메일 인증 코드 전송
export const sendEmailVerificationCodeApi = async (email: string): Promise<void> => {
  return fetcher<void>('/auth/send-verification-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

// 이메일 인증 코드 확인
export const verifyEmailCodeApi = async (code: number): Promise<void> => {
  return fetcher<void>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
};

// 관심사 카테고리 조회
export const getInterestCategoriesApi = async (): Promise<CategoryItem[]> => {
  return fetcher<CategoryItem[]>('/interest-category', {
    method: 'GET',
  });
};

// 이런 얘기 많이 들어요 카테고리 조회
export const getFeedbackCategoriesApi = async (): Promise<CategoryItem[]> => {
  return fetcher<CategoryItem[]>('/feedback', {
    method: 'GET',
  });
};

// 저는 이런 사람이에요 카테고리 조회
export const getSelfIntroCategoriesApi = async (): Promise<CategoryItem[]> => {
  return fetcher<CategoryItem[]>('/introduction', {
    method: 'GET',
  });
};

// 이미지 업로드
export const uploadImageApi = async (formData: FormData): Promise<string> => {
  return fetcher<string>('/profile-image/temp', {
    method: 'POST',
    body: formData,
  });
};
