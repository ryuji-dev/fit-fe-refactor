'use client';

import { RegionSelectorProps } from '@/features/auth/auth.types';
import RegionSelector from '@/shared/components/ui/region-selector';

export default function AuthRegionSelector({ register, error, required }: RegionSelectorProps) {
  return <RegionSelector register={register} error={error} required={required} />;
}
