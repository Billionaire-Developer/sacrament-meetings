
'use client';

import { useEffect, useState } from 'react';
import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const response = await fetch('/api/meetings');

        if (!response.ok) {
          throw new Error('Failed to retrieve meetings.');
        }

        const data: SacramentMeeting[] = await response.json();

        setMeetings(
          data.sort((a, b) => b.date.localeCompare(a.date))
        );
      } catch {
        setError('Unable to load meetings. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-600">Loading meetings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p role="alert" className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

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

      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {meetings.length} meetings available
        </p>
      </div>

      {meetings.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No meetings found
          </h2>

          <p className="mt-2 text-slate-500">
            There are currently no meeting records available.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
