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
}
