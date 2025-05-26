'use client';

import { useEffect, useState } from 'react';
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

interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  height: number;
  mbti: string;
  imageUrl: string;
}

const femaleUsers: UserProfile[] = [
  {
    id: 'f1',
    name: '김지은',
    age: 28,
    location: '서울 강남구',
    height: 163,
    mbti: 'ENFP',
    imageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'f2',
    name: '박수진',
    age: 26,
    location: '부산 해운대구',
    height: 167,
    mbti: 'ISFJ',
    imageUrl:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'f3',
    name: '이하나',
    age: 29,
    location: '인천 연수구',
    height: 160,
    mbti: 'ENTJ',
    imageUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'f4',
    name: '최유진',
    age: 27,
    location: '대구 수성구',
    height: 170,
    mbti: 'ESFJ',
    imageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60',
  },
];

const maleUsers: UserProfile[] = [
  {
    id: 'm1',
    name: '이민준',
    age: 30,
    location: '서울 서초구',
    height: 180,
    mbti: 'INTJ',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'm2',
    name: '박지훈',
    age: 28,
    location: '부산 남구',
    height: 177,
    mbti: 'ENFJ',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'm3',
    name: '최현우',
    age: 27,
    location: '인천 미추홀구',
    height: 175,
    mbti: 'ISTP',
    imageUrl:
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'm4',
    name: '정우성',
    age: 31,
    location: '대구 달서구',
    height: 182,
    mbti: 'ISFP',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60',
  },
];

const maleVsMale: UserProfile[] = [
  {
    id: 'mm1',
    name: 'James',
    age: 25,
    location: '서울',
    height: 178,
    mbti: 'ENTP',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'mm2',
    name: 'Ethan',
    age: 27,
    location: '부산',
    height: 180,
    mbti: 'ISTJ',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'mm3',
    name: 'Noah',
    age: 29,
    location: '인천',
    height: 176,
    mbti: 'ENFP',
    imageUrl:
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'mm4',
    name: 'Liam',
    age: 26,
    location: '대구',
    height: 181,
    mbti: 'ISFJ',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60',
  },
];

const femaleVsFemale: UserProfile[] = [
  {
    id: 'ff1',
    name: 'Emma',
    age: 24,
    location: '서울',
    height: 162,
    mbti: 'INFJ',
    imageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'ff2',
    name: 'Sophia',
    age: 28,
    location: '부산',
    height: 168,
    mbti: 'ESTJ',
    imageUrl:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'ff3',
    name: 'Olivia',
    age: 27,
    location: '인천',
    height: 165,
    mbti: 'ENFJ',
    imageUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'ff4',
    name: 'Ava',
    age: 25,
    location: '대구',
    height: 170,
    mbti: 'ISFP',
    imageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60',
  },
];

// 로그인/성별 상태 (실제 서비스에서는 store나 context에서 받아옴)
const MOCK_IS_LOGGED_IN = false;
const MOCK_USER_GENDER: 'male' | 'female' | null = null;
const MATCH_PAIRS = {
  male: [
    { left: 'f1', right: 'f2' },
    { left: 'f3', right: 'f4' },
  ],
  female: [
    { left: 'm1', right: 'm2' },
    { left: 'm3', right: 'm4' },
  ],
  default: [
    { left: 'mm1', right: 'mm2' },
    { left: 'ff1', right: 'ff2' },
  ],
};

const findUserById = (users: UserProfile[], id: string): UserProfile => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};

const getMatchPairs = (
  isLoggedIn: boolean,
  userGender: 'male' | 'female' | null,
): [UserProfile, UserProfile][] => {
  try {
    if (!isLoggedIn) {
      return [
        [
          findUserById(maleVsMale, MATCH_PAIRS.default[0].left),
          findUserById(maleVsMale, MATCH_PAIRS.default[0].right),
        ],
        [
          findUserById(femaleVsFemale, MATCH_PAIRS.default[1].left),
          findUserById(femaleVsFemale, MATCH_PAIRS.default[1].right),
        ],
      ];
    }

    if (userGender === 'male') {
      return MATCH_PAIRS.male.map((pair) => [
        findUserById(femaleUsers, pair.left),
        findUserById(femaleUsers, pair.right),
      ]);
    }

    if (userGender === 'female') {
      return MATCH_PAIRS.female.map((pair) => [
        findUserById(maleUsers, pair.left),
        findUserById(maleUsers, pair.right),
      ]);
    }

    return [
      [
        findUserById(maleVsMale, MATCH_PAIRS.default[0].left),
        findUserById(maleVsMale, MATCH_PAIRS.default[0].right),
      ],
      [
        findUserById(femaleVsFemale, MATCH_PAIRS.default[1].left),
        findUserById(femaleVsFemale, MATCH_PAIRS.default[1].right),
      ],
    ];
  } catch (error) {
    console.error('매칭 쌍을 찾는 중 오류 발생:', error);
    return [];
  }
};

export default function MatchContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [matchPairs, setMatchPairs] = useState<[UserProfile, UserProfile][]>([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMatchPairs(getMatchPairs(MOCK_IS_LOGGED_IN, MOCK_USER_GENDER));
      setIsLoading(false);
    }, 1200);
  }, []);

  const handleSelectAll = (pairIndex: number) => {
    if (!MOCK_IS_LOGGED_IN) {
      setShowLoginAlert(true);
      return;
    }
    // TODO: API 연동
    console.log('모두 선택:', pairIndex);
  };

  const handleRejectAll = (pairIndex: number) => {
    if (!MOCK_IS_LOGGED_IN) {
      setShowLoginAlert(true);
      return;
    }
    // TODO: API 연동
    console.log('모두 거절:', pairIndex);
  };

  const handleSelect = () => {
    if (!MOCK_IS_LOGGED_IN) {
      setShowLoginAlert(true);
      return;
    }
    // TODO: API 연동
    console.log('선택하기');
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
            {matchPairs.map(([left, right], idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center justify-center rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-sm"
              >
                <div className="flex w-full items-center justify-center gap-2">
                  <MatchProfileCard user={left} onSelect={handleSelect} />
                  <div className="mx-2 select-none text-2xl font-bold text-rose-500">VS</div>
                  <MatchProfileCard user={right} onSelect={handleSelect} />
                </div>
                <div className="mt-4 flex w-full justify-center gap-4 border-t border-gray-200 pt-4">
                  <Button
                    onClick={() => handleSelectAll(idx)}
                    variant="default"
                    size="default"
                    className="w-full gap-1"
                  >
                    <Check className="h-4 w-4" />
                    모두 선택하기
                  </Button>
                  <Button
                    onClick={() => handleRejectAll(idx)}
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
