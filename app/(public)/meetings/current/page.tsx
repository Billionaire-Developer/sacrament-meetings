
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  await connection();

  const meetings = await getMeetings('', 1);

  const meeting = meetings[0];

  if (!meeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meeting.id}`);
}
