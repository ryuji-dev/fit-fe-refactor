'use client';

import { UseFormRegister, Path } from 'react-hook-form';
import { REGION } from '@/shared/constants/regions';
import { BaseSelector } from './base-selector';

interface RegionSelectorProps<T extends { region: string }> {
  register: UseFormRegister<T>;
  error?: string;
  required?: boolean;
  selectedRegion?: string;
  className?: string;
}

export default function RegionSelector<T extends { region: string }>({
  register,
  error,
  required,
  selectedRegion = '',
  className = 'w-full',
}: RegionSelectorProps<T>) {
  return (
    <BaseSelector
      label="지역"
      register={register}
      required={required}
      error={error}
      className={className}
      showChevronDown={true}
    >
      <select
        id="region"
        defaultValue=""
        {...register('region' as Path<T>, {
          required: required ? '지역을 선택해주세요' : false,
        })}
        className={`w-full cursor-pointer appearance-none rounded-xl border bg-white/80 px-4 py-3 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${
          error
            ? 'border-rose-500/50 focus:border-rose-500'
            : 'border-zinc-200/50 focus:border-violet-500 group-hover:border-violet-500/50'
        } ${selectedRegion === '' ? 'text-gray-400' : 'text-zinc-900'} `}
      >
        {REGION.map(({ value, label }) => (
          <option key={value} value={value} disabled={!value}>
            {label}
          </option>
        ))}
      </select>
    </BaseSelector>
  );
}
