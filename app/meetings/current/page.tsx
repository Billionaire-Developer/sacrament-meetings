import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();

  const dayOfWeek = today.getDay();
  const sunday = new Date(today);

  sunday.setDate(today.getDate() - dayOfWeek);

  const date = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, '0'),
    String(sunday.getDate()).padStart(2, '0'),
  ].join('-');

  const meetings = getMeetings(date);
  const meeting = meetings[0];

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}