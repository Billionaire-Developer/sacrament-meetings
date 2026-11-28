
import type { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Bishopric Sign In | Sacrament Meeting Planner',
  description: 'Sign in to manage sacrament meeting programs.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-16">
      <LoginForm />
    </section>
  );
}
