'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReceivedProfile } from '@/features/received/types/ui.types';
import Spinner from '@/shared/components/ui/spinner';
import useHydrated from '@/shared/hooks/useHydrated';
import { useAuthStore } from '@/store/authStore';
import ReceivedProfileSection from './ReceivedProfileSection';
import { useGetReceivedList } from '../api/received.queries';
import { UserProfile } from '@/features/members/types/api.types';

// 받은 호감 목록 데이터를 UI 타입으로 변환하는 함수
const toReceivedProfile = (profile: UserProfile & { isSuccess?: boolean }): ReceivedProfile => ({
  id: profile.id,
  name: profile.nickname,
  age: profile.age || 0,
  location: profile.region,
  likes: profile.likeCount,
  imageUrl: profile.profileImage,
  isOnline: false, // TODO: 온라인 상태 정보가 API에 추가되면 업데이트 필요
  isSuccess: profile.isSuccess,
});

export default function ReceivedContainer() {
  const [showMoreMatches, setShowMoreMatches] = useState(false);
  const [showMoreLikes, setShowMoreLikes] = useState(false);
  const [showMoreCoffeeChats, setShowMoreCoffeeChats] = useState(false);
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuthStore((state) => state.user);
  const { data: receivedData, isLoading } = useGetReceivedList();

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.push('/auth');
      return;
    }
  }, [hydrated, user, router]);

  if (!user || !hydrated) return null;

  const matchProfiles = receivedData?.matchList.map(toReceivedProfile) || [];
  const likeProfiles = receivedData?.likeList.map(toReceivedProfile) || [];
  const coffeeChatProfiles = receivedData?.coffeeChatList.map(toReceivedProfile) || [];

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">받은 호감 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div className="scrollbar-hide container mx-auto mb-16 max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-8">
          <header className="mb-12">
            <div className="relative flex items-center justify-center">
              <h1 className="text-2xl font-bold text-zinc-900">받은 호감</h1>
            </div>
            <p className="mt-2 text-center text-sm text-zinc-500">
              누군가, 당신에게 설레는 마음을 보냈어요.
            </p>
          </header>

          <ReceivedProfileSection
            title="선택 받은 매칭"
            profiles={matchProfiles}
            showMore={showMoreMatches}
            onToggleShowMore={() => setShowMoreMatches(!showMoreMatches)}
            isActionCard
            onAccept={(id: string) => console.log('매칭 수락:', id)}
            onReject={(id: string) => console.log('매칭 거절:', id)}
          />

          <ReceivedProfileSection
            title="받은 호감"
            profiles={likeProfiles}
            showMore={showMoreLikes}
            onToggleShowMore={() => setShowMoreLikes(!showMoreLikes)}
          />

          <ReceivedProfileSection
            title="신청 받은 커피챗"
            profiles={coffeeChatProfiles}
            showMore={showMoreCoffeeChats}
            onToggleShowMore={() => setShowMoreCoffeeChats(!showMoreCoffeeChats)}
            isActionCard
            onAccept={(id: string) => console.log('커피챗 수락:', id)}
            onReject={(id: string) => console.log('커피챗 거절:', id)}
          />
        </div>
      )}
    </main>
  );
}
