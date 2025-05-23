import type { Merge } from 'react-hook-form';
import { UseFormRegister, FieldError, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { SignUpFormValues } from '@/entities/user/model/signup.schema';

export interface GenderSelectorProps {
  register: UseFormRegister<SignUpFormValues>;
  required?: boolean;
  selectedGender?: string;
  error?: string;
}

export interface RegionSelectorProps {
  register: UseFormRegister<SignUpFormValues>;
  required?: boolean;
  error?: string;
}

export interface MbtiSelectorProps {
  register: UseFormRegister<SignUpFormValues>;
  required?: boolean;
  error?: string;
}

export interface MultiToggleButtonGroupProps {
  label: string;
  name: 'interests' | 'listening' | 'selfintro';
  options: string[];
  required?: boolean;
  requiredCount?: number;
  register: UseFormRegister<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
  trigger: UseFormTrigger<SignUpFormValues>;
  error?: FieldError | FieldError[] | Merge<FieldError, (FieldError | undefined)[]> | undefined;
  gridCols?: string;
  isLoading?: boolean;
}

export interface SignupSubmitButtonProps {
  isValid: boolean;
  isImageValid: boolean;
  isPending: boolean;
}

export interface SignupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isCompleted?: boolean;
  loadingText?: string;
  completedText?: string;
  defaultText: string;
}
