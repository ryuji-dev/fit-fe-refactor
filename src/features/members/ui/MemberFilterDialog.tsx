'use client';

import { useForm } from 'react-hook-form';
import { MemberFilters, MemberFilterDialogProps } from '@/features/members/members.types';
import Dialog from '@/shared/components/ui/dialog';
import { RangeSlider } from '@/shared/components/ui/range-slider';
import { Button } from '@/shared/components/ui/button';
import MemberFilterRegionSelector from './MemberFilterRegionSelector';

export default function MemberFilterDialog({ isOpen, onClose, onApply }: MemberFilterDialogProps) {
  const { register, handleSubmit, watch, setValue } = useForm<MemberFilters>({
    defaultValues: {
      region: '',
      ageRange: [20, 60],
      likesRange: [0, 100],
    },
  });

  const onSubmit = (data: MemberFilters) => {
    onApply(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} width={400}>
      <div className="mb-4 flex flex-col items-center">
        <div className="text-lg font-bold">회원 필터</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <MemberFilterRegionSelector
            register={register}
            required={false}
            selectedRegion={watch('region')}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">나이</label>
          <RangeSlider
            min={20}
            max={60}
            step={1}
            value={watch('ageRange')}
            onValueChange={(value) => setValue('ageRange', value as [number, number])}
          />
          <div className="flex justify-between text-sm text-zinc-500">
            <span>{watch('ageRange')[0]}세</span>
            <span>{watch('ageRange')[1]}세</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">좋아요 수</label>
          <RangeSlider
            min={0}
            max={100}
            step={10}
            value={watch('likesRange')}
            onValueChange={(value) => setValue('likesRange', value as [number, number])}
          />
          <div className="flex justify-between text-sm text-zinc-500">
            <span>{watch('likesRange')[0]}개</span>
            <span>{watch('likesRange')[1]}개</span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} variant="outline">
            취소
          </Button>
          <Button type="submit" variant="default">
            적용
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
