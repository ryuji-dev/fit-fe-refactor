'use client';

import Link from 'next/link';
import { House } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

// 테스트용 에러 발생 컴포넌트
export const ThrowError = (): React.ReactNode => {
  throw new Error('고의 에러 발생!');
};

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-rose-100 to-rose-200 px-4">
      <div className="text-center">
        <h1 className="animate-pulse text-9xl font-bold text-rose-500">500</h1>
        <div className="mt-4 space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900">문제가 발생했습니다</h2>
          <p className="text-gray-500">일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
          <div className="mt-8">
            <Button asChild variant="default" size="xl" className="px-4 text-lg">
              <Link href="/" className="flex items-center gap-2">
                <House />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
