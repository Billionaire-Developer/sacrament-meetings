
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Meetings', href: '/meetings' },
  { name: 'Current Meeting', href: '/meetings/current' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-8 px-6">
        {navigationLinks.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname === link.href ||
                pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b-2 py-4 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
