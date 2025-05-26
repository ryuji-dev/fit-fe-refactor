import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

export default function Dialog({
  open,
  onClose,
  children,
  width = 400,
  height = 'auto',
}: DialogProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="모달 닫기 배경"
      />
      <div
        className="relative flex flex-col rounded-xl bg-white p-8 shadow-xl"
        style={{ width, height, zIndex: 31 }}
      >
        <button
          className="absolute right-4 top-4 text-zinc-400 transition-all duration-300 hover:text-zinc-500 active:text-zinc-600"
          onClick={onClose}
          aria-label="닫기"
          type="button"
        >
          <X className="size-4" />
        </button>
        {children}
      </div>
    </div>
  );
}
