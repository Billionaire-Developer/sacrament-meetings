
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  function createPageURL(pageNumber: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Meetings pagination"
      className="mt-10 flex items-center justify-between"
    >
      <Link
        href={createPageURL(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
        className={`rounded-md border px-4 py-2 text-sm font-medium ${
          currentPage <= 1
            ? 'pointer-events-none cursor-not-allowed border-slate-200 text-slate-400'
            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
        }`}
      >
        Previous
      </Link>

      <span className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        href={createPageURL(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : 0}
        className={`rounded-md border px-4 py-2 text-sm font-medium ${
          currentPage >= totalPages
            ? 'pointer-events-none cursor-not-allowed border-slate-200 text-slate-400'
            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
