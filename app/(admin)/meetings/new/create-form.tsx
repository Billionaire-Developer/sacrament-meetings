
'use client';

import { useActionState } from 'react';
import { createMeeting, type ActionState } from '@/lib/actions';

const initialState: ActionState = {};

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState
  );

  function fieldError(name: string) {
    const error = state.errors?.[name]?.[0];

    if (!error) return null;

    return (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
        {error}
      </p>
    );
  }

  function fieldProps(name: string) {
    return {
      id: name,
      name,
      'aria-describedby': state.errors?.[name]
        ? `${name}-error`
        : undefined,
      'aria-invalid': Boolean(state.errors?.[name]),
    };
  }

  const inputClass =
    'mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500';

  const labelClass = 'block text-sm font-medium text-slate-700';

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-md bg-red-50 p-4 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      {/* Meeting details */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Meeting Details
        </h2>

        <div>
          <label htmlFor="date" className={labelClass}>Meeting Date</label>
          <input
            type="date"
            {...fieldProps('date')}
            className={inputClass}
          />
          {fieldError('date')}
        </div>

        <div>
          <label htmlFor="meetingType" className={labelClass}>Meeting Type</label>
          <select {...fieldProps('meetingType')} className={inputClass} defaultValue="">
            <option value="" disabled>Select meeting type</option>
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          {fieldError('meetingType')}
        </div>

        <div>
          <label htmlFor="presiding" className={labelClass}>Presiding Officer</label>
          <input {...fieldProps('presiding')} className={inputClass} />
          {fieldError('presiding')}
        </div>

        <div>
          <label htmlFor="conducting" className={labelClass}>Conducting Officer</label>
          <input {...fieldProps('conducting')} className={inputClass} />
          {fieldError('conducting')}
        </div>
      </section>

      {/* Opening */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Opening</h2>

        <div>
          <label htmlFor="openingHymnNumber" className={labelClass}>
            Opening Hymn Number
          </label>
          <input
            type="number"
            min="1"
            {...fieldProps('openingHymnNumber')}
            className={inputClass}
          />
          {fieldError('openingHymnNumber')}
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className={labelClass}>
            Opening Hymn Title
          </label>
          <input {...fieldProps('openingHymnTitle')} className={inputClass} />
          {fieldError('openingHymnTitle')}
        </div>

        <div>
          <label htmlFor="openingPrayer" className={labelClass}>
            Opening Prayer
          </label>
          <input {...fieldProps('openingPrayer')} className={inputClass} />
          {fieldError('openingPrayer')}
        </div>
      </section>

      {/* Announcements and ward business */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Announcements and Ward Business
        </h2>

        <div>
          <label htmlFor="announcements" className={labelClass}>
            Announcements
          </label>
          <textarea
            {...fieldProps('announcements')}
            rows={4}
            placeholder="Enter each announcement on a separate line."
            className={inputClass}
          />
          {fieldError('announcements')}
        </div>

        <div>
          <label htmlFor="wardBusiness" className={labelClass}>
            Ward Business
          </label>
          <textarea
            {...fieldProps('wardBusiness')}
            rows={4}
            placeholder="Enter each ward business item on a separate line."
            className={inputClass}
          />
          {fieldError('wardBusiness')}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="stakeBusiness"
            name="stakeBusiness"
            className="h-4 w-4 rounded border-slate-300"
          />
          <label htmlFor="stakeBusiness" className={labelClass}>
            Include stake business
          </label>
        </div>
      </section>

      {/* Sacrament */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Sacrament</h2>

        <div>
          <label htmlFor="sacramentHymnNumber" className={labelClass}>
            Sacrament Hymn Number
          </label>
          <input
            type="number"
            min="1"
            {...fieldProps('sacramentHymnNumber')}
            className={inputClass}
          />
          {fieldError('sacramentHymnNumber')}
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className={labelClass}>
            Sacrament Hymn Title
          </label>
          <input {...fieldProps('sacramentHymnTitle')} className={inputClass} />
          {fieldError('sacramentHymnTitle')}
        </div>
      </section>

      {/* Speakers */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Speakers and Musical Numbers
        </h2>

        <div>
          <label htmlFor="speakers" className={labelClass}>
            Speakers
          </label>
          <textarea
            {...fieldProps('speakers')}
            rows={5}
            placeholder={'John Doe | Faith in Christ | speaker\nJane Doe | Musical Number | musical-number'}
            className={inputClass}
          />
          <p className="mt-1 text-sm text-slate-500">
            Enter one person per line using: Name | Topic | speaker or musical-number.
          </p>
          {fieldError('speakers')}
        </div>
      </section>

      {/* Closing */}
      <section className="space-y-4 rounded-lg border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Closing</h2>

        <div>
          <label htmlFor="closingHymnNumber" className={labelClass}>
            Closing Hymn Number
          </label>
          <input
            type="number"
            min="1"
            {...fieldProps('closingHymnNumber')}
            className={inputClass}
          />
          {fieldError('closingHymnNumber')}
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className={labelClass}>
            Closing Hymn Title
          </label>
          <input {...fieldProps('closingHymnTitle')} className={inputClass} />
          {fieldError('closingHymnTitle')}
        </div>

        <div>
          <label htmlFor="closingPrayer" className={labelClass}>
            Closing Prayer
          </label>
          <input {...fieldProps('closingPrayer')} className={inputClass} />
          {fieldError('closingPrayer')}
        </div>
      </section>

      <div className="flex items-center justify-end gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Creating Meeting...' : 'Create Meeting'}
        </button>
      </div>
    </form>
  );
}
