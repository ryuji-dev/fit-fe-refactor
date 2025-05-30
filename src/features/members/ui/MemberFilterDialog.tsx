'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  MemberFilters,
  MemberFilterDialogProps,
  DEFAULT_MEMBER_FILTERS,
} from '@/features/members/types/ui.types';
import Dialog from '@/shared/components/ui/dialog';
import { RangeSlider } from '@/shared/components/ui/range-slider';
import { Button } from '@/shared/components/ui/button';
import MemberFilterRegionSelector from './MemberFilterRegionSelector';

export default function MemberFilterDialog({
  isOpen,
  onClose,
  onApply,
  initialFilters,
}: MemberFilterDialogProps) {
  const methods = useForm<MemberFilters>({
    defaultValues: initialFilters ?? DEFAULT_MEMBER_FILTERS,
  });

  useEffect(() => {
    if (isOpen && initialFilters) {
      methods.reset(initialFilters);
    }
  }, [isOpen, initialFilters, methods]);

  const onSubmit = (data: MemberFilters) => {
    onApply(data);
    onClose();
  };

  const handleReset = () => {
    methods.reset(DEFAULT_MEMBER_FILTERS);
    onApply(DEFAULT_MEMBER_FILTERS);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} width={400}>
      <div className="mb-4 flex flex-col items-center">
        <div className="text-lg font-bold">회원 필터</div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <MemberFilterRegionSelector
              register={methods.register}
              required={false}
              selectedRegion={methods.watch('region')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">나이</label>
            <RangeSlider
              min={20}
              max={60}
              step={1}
              value={methods.watch('ageRange')}
              onValueChange={(value) => methods.setValue('ageRange', value as [number, number])}
            />
            <div className="flex justify-between text-sm text-zinc-500">
              <span>{methods.watch('ageRange')[0]}세</span>
              <span>{methods.watch('ageRange')[1]}세</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">좋아요 수</label>
            <RangeSlider
              min={0}
              max={100}
              step={1}
              value={methods.watch('likesRange')}
              onValueChange={(value) => methods.setValue('likesRange', value as [number, number])}
            />
            <div className="flex justify-between text-sm text-zinc-500">
              <span>{methods.watch('likesRange')[0]}개</span>
              <span>{methods.watch('likesRange')[1]}개</span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={handleReset} variant="outline">
              초기화
            </Button>
            <Button type="submit" variant="default">
              적용
            </Button>
          </div>
        </form>
      </FormProvider>
    </Dialog>
  );
}
