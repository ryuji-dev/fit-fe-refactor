import { fetcher } from '@/shared/lib/fetcher';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
  };
}

interface CheckEmailResponse {
  isAvailable: boolean;
  message?: string;
}

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  return fetcher<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function logoutApi(): Promise<void> {
  return fetcher<void>('/auth/logout', {
    method: 'POST',
  });
}

// 이메일 중복 확인
export async function checkEmailDuplicationApi(email: string): Promise<CheckEmailResponse> {
  const response = await fetcher<CheckEmailResponse>('/auth/check-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  // 서버에서 빈 객체를 반환하는 경우, 이메일이 사용 가능한 것으로 처리
  if (!response || Object.keys(response).length === 0) {
    return { isAvailable: true, message: '사용 가능한 이메일입니다.' };
  }

  return response;
}

// 이메일 인증 코드 전송
export async function sendEmailVerificationCodeApi(email: string): Promise<void> {
  return fetcher<void>('/auth/send-verification-email', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// 이메일 인증 코드 확인
export async function verifyEmailCodeApi(code: number): Promise<void> {
  return fetcher<void>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
}
