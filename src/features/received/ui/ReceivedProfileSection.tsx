import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BasicProfileCard, ActionProfileCard } from '@/shared/components/ui/profile-card';
import { ReceivedProfileSectionProps } from '../received.types';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
};

export default function ReceivedProfileSection({
  title,
  profiles,
  showMore,
  onToggleShowMore,
  isActionCard = false,
  onAccept,
  onReject,
}: ReceivedProfileSectionProps) {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const defaultCount = isDesktop ? 3 : 2;
  const visibleProfiles = showMore ? profiles : profiles.slice(0, defaultCount);

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-semibold text-zinc-900">{title}</h2>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {visibleProfiles.map((profile) =>
          isActionCard ? (
            <ActionProfileCard
              key={profile.id}
              profile={profile}
              onAccept={() => onAccept?.(profile.id)}
              onReject={() => onReject?.(profile.id)}
            />
          ) : (
            <BasicProfileCard key={profile.id} profile={profile} />
          ),
        )}
      </div>
      {/* 모바일 더보기 버튼 */}
      <div className="block xl:hidden">
        {profiles.length > 2 && (
          <button
            onClick={onToggleShowMore}
            className="mt-4 flex w-full items-center justify-center gap-1 text-sm text-zinc-500 hover:text-zinc-600 active:text-zinc-700"
          >
            {showMore ? '접기' : '더보기'}{' '}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
      {/* 데스크탑 더보기 버튼 */}
      <div className="hidden xl:block">
        {profiles.length > 3 && (
          <button
            onClick={onToggleShowMore}
            className="mt-4 flex w-full items-center justify-center gap-1 text-sm text-zinc-500 hover:text-zinc-600 active:text-zinc-700"
          >
            {showMore ? '접기' : '더보기'}{' '}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    </section>
  );
}
