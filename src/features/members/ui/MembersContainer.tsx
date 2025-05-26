'use client';

import { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { MemberFilters } from '@/features/members/members.types';
import Spinner from '@/shared/components/ui/spinner';
import { ProfileCard } from '@/shared/components/ui/profile-card';
import MemberFilterDialog from './MemberFilterDialog';

interface MemberProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  likes: number;
  imageUrl: string;
  isOnline: boolean;
}

const memberMockData: MemberProfile[] = [
  {
    id: 'member-1',
    name: '김지은',
    age: 24,
    location: '서울',
    likes: 320,
    imageUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-2',
    name: '이민준',
    age: 27,
    location: '부산',
    likes: 210,
    imageUrl:
      'https://images.unsplash.com/photo-1596940872506-6d16d1b06fb0?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-3',
    name: '박수진',
    age: 25,
    location: '인천',
    likes: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1739133783212-e1c93795d9c7?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-4',
    name: '최현우',
    age: 26,
    location: '대구',
    likes: 480,
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-5',
    name: '정민서',
    age: 23,
    location: '서울',
    likes: 390,
    imageUrl:
      'https://images.unsplash.com/photo-1701351382146-035bd68cdb6d?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-6',
    name: '강동원',
    age: 28,
    location: '부산',
    likes: 275,
    imageUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-7',
    name: '윤서연',
    age: 22,
    location: '인천',
    likes: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1596940872506-6d16d1b06fb0?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-8',
    name: '임준호',
    age: 29,
    location: '대구',
    likes: 320,
    imageUrl:
      'https://images.unsplash.com/photo-1739133783212-e1c93795d9c7?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-9',
    name: '한소희',
    age: 26,
    location: '서울',
    likes: 210,
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-10',
    name: '송민재',
    age: 25,
    location: '부산',
    likes: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1701351382146-035bd68cdb6d?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-11',
    name: '이하나',
    age: 28,
    location: '서울',
    likes: 420,
    imageUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-12',
    name: '박지훈',
    age: 27,
    location: '부산',
    likes: 310,
    imageUrl:
      'https://images.unsplash.com/photo-1596940872506-6d16d1b06fb0?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-13',
    name: '최유진',
    age: 25,
    location: '인천',
    likes: 190,
    imageUrl:
      'https://images.unsplash.com/photo-1739133783212-e1c93795d9c7?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-14',
    name: '정우성',
    age: 26,
    location: '대구',
    likes: 480,
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-15',
    name: '강다은',
    age: 23,
    location: '서울',
    likes: 390,
    imageUrl:
      'https://images.unsplash.com/photo-1701351382146-035bd68cdb6d?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-16',
    name: '윤시우',
    age: 28,
    location: '부산',
    likes: 275,
    imageUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-17',
    name: '임지원',
    age: 22,
    location: '인천',
    likes: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1596940872506-6d16d1b06fb0?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-18',
    name: '한승우',
    age: 29,
    location: '대구',
    likes: 320,
    imageUrl:
      'https://images.unsplash.com/photo-1739133783212-e1c93795d9c7?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-19',
    name: '송하은',
    age: 26,
    location: '서울',
    likes: 210,
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-20',
    name: '김태현',
    age: 25,
    location: '부산',
    likes: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1701351382146-035bd68cdb6d?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-21',
    name: '이지은',
    age: 24,
    location: '서울',
    likes: 320,
    imageUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-22',
    name: '박준호',
    age: 27,
    location: '부산',
    likes: 210,
    imageUrl:
      'https://images.unsplash.com/photo-1596940872506-6d16d1b06fb0?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-23',
    name: '최수진',
    age: 25,
    location: '인천',
    likes: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1739133783212-e1c93795d9c7?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-24',
    name: '정현우',
    age: 26,
    location: '대구',
    likes: 480,
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-25',
    name: '강민서',
    age: 23,
    location: '서울',
    likes: 390,
    imageUrl:
      'https://images.unsplash.com/photo-1701351382146-035bd68cdb6d?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-26',
    name: '윤동원',
    age: 28,
    location: '부산',
    likes: 275,
    imageUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-27',
    name: '임서연',
    age: 22,
    location: '인천',
    likes: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1596940872506-6d16d1b06fb0?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-28',
    name: '한준호',
    age: 29,
    location: '대구',
    likes: 320,
    imageUrl:
      'https://images.unsplash.com/photo-1739133783212-e1c93795d9c7?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'member-29',
    name: '송소희',
    age: 26,
    location: '서울',
    likes: 210,
    imageUrl:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'member-30',
    name: '김민재',
    age: 25,
    location: '부산',
    likes: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1701351382146-035bd68cdb6d?auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
];

export default function MembersContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<MemberFilters>({
    region: '',
    ageRange: [20, 50],
    likesRange: [0, 500],
  });

  useEffect(() => {
    setTimeout(() => {
      setMembers(memberMockData);
      setIsLoading(false);
    }, 1200);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {};

  const handleApplyFilters = (newFilters: MemberFilters) => {
    setFilters(newFilters);
    const filteredMembers = memberMockData.filter((member) => {
      const matchesRegion = !newFilters.region || member.location === newFilters.region;
      const matchesAge =
        member.age >= newFilters.ageRange[0] && member.age <= newFilters.ageRange[1];
      const matchesLikes =
        member.likes >= newFilters.likesRange[0] && member.likes <= newFilters.likesRange[1];
      return matchesRegion && matchesAge && matchesLikes;
    });
    setMembers(filteredMembers);
  };

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-gray-500">회원 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div
          className="scrollbar-hide container mx-auto mb-16 max-h-[calc(100vh-160px)] overflow-y-auto px-6 py-8"
          onScroll={handleScroll}
        >
          <header className="mb-12">
            <div className="relative flex items-center justify-center">
              <h1 className="text-2xl font-bold text-zinc-900">회원 목록</h1>
              <button
                className="absolute right-0 p-2 text-zinc-500 hover:text-zinc-600 active:text-zinc-700"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-center text-sm text-zinc-500">
              지금 접속 중인 이성과 새로운 인연을 만들어보세요.
            </p>
          </header>

          <section className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => (
              <ProfileCard key={member.id} profile={member} />
            ))}
          </section>

          <MemberFilterDialog
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={handleApplyFilters}
          />
        </div>
      )}
    </main>
  );
}
