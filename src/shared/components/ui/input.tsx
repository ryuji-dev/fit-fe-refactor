import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Check, CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  isDirty?: boolean;
  register?: UseFormRegisterReturn;
}

export default function Input({
  label,
  error,
  isDirty,
  register,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <div className="group relative">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/10 to-rose-500/10 blur-sm transition-all duration-300 group-hover:blur-md" />
        <input
          {...register}
          {...props}
          className={`relative w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-zinc-900 shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${
            error
              ? 'border-rose-500/50 focus:border-rose-500'
              : 'border-zinc-200/50 focus:border-violet-500 group-hover:border-violet-500/50'
          } ${isDirty && !error ? 'border-emerald-500/50 focus:border-emerald-500' : ''} ${className} `}
        />
        {isDirty && !error && (
          <div className="animate-fade-in absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="h-5 w-5 text-emerald-500" />
          </div>
        )}
        {error && (
          <div className="animate-shake absolute right-3 top-1/2 -translate-y-1/2">
            <CircleAlert className="h-5 w-5 text-rose-500" />
          </div>
        )}
      </div>
      {error && <p className="animate-fade-in mt-1 text-sm text-rose-500">{error.message}</p>}
    </div>
  );
}
