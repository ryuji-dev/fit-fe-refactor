import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { loginApi, logoutApi } from './api/auth';

export function useLogin() {
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
}

export function useLogout() {
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
      toast.error('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Logout error:', error);
    },
  });
}
