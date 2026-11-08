
'use client';

import Link from 'next/link';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Africa/Lagos',
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-xl font-bold text-slate-900"
        >
          Sacrament Planner
        </Link>

        <p className="hidden text-sm text-gray-500 sm:block">
          {currentDate}
        </p>
      </div>
    </header>
  );
}
