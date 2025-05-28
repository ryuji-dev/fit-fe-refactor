import { useCallback } from 'react';
import { FieldErrors, UseFormWatch } from 'react-hook-form';
import { SignupFormValues } from '@/entities/auth/signup.types';

interface UseSignupFormValidationProps {
  errors: FieldErrors<SignupFormValues>;
  dirtyFields: {
    [K in keyof SignupFormValues]?: boolean | boolean[];
  };
  watch: UseFormWatch<SignupFormValues>;
  images: (File | null)[];
  isEmailVerified: boolean;
}

export const useSignupFormValidation = ({
  errors,
  dirtyFields,
  watch,
  images,
  isEmailVerified,
}: UseSignupFormValidationProps) => {
  const isFormValid = useCallback(() => {
    const requiredFields = [
      'email',
      'password',
      'confirmPassword',
      'name',
      'nickname',
      'gender',
      'region',
      'mbti',
    ];

    const isAllFieldsValid = requiredFields.every((field) => {
      const fieldError = errors[field as keyof typeof errors];
      const isDirty = dirtyFields[field as keyof typeof dirtyFields];
      return !fieldError && isDirty;
    });

    const isInterestsValid = !errors.interests && watch('interests')?.length === 3;
    const isListeningValid = !errors.listening && watch('listening')?.length === 3;
    const isSelfintroValid = !errors.selfintro && watch('selfintro')?.length === 3;

    const uploadedImageCount = images.filter(Boolean).length;
    const isImageValid = uploadedImageCount >= 2;

    return (
      isAllFieldsValid &&
      isInterestsValid &&
      isListeningValid &&
      isSelfintroValid &&
      isImageValid &&
      isEmailVerified
    );
  }, [errors, dirtyFields, images, isEmailVerified, watch]);

  return { isFormValid };
};
