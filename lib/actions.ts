
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  addMeeting as addMeetingToDatabase,
  updateMeeting as updateMeetingInDatabase,
  deleteMeeting as deleteMeetingFromDatabase,
} from './meetings-db';

// The state returned to forms when validation fails.
export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

const meetingSchema = z.object({
  date: z.string().min(1, 'Please select a meeting date.'),

  meetingType: z.enum(
    ['testimony', 'regular', 'stake', 'general'],
    { error: 'Please select a valid meeting type.' }
  ),

  presiding: z.string().trim().min(1, 'Presiding officer is required.'),
  conducting: z.string().trim().min(1, 'Conducting officer is required.'),

  openingHymnNumber: z.coerce.number().int().positive(
    'Enter a valid opening hymn number.'
  ),
  openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),

  openingPrayer: z.string().trim().min(1, 'Opening prayer is required.'),

  announcements: z.string().optional(),

  wardBusiness: z.string().optional(),

  stakeBusiness: z.boolean(),

  sacramentHymnNumber: z.coerce.number().int().positive(
    'Enter a valid sacrament hymn number.'
  ),
  sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn title is required.'),

  speakers: z.string().optional(),

  closingHymnNumber: z.coerce.number().int().positive(
    'Enter a valid closing hymn number.'
  ),
  closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),

  closingPrayer: z.string().trim().min(1, 'Closing prayer is required.'),
});

function getFormValues(formData: FormData) {
  return {
    date: String(formData.get('date') ?? ''),
    meetingType: String(formData.get('meetingType') ?? ''),
    presiding: String(formData.get('presiding') ?? ''),
    conducting: String(formData.get('conducting') ?? ''),

    openingHymnNumber: formData.get('openingHymnNumber') || '',
    openingHymnTitle: String(formData.get('openingHymnTitle') ?? ''),
    openingPrayer: String(formData.get('openingPrayer') ?? ''),

    announcements: String(formData.get('announcements') ?? ''),
    wardBusiness: String(formData.get('wardBusiness') ?? ''),
    stakeBusiness: formData.get('stakeBusiness') === 'on',

    sacramentHymnNumber: formData.get('sacramentHymnNumber') || '',
    sacramentHymnTitle: String(formData.get('sacramentHymnTitle') ?? ''),

    speakers: String(formData.get('speakers') ?? ''),

    closingHymnNumber: formData.get('closingHymnNumber') || '',
    closingHymnTitle: String(formData.get('closingHymnTitle') ?? ''),
    closingPrayer: String(formData.get('closingPrayer') ?? ''),
  };
}

function convertToMeetingData(
  data: z.infer<typeof meetingSchema>
) {
  const speakers = (data.speakers ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, topic, type] = line.split('|').map((part) => part.trim());

      return {
        name,
        topic,
        type: type as 'speaker' | 'musical-number',
      };
    });

  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,

    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,

    announcements: (data.announcements ?? '')
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),

    wardBusiness: (data.wardBusiness ?? '')
      .split('\n')
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),

    stakeBusiness: data.stakeBusiness,

    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },

    speakers,

    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  };
}

// CREATE MEETING
export async function createMeeting(
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = meetingSchema.safeParse(getFormValues(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  try {
    const meetingData = convertToMeetingData(validatedFields.data);

    await addMeetingToDatabase(meetingData);

  } catch {
    return {
      message: 'Database Error: Unable to create the meeting.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath('/admin/meetings');
  redirect('/admin/meetings');
}

// UPDATE MEETING
export async function updateMeeting(
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = Number(formData.get('id'));

  if (!Number.isInteger(id) || id <= 0) {
    return { message: 'Invalid meeting ID.' };
  }

  const validatedFields = meetingSchema.safeParse(getFormValues(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  try {
    const meetingData = convertToMeetingData(validatedFields.data);

    const updatedMeeting = await updateMeetingInDatabase(id, meetingData);

    if (!updatedMeeting) {
      return { message: 'Meeting not found.' };
    }

  } catch {
    return {
      message: 'Database Error: Unable to update the meeting.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  revalidatePath('/admin/meetings');
  redirect('/admin/meetings');
}

// DELETE MEETING
export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid meeting ID.');
  }

  await deleteMeetingFromDatabase(id);

  revalidatePath('/meetings');
  revalidatePath('/admin/meetings');
  redirect('/admin/meetings');
}
