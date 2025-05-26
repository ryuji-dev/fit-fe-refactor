import { ChevronDown } from 'lucide-react';
import { BasicProfileCard, ActionProfileCard } from '@/shared/components/ui/profile-card';
import { ReceivedProfileSectionProps } from '../received.types';

export default function ReceivedProfileSection({
  title,
  profiles,
  showMore,
  onToggleShowMore,
  isActionCard = false,
  onAccept,
  onReject,
}: ReceivedProfileSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-semibold text-zinc-900">{title}</h2>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {profiles
          .slice(0, showMore ? 5 : 2)
          .map((profile) =>
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
        <div className="hidden xl:block">
          {profiles
            .slice(2, showMore ? 5 : 3)
            .map((profile) =>
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
      </div>
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
