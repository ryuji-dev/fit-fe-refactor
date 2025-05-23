'use client';

import { ChevronDown } from 'lucide-react';
import { MbtiSelectorProps } from '@/features/auth/auth.types';
import { useFormContext } from 'react-hook-form';

const MBTI_OPTIONS = [
  { value: '', label: 'MBTI를 선택해주세요', description: '' },
  { value: 'ISTJ', label: 'ISTJ', description: '청렴결백한 논리주의자' },
  { value: 'ISFJ', label: 'ISFJ', description: '용감한 수호자' },
  { value: 'INFJ', label: 'INFJ', description: '선의의 옹호자' },
  { value: 'INTJ', label: 'INTJ', description: '용의주도한 전략가' },
  { value: 'ISTP', label: 'ISTP', description: '만능 재주꾼' },
  { value: 'ISFP', label: 'ISFP', description: '호기심 많은 예술가' },
  { value: 'INFP', label: 'INFP', description: '열정적인 중재자' },
  { value: 'INTP', label: 'INTP', description: '논리적인 사색가' },
  { value: 'ESTP', label: 'ESTP', description: '모험을 즐기는 사업가' },
  { value: 'ESFP', label: 'ESFP', description: '자유로운 영혼의 연예인' },
  { value: 'ENFP', label: 'ENFP', description: '재기발랄한 활동가' },
  { value: 'ENTP', label: 'ENTP', description: '논쟁을 즐기는 변론가' },
  { value: 'ESTJ', label: 'ESTJ', description: '엄격한 관리자' },
  { value: 'ESFJ', label: 'ESFJ', description: '사교적인 외교관' },
  { value: 'ENFJ', label: 'ENFJ', description: '정의로운 사회운동가' },
  { value: 'ENTJ', label: 'ENTJ', description: '대담한 통솔자' },
];

export default function MbtiSelector({ register, error, required }: MbtiSelectorProps) {
  const { watch } = useFormContext();
  const selectedMbti = watch('mbti');

  return (
    <div className="col-span-2 flex w-full flex-col gap-2">
      <label htmlFor="mbti" className="text-sm font-medium text-zinc-700">
        MBTI
      </label>
      <div className="group relative mx-auto w-[420px] max-w-full">
        <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-r from-violet-500/10 to-rose-500/10 blur-sm transition-all duration-300 group-hover:blur-md" />
        <div className="relative w-full">
          <select
            id="mbti"
            defaultValue=""
            {...register('mbti', {
              required: required ? 'MBTI를(을) 선택해주세요' : false,
            })}
            className={`mx-auto w-[420px] max-w-full cursor-pointer appearance-none rounded-xl border bg-white/80 px-4 py-3 pr-10 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${
              error
                ? 'border-rose-500/50 focus:border-rose-500'
                : 'border-zinc-200/50 focus:border-violet-500 group-hover:border-violet-500/50'
            } ${selectedMbti === '' ? 'text-gray-400' : 'text-zinc-900'}`}
          >
            {MBTI_OPTIONS.map(({ value, label, description }) => (
              <option key={value} value={value} disabled={!value} className="py-2 text-zinc-900">
                {value ? `${label} - ${description}` : label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 size-4 -translate-y-1/2 cursor-pointer text-zinc-400" />
        </div>
      </div>
      {error && <p className="animate-fade-in mt-1 text-sm text-rose-500">{error}</p>}
    </div>
  );
}
