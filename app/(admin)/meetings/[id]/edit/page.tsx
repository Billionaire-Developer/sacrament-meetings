
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from './edit-form';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

async function EditMeetingContent({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        Meeting Administration
      </p>

      <h1 className="mt-3 text-3xl font-bold text-slate-900">
        Edit Sacrament Meeting
      </h1>

      <p className="mt-3 text-slate-600">
        Update the details of this sacrament meeting.
      </p>

      <div className="mt-8">
        <EditMeetingForm meeting={meeting} />
      </div>
    </main>
  );
}

export default function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-slate-500">
          Loading meeting details...
        </div>
      }
    >
      <EditMeetingContent params={params} />
    </Suspense>
  );
}
