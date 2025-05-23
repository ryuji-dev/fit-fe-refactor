import type { Merge } from 'react-hook-form';
import { UseFormRegister, FieldError, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { SignupFormValues } from '@/entities/auth/signup.types';

export interface GenderSelectorProps {
  register: UseFormRegister<SignupFormValues>;
  required?: boolean;
  selectedGender?: string;
  error?: string;
}

export interface RegionSelectorProps {
  register: UseFormRegister<SignupFormValues>;
  required?: boolean;
  error?: string;
}

export interface MbtiSelectorProps {
  register: UseFormRegister<SignupFormValues>;
  required?: boolean;
  error?: string;
}

export interface MultiToggleButtonGroupProps {
  label: string;
  name: 'interests' | 'listening' | 'selfintro';
  options: string[];
  required?: boolean;
  requiredCount?: number;
  register: UseFormRegister<SignupFormValues>;
  setValue: UseFormSetValue<SignupFormValues>;
  trigger: UseFormTrigger<SignupFormValues>;
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

export type SocialProvider = 'naver' | 'kakao' | 'google';

export interface SocialConfig {
  icon: any;
  bgColor: string;
  textColor: string;
  iconSize: string;
  iconPosition: string;
  label: string;
  border?: string;
}

export interface SocialLoginButtonProps {
  provider: SocialProvider;
  onClick?: () => void;
}
