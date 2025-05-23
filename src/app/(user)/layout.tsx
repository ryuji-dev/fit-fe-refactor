import Image from 'next/image';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import BackgroundImage from '@/public/assets/images/background.png';
import CoffeeImage from '@/public/assets/images/coffee.png';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full items-stretch justify-center gap-40">
      <div className="absolute inset-0 -z-10">
        <Image src={BackgroundImage} alt="background" fill className="object-cover" />
      </div>
      <section className="hidden min-h-screen w-[600px] flex-col items-center justify-center bg-transparent pr-20 xl:flex">
        <div className="relative h-[250px] w-[250px]">
          <Image src={CoffeeImage} alt="coffee" />
        </div>
        <div className="flex flex-col text-slate-600">
          <h1 className="text-3xl font-bold">Fit</h1>
          <h2 className="text-center text-2xl font-semibold">
            당신의 인연, 오늘도 어디선가 커피를 기다리고 있어요.
          </h2>
        </div>
      </section>
      <section className="flex w-full max-w-[500px] flex-col items-center">
        <div className="relative flex h-screen w-full flex-col rounded-lg bg-white shadow-2xl">
          <Header />
          <div className="scrollbar-hide w-full flex-1 overflow-auto">
            <div className="flex min-h-full items-center justify-center">
              <div className="h-full w-full max-w-3xl">{children}</div>
            </div>
          </div>
          <Footer />
        </div>
      </section>
    </main>
  );
}
