
export default function MeetingsLoading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm font-medium text-slate-600">
          Loading meetings...
        </p>
      </div>
    </div>
  );
}
