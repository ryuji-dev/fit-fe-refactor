'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/shared/components/ui/spinner';
import { useAuthStore } from '@/store/authStore';
import ReceivedProfileSection from './ReceivedProfileSection';

export interface ReceivedProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  likes: number;
  imageUrl: string;
  isOnline: boolean;
}

const receivedMockData: ReceivedProfile[] = [
  {
    id: 'received-1',
    name: '김지은',
    age: 24,
    location: '서울',
    likes: 320,
    imageUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'received-2',
    name: '이민준',
    age: 27,
    location: '부산',
    likes: 210,
    imageUrl:
      'https://images.unsplash.com/photo-1596940872506-6d16d1b06fb0?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'received-3',
    name: '박수진',
    age: 25,
    location: '인천',
    likes: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1739133783212-e1c93795d9c7?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'received-4',
    name: '최현우',
    age: 26,
    location: '대구',
    likes: 480,
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'received-5',
    name: '정민서',
    age: 23,
    location: '서울',
    likes: 390,
    imageUrl:
      'https://images.unsplash.com/photo-1701351382146-035bd68cdb6d?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
];

export default function ReceivedContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreMatches, setShowMoreMatches] = useState(false);
  const [showMoreLikes, setShowMoreLikes] = useState(false);
  const [showMoreCoffeeChats, setShowMoreCoffeeChats] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {};

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }
    setIsLoading(false);
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">받은 호감 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div
          className="scrollbar-hide container mx-auto mb-16 max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-8"
          onScroll={handleScroll}
        >
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
            profiles={receivedMockData}
            showMore={showMoreMatches}
            onToggleShowMore={() => setShowMoreMatches(!showMoreMatches)}
            isActionCard
            onAccept={(id) => console.log('매칭 수락:', id)}
            onReject={(id) => console.log('매칭 거절:', id)}
          />

          <ReceivedProfileSection
            title="받은 호감"
            profiles={receivedMockData}
            showMore={showMoreLikes}
            onToggleShowMore={() => setShowMoreLikes(!showMoreLikes)}
          />

          <ReceivedProfileSection
            title="신청 받은 커피챗"
            profiles={receivedMockData}
            showMore={showMoreCoffeeChats}
            onToggleShowMore={() => setShowMoreCoffeeChats(!showMoreCoffeeChats)}
            isActionCard
            onAccept={(id) => console.log('커피챗 수락:', id)}
            onReject={(id) => console.log('커피챗 거절:', id)}
          />
        </div>
      )}
    </main>
  );
}
