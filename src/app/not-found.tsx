import Link from 'next/link';
import { House } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-violet-200 to-rose-200 px-4">
      <div className="text-center">
        <h1 className="animate-pulse text-9xl font-bold text-violet-500">404</h1>
        <div className="mt-4 space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
          <div className="mt-8">
            <Button variant="secondary" size="xl" className="px-4 text-lg">
              <Link href="/" className="flex items-center gap-2">
                <House className="h-6 w-6" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
