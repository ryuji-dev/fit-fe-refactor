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

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`[FETCH ERROR] ${response.status} ${url}`, errorData);

      const error = new FetchError(response.status, getErrorMessage(response.status), errorData);

      if (response.status === 401 && !endpoint.includes('/auth/login')) {
        window.location.href = '/auth';
      }

      throw error;
    }

    return response.json();
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new FetchError(0, '네트워크 오류가 발생했습니다.');
  }
}
