import { ChevronDown } from 'lucide-react';
import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface BaseSelectorProps<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  showChevronDown?: boolean;
}

export const BaseSelector = <T extends FieldValues>({
  label,
  error,
  required,
  children,
  className = '',
  showChevronDown = true,
}: BaseSelectorProps<T>) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-900">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      <div className="group relative w-full">
        <div className={`relative w-full ${className}`}>{children}</div>
        {showChevronDown && (
          <ChevronDown className="absolute right-4 top-1/2 size-4 -translate-y-1/2 cursor-pointer text-zinc-400" />
        )}
      </div>
      {error && <p className="animate-fade-in mt-1 text-sm text-rose-500">{error}</p>}
    </div>
  );
};
