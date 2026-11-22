
import CreateMeetingForm from './create-form';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
        Meeting Administration
      </p>

      <h1 className="mt-3 text-3xl font-bold text-slate-900">
        Create Sacrament Meeting
      </h1>

      <p className="mt-3 text-slate-600">
        Complete the form below to schedule a new sacrament meeting.
      </p>

      <div className="mt-8">
        <CreateMeetingForm />
      </div>
    </main>
  );
}
