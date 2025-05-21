import Link from 'next/link';
import Image from 'next/image';
import landingImage from '@/public/assets/images/landing.png';

const LANDING_TEXT = {
  title: 'FIT',
  subtitle: '우리, 연결될 준비 됐나요?',
  login: 'Log in',
  signup: 'Sign up',
  getStarted: 'Get Started',
};

const Header = () => (
  <div className="absolute top-6 right-6 flex gap-4 text-sm">
    <Link href="/login">{LANDING_TEXT.login}</Link>
    <Link href="/signup">{LANDING_TEXT.signup}</Link>
  </div>
);

const LandingImage = () => (
  <div className="max-w-md w-full mt-20 mb-10">
    <Image
      src={landingImage}
      alt="남녀 소개팅 일러스트"
      width={500}
      height={500}
      className="w-full object-contain"
    />
  </div>
);

const GetStartedButton = () => (
  <Link href="/home">
    <div className="bg-white text-violet-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100 transition text-center">
      {LANDING_TEXT.getStarted}
    </div>
  </Link>
);

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-violet-200 to-rose-200 text-white px-4">
      <Header />
      <LandingImage />
      <div className="text-3xl font-bold">{LANDING_TEXT.title}</div>
      <div className="text-3xl mb-6">{LANDING_TEXT.subtitle}</div>
      <GetStartedButton />
    </main>
  );
}
