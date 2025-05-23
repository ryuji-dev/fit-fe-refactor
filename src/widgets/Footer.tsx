'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, UsersRound, HandHeart, MessageCircle, UserRoundCog } from 'lucide-react';

const footerMenu = [
  { href: '/match', icon: Trophy, label: '오늘의 매칭', requiresAuth: false },
  { href: '/members', icon: UsersRound, label: '회원 목록', requiresAuth: false },
  { href: '/received', icon: HandHeart, label: '받은 호감', requiresAuth: true },
  { href: '/chats', icon: MessageCircle, label: '채팅 목록', requiresAuth: true },
  { href: '/my', icon: UserRoundCog, label: '마이페이지', requiresAuth: true },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="absolute bottom-0 z-10 flex h-20 w-full items-center border-t bg-gray-50">
      <nav className="flex w-full">
        <ul className="flex w-full justify-around">
          {footerMenu.map((item) => {
            const isCurrent = pathname === item.href;
            const linkColorClass = isCurrent
              ? 'text-violet-500 text-base'
              : 'text-gray-400 text-sm';
            return (
              <li key={item.href}>
                <Link href={item.href} className={`flex flex-col items-center ${linkColorClass}`}>
                  <item.icon fill={isCurrent ? 'currentColor' : 'none'} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
