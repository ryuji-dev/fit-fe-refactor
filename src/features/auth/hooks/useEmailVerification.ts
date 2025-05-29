import { useState } from 'react';
import {
  useCheckEmailDuplication,
  useSendEmailVerificationCode,
  useVerifyEmailCode,
} from '@/features/auth/api/auth.mutations';

export const useEmailVerification = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: checkEmailDuplication } = useCheckEmailDuplication();
  const { mutate: sendEmailVerificationCode } = useSendEmailVerificationCode();
  const { mutate: verifyEmailCode } = useVerifyEmailCode();

  // 이메일 중복 확인, 이메일 인증 코드 전송
  const handleSendVerificationCode = async (email: string) => {
    setError(null);

    if (!email) {
      setError('이메일을 먼저 입력해주세요.');
      return;
    }

    setIsSendingCode(true);
    checkEmailDuplication(email, {
      onSuccess: () => {
        sendEmailVerificationCode(email, {
          onSuccess: () => {
            setShowVerificationCode(true);
            setError(null);
          },
          onError: (error) => {
            setError('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
            setShowVerificationCode(false);
          },
          onSettled: () => {
            setIsSendingCode(false);
          },
        });
      },
      onError: (error) => {
        setError('이미 사용 중인 이메일입니다.');
        setIsSendingCode(false);
        setShowVerificationCode(false);
        setIsEmailVerified(false);
      },
    });
  };

  // 이메일 인증 코드 확인
  const handleVerifyCode = async (verificationCode: string) => {
    if (!verificationCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    setIsVerifyingCode(true);
    verifyEmailCode(Number(verificationCode), {
      onSuccess: () => {
        setIsEmailVerified(true);
        setError(null);
      },
      onError: (error) => {
        setError('인증 코드가 일치하지 않습니다.');
        setIsEmailVerified(false);
      },
      onSettled: () => {
        setIsVerifyingCode(false);
      },
    });
  };

  return {
    isEmailVerified,
    isSendingCode,
    isVerifyingCode,
    showVerificationCode,
    error,
    handleSendVerificationCode,
    handleVerifyCode,
  };
};
