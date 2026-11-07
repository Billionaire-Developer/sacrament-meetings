
import type { ReactNode } from 'react';

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-8">
      {children}
    </section>
  );
}
