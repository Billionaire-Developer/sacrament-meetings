
'use client';

import { deleteMeeting } from '@/lib/actions';

interface DeleteMeetingButtonProps {
  meetingId: number;
}

export default function DeleteMeetingButton({
  meetingId,
}: DeleteMeetingButtonProps) {
  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this meeting? This action cannot be undone.'
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteMeeting}>
      <input type="hidden" name="id" value={meetingId} />

      <button
        type="submit"
        onClick={handleDelete}
        className="font-semibold text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </form>
  );
}
