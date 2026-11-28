
import { Suspense } from 'react';
import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import {
  getMeetings,
  getMeetingsTotalPages,
} from '@/lib/meetings-db';

export const metadata: Metadata = {
  title: 'Sacrament Meetings | Sacrament Meeting Planner',
  description:
    'Browse current and previous sacrament meeting programs, including meeting details, hymns, speakers, and announcements.',
};

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query?.trim() || '';
  const pageNumber = Number(params.page) || 1;
  const currentPage = Math.max(1, pageNumber);

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Meeting Management
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Sacrament Meetings
        </h1>

        <p className="mt-3 text-slate-600">
          Browse current and previous meeting programs.
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="h-10" />}>
          <MeetingSearch />
        </Suspense>
      </div>

      <div className="mb-8">
        <p className="text-sm text-slate-500">
          Showing {meetings.length} meetings
        </p>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No meetings found
          </h2>

          <p className="mt-2 text-slate-500">
            Try adjusting your search or check back later.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
