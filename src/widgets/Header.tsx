'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/shared/components/ui/button';
import Logo from '@/assets/images/logo.png';
import coffeeBeansIcon from '@/assets/icons/coffee-beans.png';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLogin = () => {
    router.push('/auth');
  };

  return isAuthenticated ? (
    <header className="relative flex h-20 items-center justify-center border-b px-4">
      <div className="relative h-12 w-12">
        <Link href="/">
          <Image src={Logo} alt="logo" fill className="cursor-pointer object-contain" />
        </Link>
      </div>
      <div className="absolute right-4 flex items-center gap-2">
        <Link href="/my/payment">
          <div className="flex cursor-pointer items-center gap-1 rounded-full border border-amber-900 px-2 py-1 opacity-80 transition-opacity hover:opacity-90 active:opacity-100">
            <Image src={coffeeBeansIcon} alt="coffee-bean" className="h-7 w-7" />
            <span className="">100</span>
          </div>
        </Link>
        <Link href="/notifications">
          <Bell
            className="h-7 w-7 cursor-pointer text-rose-400 transition-all hover:text-rose-500 active:text-rose-600"
            fill="currentColor"
          />
        </Link>
      </div>
    </header>
  ) : (
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
