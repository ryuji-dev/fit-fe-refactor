'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import Logo from '@/public/assets/images/logo.png';

export default function Header() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth');
  };

  return (
    <header className="relative flex h-20 items-center justify-center border-b px-4">
      <div className="relative h-12 w-12">
        <Link href={'/'}>
          <Image src={Logo} alt="logo" fill className="cursor-pointer object-contain" />
        </Link>
      </div>
      <div className="absolute right-4">
        <Button variant="default" size="lg" className="text-sm" onClick={handleLogin}>
          로그인
        </Button>
      </div>
    </header>
  );
}
