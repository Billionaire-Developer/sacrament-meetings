
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: MeetingPageProps): Promise<Metadata> {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    return {
      title: 'Meeting Not Found | Sacrament Meeting Planner',
    };
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return {
      title: 'Meeting Not Found | Sacrament Meeting Planner',
      description: 'The requested sacrament meeting could not be found.',
    };
  }

  const meetingType = meeting.meetingType
    .replace(/^\w/, (character) => character.toUpperCase());

  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    title: `${meetingType} Meeting | Sacrament Meeting Planner`,
    description: `View the sacrament meeting program for ${formattedDate}, including hymns, speakers, prayers, and announcements.`,
  };
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
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
    <div className="mx-auto max-w-7xl px-6 py-10">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
