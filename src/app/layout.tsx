import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Fit',
  description: '당신의 인연, 오늘도 어디선가 커피를 기다리고 있어요💓',
  openGraph: {
    title: 'Fit',
    description: '당신의 인연, 오늘도 어디선가 커피를 기다리고 있어요💓',
    url: 'https://fit-fe-refactor.vercel.app',
    siteName: 'Fit',
    images: [
      {
        url: 'https://fit-fe-refactor.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fit 데이팅 서비스',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fit',
    description: '당신의 인연, 오늘도 어디선가 커피를 기다리고 있어요💓',
    images: ['https://fit-fe-refactor.vercel.app/assets/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="select-none [&_img]:drag-none">
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
