'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData } from '@/entities/auth/login.types';
import { loginSchema } from '@/entities/auth/login.schema';
import Input from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import SocialLoginButton from './SocialLoginButton';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: 로그인 로직 구현
      console.log(data);
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  const handleSocialLogin = (provider: 'naver' | 'kakao' | 'google') => {
    // TODO: 소셜 로그인 로직 구현
    console.log(`${provider} 로그인 시도`);
  };

  return (
    <main className="mb-20 flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 to-red-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">로그인</h1>
        </header>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="이메일"
            type="email"
            placeholder="example@email.com"
            register={register('email')}
            error={errors.email}
            isDirty={dirtyFields.email}
            variant="rose"
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            register={register('password')}
            error={errors.password}
            isDirty={dirtyFields.password}
            showPasswordToggle
            variant="rose"
          />
          <Button
            variant="default"
            size="xl"
            type="submit"
            disabled={isSubmitting}
            className="h-14 w-full text-lg font-semibold"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>

          <div className="mb-4 mt-2 flex justify-center gap-2 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-600 active:text-gray-700">
              이메일 찾기
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-500 hover:text-gray-600 active:text-gray-700">
              비밀번호 찾기
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="/auth/signup"
              className="font-medium text-gray-500 hover:text-gray-600 active:text-gray-700"
            >
              회원가입
            </a>
          </div>
        </form>

        {/* 구분선 */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-400">또는</span>
          </div>
        </div>

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col gap-3">
          <SocialLoginButton provider="naver" onClick={() => handleSocialLogin('naver')} />
          <SocialLoginButton provider="kakao" onClick={() => handleSocialLogin('kakao')} />
          <SocialLoginButton provider="google" onClick={() => handleSocialLogin('google')} />
        </div>
      </div>
    </main>
  );
}
