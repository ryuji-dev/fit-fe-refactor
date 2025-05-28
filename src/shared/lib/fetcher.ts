const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/find-email',
  '/auth/find-password',
  '/auth/register',
  '/auth/check-email',
  '/auth/check-nickname',
  '/auth/send-verification-email',
  '/auth/verify-email',
  '/auth/google',
  '/auth/google/login/callback',
  '/auth/kakao',
  '/auth/kakao/login/callback',
  '/auth/naver',
  '/auth/naver/login/callback',
  '/auth/social-register',
  '/match/random/public',
  '/user/filtered-users',
];

const getErrorMessage = (status: number): string => {
  switch (status) {
    case 401:
      return '인증이 필요합니다. 다시 로그인해주세요.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    default:
      return `요청 처리 중 오류가 발생했습니다. (${status})`;
  }
};

export class FetchError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'FetchError';
  }
}

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.text();
        console.error(`[FETCH ERROR] ${response.status} ${url}`, errorData);
      } catch (e) {
        console.error(`[FETCH ERROR] ${response.status} ${url} - 응답 파싱 실패`);
      }

      const error = new FetchError(response.status, getErrorMessage(response.status), errorData);

      if (response.status === 401 && !PUBLIC_ENDPOINTS.some((path) => endpoint.startsWith(path))) {
        window.location.href = '/auth';
      }

      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch (e) {
        console.error('[JSON PARSE ERROR]', e);
        throw new FetchError(0, '응답 데이터 파싱 중 오류가 발생했습니다.');
      }
    }

    // JSON이 아닌 경우 빈 객체 반환
    return {} as T;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    console.error('[FETCH ERROR]', error);
    throw new FetchError(0, '네트워크 오류가 발생했습니다.');
  }
}
