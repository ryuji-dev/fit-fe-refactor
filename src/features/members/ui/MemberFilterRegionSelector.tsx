'use client';

import { FilterRegionSelectorProps } from '@/features/members/members.types';
import RegionSelector from '@/shared/components/ui/region-selector';

export default function MemberFilterRegionSelector({
  register,
  error,
  required,
  selectedRegion,
}: FilterRegionSelectorProps) {
  return (
    <RegionSelector
      register={register}
      error={error}
      required={required}
      selectedRegion={selectedRegion}
    />
  );
}
