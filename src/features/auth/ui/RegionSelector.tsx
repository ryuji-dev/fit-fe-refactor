'use client';

import { useFormContext } from 'react-hook-form';
import { RegionSelectorProps } from '@/features/auth/auth.types';
import { BaseSelector } from './BaseSelector';

const REGION = [
  { value: '', label: '지역을 선택해주세요' },
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '인천', label: '인천' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' },
  { value: '세종', label: '세종' },
  { value: '경기', label: '경기도' },
  { value: '강원', label: '강원도' },
  { value: '충북', label: '충청북도' },
  { value: '충남', label: '충청남도' },
  { value: '전북', label: '전라북도' },
  { value: '전남', label: '전라남도' },
  { value: '경북', label: '경상북도' },
  { value: '경남', label: '경상남도' },
  { value: '제주', label: '제주도' },
];

export default function RegionSelector({ register, error, required }: RegionSelectorProps) {
  const { watch } = useFormContext();
  const selectedRegion = watch('region');

  return (
    <BaseSelector
      label="지역"
      register={register}
      required={required}
      error={error}
      className="w-full"
      showChevronDown={true}
    >
      <select
        id="region"
        defaultValue=""
        {...register('region', {
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
