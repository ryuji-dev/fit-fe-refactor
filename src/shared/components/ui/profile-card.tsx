import { Heart } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  likes: number;
  imageUrl: string;
  isOnline: boolean;
}

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-xl border-2 bg-white shadow-lg transition-all hover:border-rose-300 hover:shadow-xl active:border-rose-400">
      <div className="relative aspect-[3/5] w-full overflow-hidden">
        <img
          src={profile.imageUrl}
          alt={profile.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* 온라인 상태 표시 */}
        <div className="absolute right-3 top-3">
          <div
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              profile.isOnline ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
            }`}
          >
            {profile.isOnline ? '접속 중' : '접속 종료'}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 text-white">
        <div className="flex flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-between">
            <h3 className="text-lg font-bold">{profile.name}</h3>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 fill-current text-rose-500" />
              <span className="text-sm">{profile.likes}</span>
            </div>
            <p className="text-sm opacity-90">
              {profile.age}세 · {profile.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
