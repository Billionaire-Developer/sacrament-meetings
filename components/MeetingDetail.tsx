
import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const meetingTypeLabels = {
    testimony: 'Testimony Meeting',
    regular: 'Regular Meeting',
    stake: 'Stake Meeting',
    general: 'General Meeting',
  };

  return (
    <article className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-sm sm:p-10">
      <header className="border-b border-slate-200 pb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
          Sacrament Meeting
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {meetingTypeLabels[meeting.meetingType]}
        </h1>

        <p className="mt-2 text-slate-600">{formattedDate}</p>

        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
          <p>
            <span className="font-semibold">Presiding:</span>{' '}
            {meeting.presiding}
          </p>
          <p>
            <span className="font-semibold">Conducting:</span>{' '}
            {meeting.conducting}
          </p>
        </div>
      </header>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="border-b border-slate-200 py-6">
          <h2 className="mb-3 text-lg font-bold text-slate-900">
            Announcements
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-b border-slate-200 py-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Opening
        </h2>

        <div className="space-y-3 text-slate-700">
          <p>
            <span className="font-semibold">Opening Hymn:</span>{' '}
            {meeting.openingHymn.number} – {meeting.openingHymn.title}
          </p>
          <p>
            <span className="font-semibold">Opening Prayer:</span>{' '}
            {meeting.openingPrayer}
          </p>
        </div>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="border-b border-slate-200 py-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Ward Business
          </h2>

          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <section className="border-b border-slate-200 py-6">
          <h2 className="text-lg font-bold text-slate-900">
            Stake Business
          </h2>
          <p className="mt-2 text-slate-700">
            Stake business is scheduled for this meeting.
          </p>
        </section>
      )}

      <section className="border-b border-slate-200 py-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Sacrament
        </h2>

        <p className="text-slate-700">
          <span className="font-semibold">Sacrament Hymn:</span>{' '}
          {meeting.sacramentHymn.number} – {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="border-b border-slate-200 py-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Speakers and Musical Numbers
        </h2>

        {meeting.speakers.length > 0 ? (
          <ul className="space-y-4">
            {meeting.speakers.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className="rounded-lg bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {item.type === 'speaker'
                    ? 'Speaker'
                    : 'Musical Number'}
                </p>
                <p className="mt-1 text-slate-700">{item.topic}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-600">
            No speakers or musical numbers have been scheduled.
          </p>
        )}
      </section>

      <section className="border-b border-slate-200 py-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Closing
        </h2>

        <div className="space-y-3 text-slate-700">
          <p>
            <span className="font-semibold">Closing Hymn:</span>{' '}
            {meeting.closingHymn.number} – {meeting.closingHymn.title}
          </p>
          <p>
            <span className="font-semibold">Closing Prayer:</span>{' '}
            {meeting.closingPrayer}
          </p>
        </div>
      </section>

      <footer className="pt-6 text-center text-sm text-slate-500">
        End of Sacrament Meeting Programme
      </footer>
    </article>
  );
}
