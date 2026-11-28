
import Link from 'next/link';
import { connection } from 'next/server';
import { auth, signOut } from '@/auth';

export default async function Header() {
  // Authentication must be evaluated at request time.
  await connection();

  const session = await auth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-bold text-gray-900">
          Sacrament Planner
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link
                href="/admin/meetings"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Admin Dashboard
              </Link>

              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/login' });
                }}
              >
                <button
                  type="submit"
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Bishopric Sign In
            </Link>
          )}
        </div>
      </div>

      <p className="mx-auto max-w-7xl px-6 pb-4 text-sm text-gray-500">
        Plan and organize your Sunday meetings
      </p>
    </header>
  );
}
