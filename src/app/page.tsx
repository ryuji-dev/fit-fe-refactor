import Link from 'next/link';
import Image from 'next/image';
import landingImage from '@/public/assets/images/landing.png';
import { Button } from '@/shared/components/ui/button';

const LANDING_TEXT = {
  title: 'FIT',
  subtitle: '우리, 연결될 준비 됐나요?',
  login: 'Log in',
  signup: 'Sign up',
  getStarted: 'Get Started',
};

const LadingHeader = () => (
  <div className="absolute right-6 top-6 flex gap-4">
    <Link href="/login">{LANDING_TEXT.login}</Link>
    <Link href="/signup">{LANDING_TEXT.signup}</Link>
  </div>
);

const LandingImage = () => (
  <div className="mb-10 mt-20 w-full max-w-md">
    <Image
      src={landingImage}
      alt="남녀 소개팅 일러스트"
      width={500}
      height={500}
      className="w-full object-contain"
    />
  </div>
);

const LandingButton = () => (
  <Link href="/match">
    <Button variant="landing" size="xl" className="text-lg">
      {LANDING_TEXT.getStarted}
    </Button>
  </Link>
);

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-violet-200 to-rose-200 px-4 text-white">
      <LadingHeader />
      <LandingImage />
      <div className="text-3xl font-bold">{LANDING_TEXT.title}</div>
      <div className="mb-6 text-3xl">{LANDING_TEXT.subtitle}</div>
      <LandingButton />
    </main>
  );
}
