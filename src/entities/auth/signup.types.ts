import { z } from 'zod';
import { signupSchema } from './signup.schema';

export type SignupFormValues = z.infer<typeof signupSchema>;

export interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void;
  isLoading?: boolean;
}

export interface SignupFormError {
  field: keyof SignupFormValues;
  message: string;
}
