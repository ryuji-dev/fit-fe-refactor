import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호는 특수문자를 포함해야 합니다.'),
});
