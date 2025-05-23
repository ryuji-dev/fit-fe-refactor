import { z } from 'zod';

const today = new Date();
const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

export const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
    verificationCode: z
      .string()
      .regex(/^\d{6}$/, '인증 코드는 6자리 숫자만 입력 가능합니다.')
      .optional(),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/[0-9]/, '비밀번호는 숫자를 포함해야 합니다.')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호는 특수문자를 포함해야 합니다.'),
    confirmPassword: z.string().min(1, '비밀번호가 일치하지 않습니다.'),
    name: z.string().min(2, '2자리 이상 이름을 사용하세요.').min(1, '이름은 필수 입력입니다.'),
    height: z
      .string()
      .regex(/^\d{3}$/, '키는 3자리 숫자만 입력해주세요.')
      .refine(
        (val) => {
          const num = Number(val);
          return num >= 100 && num <= 299;
        },
        { message: '키는 100 이상 299 이하로 입력해주세요.' },
      ),
    nickname: z
      .string()
      .min(2, '2자리 이상 닉네임을 사용하세요.')
      .min(1, '닉네임은 필수 입력입니다.'),
    job: z.string().min(2, '2자리 이상 사용하세요.').min(1, '직업은 필수 입력입니다.'),
    gender: z.string().min(1, '성별은 필수 입력입니다.'),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 형식을 입력해주세요.')
      .min(1, '생년월일은 필수 입력입니다.')
      .refine(
        (val) => {
          const [, mm, dd] = val.split('-');
          const month = Number(mm);
          const day = Number(dd);
          return month >= 1 && month <= 12 && day >= 1 && day <= 31;
        },
        { message: '월은 1~12, 일은 1~31 사이여야 합니다.' },
      )
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime()) && date >= minDate && date <= today;
        },
        { message: `100세 이하만 가입할 수 있습니다.` },
      ),
    region: z.string().min(1, '지역은 필수 입력입니다.'),
    phone: z
      .string()
      .refine((val) => /^01[0-9]{8,9}$/.test(val) || /^\d{3}-\d{3,4}-\d{4}$/.test(val), {
        message: '올바른 형식을 입력해주세요.',
      })
      .optional(),
    mbti: z.string().min(1, 'MBTI는 필수 입력입니다.'),
    interests: z.array(z.string()).min(3, '3개를 선택해주세요.').max(3, '3개를 선택해주세요.'),
    listening: z.array(z.string()).min(3, '3개를 선택해주세요.').max(3, '3개를 선택해주세요.'),
    selfintro: z.array(z.string()).min(3, '3개를 선택해주세요.').max(3, '3개를 선택해주세요.'),
    images: z
      .array(z.string())
      .min(2, '최소 2장의 이미지를 등록해야 합니다.')
      .max(6, '최대 6장까지 등록 가능합니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signupSchema>;
