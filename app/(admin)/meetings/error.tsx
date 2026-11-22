
'use client';

import Link from 'next/link';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({
  error,
  reset,
}: MeetingsErrorProps) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
        Something went wrong
      </p>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Unable to Load Meetings
      </h1>

      <p className="mt-4 text-slate-600" aria-live="polite">
        We encountered an unexpected error while loading the meetings.
        Please try again.
      </p>

      {error.digest && (
        <p className="mt-2 text-sm text-slate-500">
          Error reference: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-md border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}
