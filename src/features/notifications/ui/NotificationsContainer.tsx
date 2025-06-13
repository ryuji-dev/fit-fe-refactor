'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Trash2 } from 'lucide-react';
import Spinner from '@/shared/components/ui/spinner';
import useHydrated from '@/shared/hooks/useHydrated';
import { useAuthStore } from '@/store/authStore';

// 알림 타입 정의
interface Notification {
  id: string;
  type:
    | 'LIKE'
    | 'MATCH_REQUEST'
    | 'MATCH_RESPONSE'
    | 'CHAT'
    | 'COFFEE_CHAT_RESPONSE'
    | 'COFFEE_CHAT_REQUEST';
  title: string;
  content: string;
  createdAt: string;
  data?: {
    chatRoomId?: string;
    senderId?: string;
  };
}

// 목데이터
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'LIKE',
    title: '좋아요 알림',
    content: '홍길동님이 회원님의 프로필을 좋아합니다.',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'CHAT',
    title: '채팅 알림',
    content: '김철수님이 메시지를 보냈습니다.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    data: {
      chatRoomId: '123',
      senderId: '456',
    },
  },
  {
    id: '3',
    type: 'MATCH_REQUEST',
    title: '매칭 요청 알림',
    content: '이영희님이 매칭을 요청했습니다.',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

// 날짜 포맷 함수
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString('ko-KR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

// 알림 아이템 컴포넌트
const NotificationItem = ({
  notification,
  onDelete,
}: {
  notification: Notification;
  onDelete: () => void;
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    switch (notification.type) {
      case 'LIKE':
      case 'MATCH_REQUEST':
      case 'COFFEE_CHAT_REQUEST':
        router.push('/friends');
        break;
      case 'MATCH_RESPONSE':
        router.push('/matching-results');
        break;
      case 'CHAT':
      case 'COFFEE_CHAT_RESPONSE':
        if (notification.data?.chatRoomId && notification.data?.senderId) {
          router.push(
            `/chats/${notification.data.chatRoomId}?userId=${notification.data.senderId}`,
          );
        }
        break;
    }
  };

  return (
    <div
      className="cursor-pointer rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-colors duration-200 hover:bg-gray-50"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800">{notification.title}</div>
          <div className="mt-1 text-sm text-gray-600">{notification.content}</div>
          <div className="mt-2 text-xs text-gray-400">{formatDate(notification.createdAt)}</div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-2 p-1 text-gray-400 transition-colors hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default function NotificationsContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.push('/auth');
      return;
    }

    setNotifications(MOCK_NOTIFICATIONS);
    setIsLoading(false);
  }, [user, router, hydrated]);

  const handleDelete = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const handleClearAll = () => {
    if (confirm('전체 알림을 삭제하시겠습니까?')) {
      setNotifications([]);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">알림 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div className="container mx-auto mb-16 px-6 py-8">
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-zinc-900">알림</h1>
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-sm text-red-500 transition-colors hover:text-red-600"
                >
                  전체 삭제
                </button>
              )}
            </div>
          </header>

          <section className="flex flex-col gap-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDelete={() => handleDelete(notification.id)}
                />
              ))
            ) : (
              <div className="flex min-h-[calc(100vh-300px)] flex-col items-center justify-center">
                <Bell className="h-32 w-32 text-gray-300" />
                <p className="pb-8 pt-2 text-center text-sm text-zinc-500">
                  새로운 알림이 없습니다.
                </p>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
