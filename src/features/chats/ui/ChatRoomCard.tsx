import Image from 'next/image';
import { ChatsProfile } from './ChatsContainer';

export default function ChatRoomCard({ profile }: { profile: ChatsProfile }) {
  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-xl bg-white p-4 shadow transition hover:bg-zinc-50">
      <Image
        src={profile.profileImage}
        alt={profile.name}
        width={56}
        height={56}
        className="rounded-full object-cover"
        priority={false}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-900">{profile.name}</span>
          <span className="text-xs text-zinc-500">
            {profile.age ? `${profile.age}세 · ` : ''}
            {profile.region}
          </span>
        </div>
        <div
          className={`truncate text-sm ${profile.lastMessage ? 'text-zinc-600' : 'text-gray-400'}`}
        >
          {profile.lastMessage ?? '새로운 대화를 시작해보세요.'}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        {profile.lastMessageTime && (
          <span className="text-xs text-zinc-400">{profile.lastMessageTime}</span>
        )}
        {profile.isUnread && <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />}
      </div>
    </div>
  );
}
