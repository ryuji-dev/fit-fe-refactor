import clsx from 'clsx';
import Spinner from '@/shared/components/ui/spinner';
import { SignupButtonProps, SignupSubmitButtonProps } from '@/features/auth/auth.types';

export function SignupButton({
  variant = 'primary',
  size = 'md',
  isLoading,
  isCompleted,
  completedText,
  defaultText,
  className,
  disabled,
  children,
  ...rest
}: SignupButtonProps) {
  const baseStyles = clsx(
    'rounded-md bg-gradient-to-r from-violet-500 to-rose-500 text-sm text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50',
    {
      'h-[46px] px-4': size === 'sm',
      'h-12 px-6': size === 'md',
      'h-14 px-8': size === 'lg',
    },
  );

  return (
    <button
      disabled={disabled || isLoading || isCompleted}
      className={clsx(baseStyles, className)}
      {...rest}
    >
      {isLoading ? (
        <div className="flex w-16 items-center justify-center gap-2">
          <Spinner size="sm" color="white" />
        </div>
      ) : isCompleted ? (
        completedText
      ) : (
        defaultText || children
      )}
    </button>
  );
}

export function SignupSubmitButton({
  isValid,
  isImageValid,
  isPending,
  ...rest
}: SignupSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={!isValid || !isImageValid || isPending}
      className={clsx(
        'mt-8 h-12 w-full rounded-full p-4 text-lg font-medium text-gray-50',
        'bg-gradient-to-r from-violet-500 to-rose-500',
        'hover:from-violet-600 hover:to-rose-600',
        'transition-all duration-300',
        'shadow-lg hover:shadow-xl',
        'relative',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )}
      {...rest}
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner size="sm" color="white" />
          <span>처리 중...</span>
        </div>
      ) : (
        '회원가입'
      )}
    </button>
  );
}
