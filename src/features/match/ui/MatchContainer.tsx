'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Spinner from '@/shared/components/ui/spinner';
import { Button } from '@/shared/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { MatchProfileCard } from './MatchProfileCard';
import { useGetPublicRandomMatch, useGetRandomMatch } from '../api/math.queries';
import { useAuthStore } from '@/store/authStore';

export default function MatchContainer() {
  const { isAuthenticated } = useAuthStore();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // 로그인 상태에 따라 적절한 API만 호출
  const { data: publicMatchData, isLoading: isPublicLoading } = useGetPublicRandomMatch();
  const { data: privateMatchData, isLoading: isPrivateLoading } = useGetRandomMatch({
    enabled: isAuthenticated, // 로그인 상태일 때만 호출
  });

  const isLoading = isAuthenticated ? isPrivateLoading : isPublicLoading;
  const matchData = isAuthenticated ? privateMatchData : publicMatchData;

  const handleSelectAll = (matchId: string) => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }
    // TODO: API 연동
    console.log('모두 선택:', matchId);
  };

  const handleRejectAll = (matchId: string) => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }
    // TODO: API 연동
    console.log('모두 거절:', matchId);
  };

  const handleSelect = (matchId: string, userId: string) => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }
    // TODO: API 연동
    console.log('선택하기:', matchId, userId);
  };

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">오늘의 인연을 찾는 중...</p>
        </div>
      ) : (
        <div className="container mx-auto mb-16 px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-zinc-900">오늘의 매칭</h1>
            <p className="text-sm text-zinc-500">매일 오전 10시, 새로운 인연을 만나보세요!</p>
          </div>
          <div className="flex flex-col gap-8">
            {matchData?.matches.map((match) => (
              <div
                key={match.matchId}
                className="relative flex flex-col items-center justify-center rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="flex w-full items-center justify-center gap-2">
                  <MatchProfileCard
                    user={match.user1}
                    onSelect={() => handleSelect(match.matchId, match.user1.id)}
                  />
                  <div className="mx-2 select-none text-2xl font-bold text-rose-500">VS</div>
                  <MatchProfileCard
                    user={match.user2}
                    onSelect={() => handleSelect(match.matchId, match.user2.id)}
                  />
                </div>
                <div className="mt-4 flex w-full justify-center gap-4 border-t border-gray-200 pt-4">
                  <Button
                    onClick={() => handleSelectAll(match.matchId)}
                    variant="default"
                    size="default"
                    className="w-full gap-1"
                  >
                    <Check className="h-4 w-4" />
                    모두 선택하기
                  </Button>
                  <Button
                    onClick={() => handleRejectAll(match.matchId)}
                    variant="outline"
                    size="default"
                    className="gap-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인이 필요해요</AlertDialogTitle>
            <AlertDialogDescription>
              매칭을 시작하기 위해서는 로그인이 필요합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => (window.location.href = '/auth')}>
              로그인하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
