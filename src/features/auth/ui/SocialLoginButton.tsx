import Image from 'next/image';
import naverIcon from '@/public/assets/icons/naver.png';
import kakaoIcon from '@/public/assets/icons/kakao.png';
import googleIcon from '@/public/assets/icons/google.png';
import { SocialProvider, SocialConfig, SocialLoginButtonProps } from '@/features/auth/auth.types';

const socialConfig: Record<SocialProvider, SocialConfig> = {
  naver: {
    icon: naverIcon,
    bgColor: 'bg-[#03C75A]',
    textColor: 'text-white',
    iconSize: 'h-10 w-10',
    iconPosition: 'left-5',
    label: '네이버 로그인',
  },
  kakao: {
    icon: kakaoIcon,
    bgColor: 'bg-[#FFEC3C]',
    textColor: 'text-[#191600]',
    iconSize: 'h-8 w-8',
    iconPosition: 'left-6',
    label: '카카오 로그인',
  },
  google: {
    icon: googleIcon,
    bgColor: 'bg-white',
    textColor: 'text-gray-700',
    iconSize: 'h-5 w-5',
    iconPosition: 'left-7',
    label: 'Google 로그인',
    border: 'border border-gray-300',
  },
};

export default function SocialLoginButton({ provider, onClick }: SocialLoginButtonProps) {
  const config = socialConfig[provider];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-14 w-full items-center rounded-lg ${config.bgColor} ${config.textColor} ${config.border || ''} font-semibold transition-colors`}
      aria-label={provider}
    >
      <span className={`absolute ${config.iconPosition} flex items-center`}>
        <Image src={config.icon} alt={provider} className={config.iconSize} />
      </span>
      <span className="flex-1 text-center">{config.label}</span>
    </button>
  );
}
