import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Fit',
  description: '당신의 인연, 오늘도 어디선가 커피를 기다리고 있어요💓',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="select-none [&_img]:drag-none">
        {children}
      </body>
    </html>
  );
}
