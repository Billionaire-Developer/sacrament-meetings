
import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        Meeting Administration
      </p>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Meeting Not Found
      </h1>

      <p className="mt-4 text-slate-600">
        Sorry, the meeting you are trying to edit does not exist
        or may have been removed.
      </p>

      <Link
        href="/meetings"
        className="mt-8 inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Return to Meetings
      </Link>
    </main>
  );
}
