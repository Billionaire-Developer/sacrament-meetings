import Link from 'next/link';

export default function Header() {
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
          Plan and organize your Sunday meetings
        </p>
      </div>
    </header>
  );
}