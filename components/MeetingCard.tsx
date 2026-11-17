
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const meetingTypeLabels: Record<string, string> = {
    testimony: 'Testimony Meeting',
    regular: 'Regular Meeting',
    stake: 'Stake Meeting',
    general: 'General Meeting',
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {meetingTypeLabels[meeting.meetingType]}
        </span>

        <span className="text-sm text-slate-500">
          #{meeting.id}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900">
        {formattedDate}
      </h2>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <p>
          <span className="font-semibold text-slate-800">
            Presiding:
          </span>{' '}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-semibold text-slate-800">
            Conducting:
          </span>{' '}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-semibold text-slate-800">
            Speakers:
          </span>{' '}
          {meeting.speakers.filter(
            (item) => item.type === 'speaker'
          ).length}
        </p>

        <p>
          <span className="font-semibold text-slate-800">
            Musical Numbers:
          </span>{' '}
          {meeting.speakers.filter(
            (item) => item.type === 'musical-number'
          ).length}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-7 inline-flex items-center font-semibold text-blue-600 hover:text-blue-800"
      >
        View Meeting Agenda
        <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </article>
  );
}
