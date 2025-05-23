import { useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Check, CircleAlert, Eye, EyeOff } from 'lucide-react';

type InputVariant = 'violet' | 'rose';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  isDirty?: boolean;
  register?: UseFormRegisterReturn;
  showPasswordToggle?: boolean;
  variant?: InputVariant;
}

export default function Input({
  label,
  error,
  isDirty,
  register,
  showPasswordToggle = false,
  variant = 'violet',
  className = '',
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getVariantClasses = () => {
    const baseClasses =
      'relative w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-zinc-900 shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-2';

    if (variant === 'rose') {
      return `${baseClasses} ${
        error
          ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30'
          : 'border-zinc-200/50 focus:border-rose-500 group-hover:border-rose-500/50 focus:ring-rose-500/30'
      } ${isDirty && !error ? 'border-emerald-500/50 focus:border-emerald-500' : ''}`;
    }

    return `${baseClasses} ${
      error
        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-violet-500/30'
        : 'border-zinc-200/50 focus:border-violet-500 group-hover:border-violet-500/50 focus:ring-violet-500/30'
    } ${isDirty && !error ? 'border-emerald-500/50 focus:border-emerald-500' : ''}`;
  };

  const getGradientClasses = () => {
    return variant === 'rose'
      ? 'bg-gradient-to-r from-rose-500/10 to-pink-500/10'
      : 'bg-gradient-to-r from-violet-500/10 to-rose-500/10';
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <div className="group relative">
        <div
          className={`absolute inset-0 rounded-xl ${getGradientClasses()} blur-sm transition-all duration-300 group-hover:blur-md`}
        />
        <input
          {...register}
          {...props}
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          className={`${getVariantClasses()} ${className}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
        {isDirty && !error && !showPasswordToggle && (
          <div className="animate-fade-in absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="h-5 w-5 text-emerald-500" />
          </div>
        )}
        {error && !showPasswordToggle && (
          <div className="animate-shake absolute right-3 top-1/2 -translate-y-1/2">
            <CircleAlert className="h-5 w-5 text-rose-500" />
          </div>
        )}
      </div>
      {error && <p className="animate-fade-in mt-1 text-sm text-rose-500">{error.message}</p>}
    </div>
  );
}
