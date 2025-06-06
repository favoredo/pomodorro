import PomodoroTimer from '@/app/ui/pomodoro-timer'
import { YandexMetrika } from '@/app/ui/YandexMetrika';
import Head from 'next/head';
import { Suspense } from 'react';


export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <Suspense>
          <YandexMetrika />
        </Suspense>
      </Head>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start justify-center w-[min(50vw,50vh)] h-[min(50vw,50vh)]">
        <PomodoroTimer />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
