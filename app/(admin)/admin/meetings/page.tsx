
import { Suspense } from 'react';
import Link from 'next/link';
import {
  getMeetings,
  getMeetingsTotalPages,
} from '@/lib/meetings-db';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import DeleteMeetingButton from '@/components/DeleteMeetingButton';

interface AdminMeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

async function AdminMeetingsContent({
  searchParams,
}: AdminMeetingsPageProps) {
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
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Administration
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Manage Meetings
          </h2>
          <p className="mt-2 text-slate-600">
            Create, edit, and delete sacrament meeting programs.
          </p>
        </div>

        <Link
          href="/meetings/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Create Meeting
        </Link>
      </div>

      <div className="mb-6">
        <Suspense fallback={<div className="h-10" />}>
          <MeetingSearch />
        </Suspense>
      </div>

      <p className="mb-5 text-sm text-slate-500">
        Showing {meetings.length} meetings
      </p>

      {meetings.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No meetings found
          </h3>
          <p className="mt-2 text-slate-600">
            Create a meeting or adjust your search.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4">Meeting ID</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Presiding</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {meetings.map((meeting) => (
                <tr key={meeting.id}>
                  <td className="px-5 py-4 font-medium">
                    #{meeting.id}
                  </td>
                  <td className="px-5 py-4">
                    {new Date(`${meeting.date}T00:00:00`).toLocaleDateString('en-NG')}
                  </td>
                  <td className="px-5 py-4">{meeting.presiding}</td>
                  <td className="px-5 py-4 capitalize">
                    {meeting.meetingType}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/meetings/${meeting.id}/edit`}
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>

                      <DeleteMeetingButton meetingId={meeting.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default function AdminMeetingsPage({
  searchParams,
}: AdminMeetingsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-slate-500">
          Loading meeting administration...
        </div>
      }
    >
      <AdminMeetingsContent searchParams={searchParams} />
    </Suspense>
  );
}
