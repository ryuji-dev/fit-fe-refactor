import { UseFormRegister } from 'react-hook-form';

export interface MemberFilters {
  region: string;
  ageRange: [number, number];
  likesRange: [number, number];
}

export interface FilterRegionSelectorProps {
  register: UseFormRegister<MemberFilters>;
  required?: boolean;
  error?: string;
  selectedRegion: string;
}

export interface MemberFilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: MemberFilters) => void;
  initialFilters?: MemberFilters;
}

export const DEFAULT_MEMBER_FILTERS: MemberFilters = {
  region: '',
  ageRange: [20, 60],
  likesRange: [0, 100],
};
