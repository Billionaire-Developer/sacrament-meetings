
import { Suspense } from 'react';

interface EditMeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

function EditMeetingFallback() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-slate-600">Loading edit page...</p>
    </div>
  );
}

async function EditMeetingContent({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        Meeting Administration
      </p>

      <h1 className="mt-3 text-3xl font-bold text-slate-900">
        Edit Meeting
      </h1>

      <p className="mt-3 text-slate-600">
        Editing functionality for meeting {id} will be implemented in Week 04.
      </p>
    </div>
  );
}

export default function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  return (
    <Suspense fallback={<EditMeetingFallback />}>
      <EditMeetingContent params={params} />
    </Suspense>
  );
}
