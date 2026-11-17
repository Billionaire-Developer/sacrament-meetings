import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLinks from '@/components/NavLinks';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description: 'Plan, manage, and review sacrament meeting programs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />

        <Suspense
          fallback={
            <nav
              className="border-b border-gray-200 bg-white px-6 py-4"
              aria-label="Main navigation"
            >
              <span className="text-sm text-slate-500">
                Loading navigation...
              </span>
            </nav>
          }
        >
          <NavLinks />
        </Suspense>

        <main className="min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
