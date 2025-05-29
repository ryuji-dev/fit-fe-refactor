import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import {
  loginApi,
  logoutApi,
  signupApi,
  checkEmailDuplicationApi,
  sendEmailVerificationCodeApi,
  verifyEmailCodeApi,
  uploadImageApi,
} from './auth';

// 로그인
export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success(`${data.user.nickname}님 환영합니다 🎉`);
      router.push('/match');
    },
    onError: () => {
      toast.error('아이디나 비밀번호를 다시 확인해주세요.');
    },
  });
};

// 로그아웃
export const useLogout = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success('로그아웃 완료! 👋');
      router.push('/');
    },
    onError: (error) => {
      toast.error('로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Logout error:', error);
    },
  });
};

// 회원가입
export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(`회원가입이 완료되었습니다. 로그인 후 이용해주세요. ☺️`);
      router.push('/auth');
    },
    onError: () => {
      toast.error('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};

// 이메일 중복 확인
export const useCheckEmailDuplication = () => {
  return useMutation({
    mutationFn: checkEmailDuplicationApi,
    onSuccess: (response) => {
      const { isAvailable, message } = response;

      if (isAvailable) {
        toast.success(message || '사용 가능한 이메일입니다.');
      } else {
        toast.error(message || '이미 사용 중인 이메일입니다.');
        throw new Error('이메일 중복');
      }
    },
    onError: (error) => {
      if (error instanceof Error && error.message === '이메일 중복') {
        return;
      }

      if (error instanceof Error && error.name === 'FetchError') {
        toast.error(error.message);
        return;
      }

      toast.error('이메일 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('이메일 중복 확인 에러:', error);
    },
  });
};

// 이메일 인증 코드 전송
export const useSendEmailVerificationCode = () => {
  return useMutation({
    mutationFn: sendEmailVerificationCodeApi,
    onSuccess: () => {
      toast.success('인증 코드가 전송되었습니다. 이메일을 확인해주세요.');
    },
    onError: (error) => {
      toast.error('인증 코드 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Send email verification code error:', error);
    },
  });
};

// 이메일 인증 코드 확인
export const useVerifyEmailCode = () => {
  return useMutation({
    mutationFn: verifyEmailCodeApi,
    onSuccess: () => {
      toast.success('이메일 인증이 완료되었습니다.');
    },
    onError: (error) => {
      toast.error('인증 코드 확인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Verify email code error:', error);
    },
  });
};

// 이미지 업로드
export const useUploadImage = () => {
  return useMutation<string, Error, FormData>({
    mutationFn: uploadImageApi,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      throw error;
    },
  });
};
