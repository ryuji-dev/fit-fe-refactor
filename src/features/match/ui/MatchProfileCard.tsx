import { Button } from '@/shared/components/ui/button';
import { MatchProfileCardProps } from '../match.types';

export const MatchProfileCard = ({ user, onSelect }: MatchProfileCardProps) => {
  return (
    <div className="flex w-48 flex-col items-center overflow-hidden rounded-xl border border-gray-100 bg-white/80 shadow backdrop-blur-sm">
      <div className="relative h-56 w-full cursor-pointer overflow-hidden bg-gray-200">
        <img
          src={user.imageUrl}
          alt={user.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
          {user.mbti}
        </span>
      </div>
      <div className="flex w-full flex-col items-center gap-1 p-3">
        <div className="text-base font-bold text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-500">
          {user.age}세 · {user.location} · {user.height}cm
        </div>
        <Button variant="defaultOutline" size="sm" className="mt-2 w-full" onClick={onSelect}>
          선택하기
        </Button>
      </div>
    </div>
  );
};
