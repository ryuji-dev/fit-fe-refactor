import { ChatsProfile } from './ChatsContainer';

export default function ChatRoomCard({ profile }: { profile: ChatsProfile }) {
  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-xl bg-white p-4 shadow transition hover:bg-zinc-50">
      <img
        src={profile.imageUrl}
        alt={profile.name}
        className="h-14 w-14 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-900">{profile.name}</span>
          <span className="text-xs text-zinc-500">
            {profile.age}세 · {profile.location}
          </span>
        </div>
        <div className="truncate text-sm text-zinc-600">{profile.lastMessage}</div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-zinc-400">{profile.lastMessageTime}</span>
        {profile.isUnread && <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />}
      </div>
    </div>
  );
}
