import Spinner from '@/shared/components/ui/spinner';

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-rose-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" color="primary" />
      </div>
    </div>
  );
}
