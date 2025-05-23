import { GenderSelectorProps } from '@/features/auth/auth.types';
import { BaseSelector } from '@/features/auth/ui/BaseSelector';
import { Mars, Venus } from 'lucide-react';

export default function GenderSelector({
  register,
  required,
  selectedGender,
  error,
}: GenderSelectorProps) {
  return (
    <BaseSelector
      label="성별"
      register={register}
      required={required}
      error={error}
      className="grid h-[46px] grid-cols-2 gap-3 rounded-xl"
      showChevronDown={false}
    >
      {[
        {
          value: '남자',
          label: '남성',
          icon: <Mars />,
        },
        {
          value: '여자',
          label: '여성',
          icon: <Venus />,
        },
      ].map(({ value, label, icon }) => (
        <label
          key={value}
          className={`relative flex h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-0 font-medium transition-all duration-200 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-300/40 active:scale-95 ${
            selectedGender === value
              ? 'border-transparent bg-gradient-to-r from-violet-400 to-pink-300 text-white'
              : 'border-violet-200 bg-white/60 text-violet-500'
          } `}
        >
          <input type="radio" value={value} {...register('gender')} className="hidden" />
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium">{label}</span>
          </div>
          {selectedGender === value && (
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-violet-500/20" />
          )}
        </label>
      ))}
    </BaseSelector>
  );
}
