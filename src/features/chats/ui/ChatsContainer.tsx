'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircleWarning } from 'lucide-react';
import { ChatRoomProfile, ChatRoomPartner } from '@/features/chats/types/api.types';
import { useGetChatRooms, PAGE_SIZE } from '@/features/chats/api/chats.queries';
import { Button } from '@/shared/components/ui/button';
import Spinner from '@/shared/components/ui/spinner';
import Pagination from '@/shared/components/ui/pagination';
import useHydrated from '@/shared/hooks/useHydrated';
import { useAuthStore } from '@/store/authStore';
import ChatRoomCard from './ChatRoomCard';

export type ChatsProfile = ChatRoomPartner;

export default function ChatsContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAuthStore((state) => state.user);
  const { data, isLoading: isChatRoomsLoading, isError } = useGetChatRooms(currentPage);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.push('/auth');
      return;
    }
    setIsLoading(false);
  }, [hydrated, user, router]);

  if (!user || !hydrated) return null;

  if (isError) {
    return (
      <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <p className="text-sm text-red-500">채팅 목록을 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </main>
    );
  }

  const chatRooms: ChatRoomPartner[] =
    data?.rooms
      .filter(
        (room): room is ChatRoomProfile => !!room && typeof room.id === 'string' && !!room.partner,
      )
      .map((room) => ({
        id: room.id,
        name: room.partner.name,
        age: room.partner.age,
        region: room.partner.region,
        profileImage: room.partner.profileImage,
        isOnline: room.partner.isOnline,
        lastMessage: room.partner.lastMessage,
        lastMessageTime: room.partner.lastMessageTime,
        isUnread: room.partner.isUnread,
      })) ?? [];

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full flex-col bg-gradient-to-br from-violet-50 via-white to-rose-50">
      {isLoading || isChatRoomsLoading ? (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-zinc-500">채팅 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div className="container mx-auto mb-16 px-6 py-8">
          <header className="mb-12">
            <div className="relative flex items-center justify-center">
              <h1 className="text-2xl font-bold text-zinc-900">채팅 목록</h1>
            </div>
            <p className="mt-2 text-center text-sm text-zinc-500">
              지금, 당신을 향한 이야기가 시작돼요.
            </p>
          </header>

          <section className="flex flex-col gap-4">
            {chatRooms.length > 0 ? (
              <>
                {chatRooms.map((profile) => (
                  <ChatRoomCard key={profile.id} profile={profile} />
                ))}
                {data && (
                  <Pagination
                    currentPage={parseInt(data.currentPage)}
                    totalItems={data.totalCount}
                    itemsPerPage={PAGE_SIZE}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="flex min-h-[calc(100vh-400px)] flex-col items-center justify-center">
                <MessageCircleWarning className="h-32 w-32 text-yellow-300" />
                <p className="pb-8 pt-2 text-center text-sm text-zinc-500">
                  아직 채팅방이 없습니다.
                </p>
                <Button variant="default" size="default" onClick={() => router.push('/match')}>
                  새로운 인연을 만나보세요!
                </Button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
