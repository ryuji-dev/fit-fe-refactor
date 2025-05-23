'use client';

import { useState, useEffect } from 'react';
import { MultiToggleButtonGroupProps } from '../auth.types';
import { cn } from '@/shared/lib/utils/cn';
import Spinner from '@/shared/components/ui/spinner';
import { FieldError } from 'react-hook-form';

export default function MultiToggleButtonGroup({
  label,
  name,
  options,
  required = false,
  requiredCount = 3,
  register,
  setValue,
  trigger,
  error,
  gridCols = 'grid-cols-3',
  isLoading = false,
}: MultiToggleButtonGroupProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (item: string) => {
    let updated: string[];

    if (selected.includes(item)) {
      updated = selected.filter((i) => i !== item);
    } else {
      if (selected.length >= requiredCount) return;
      updated = [...selected, item];
    }

    setSelected(updated);
    setValue(name, updated);
    trigger(name);
  };

  useEffect(() => {
    setValue(name, selected);
  }, [selected, name, setValue]);

  return (
    <div className="my-2 flex flex-col gap-2">
      <label className="mb-1 text-sm font-semibold text-zinc-800">
        {label} <span className="text-xs font-normal text-zinc-500">({requiredCount}개 선택)</span>
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>

      {isLoading ? (
        <div className="flex min-h-[100px] items-center justify-center">
          <Spinner size="md" color="primary" />
        </div>
      ) : (
        <div className={`grid ${gridCols} gap-2`}>
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={cn(
                'rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300/40',
                'hover:scale-105 active:scale-95',
                selected.includes(item)
                  ? 'border-transparent bg-gradient-to-r from-violet-400 to-pink-300 text-white shadow-lg'
                  : 'border-violet-200 bg-white/60 text-violet-500 hover:bg-violet-50',
              )}
              aria-pressed={selected.includes(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <input
        type="hidden"
        {...register(name, {
          required: required ? `${label}을(를) 선택해주세요.` : false,
          validate: (value: string[]) =>
            (Array.isArray(value) && value.length === requiredCount) ||
            `${requiredCount}개를 선택해주세요.`,
        })}
      />

      {error && (
        <small className="animate-fade-in mt-1 block font-medium text-rose-500">
          {Array.isArray(error)
            ? error
                .map((e) => e?.message)
                .filter(Boolean)
                .join(', ')
            : (error as FieldError).message}
        </small>
      )}
    </div>
  );
}
