
import Link from 'next/link';

const features = [
  {
    number: '01',
    title: 'Meeting Agendas',
    description:
      'View complete sacrament meeting programs, including hymns, prayers, speakers, and announcements.',
  },
  {
    number: '02',
    title: 'Meeting History',
    description:
      'Access previous meeting programs and review past meeting arrangements.',
  },
  {
    number: '03',
    title: 'Print Programs',
    description:
      'View and print meeting programs for convenient use during Sunday meetings.',
  },
];

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Sacrament Meeting Management
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Plan, organize, and review your Sunday meetings.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A simple and organized platform for managing
            sacrament meeting programs, coordinating
            participants, and accessing previous meetings.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Current Meeting
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What you can do
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Everything in one place
            </h2>

            <p className="mt-4 max-w-2xl text-slate-600">
              Manage meeting information and make Sunday
              meeting preparation more organized.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-xl border border-slate-200 p-8 transition hover:border-blue-300 hover:shadow-md"
              >
                <span className="text-sm font-bold text-blue-600">
                  {feature.number}
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to explore meeting programs?
          </h2>

          <p className="mt-4 text-slate-300">
            Browse meeting agendas and access available programs.
          </p>

          <Link
            href="/meetings"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Explore Meetings
          </Link>
        </div>
      </section>
    </div>
  );
}
