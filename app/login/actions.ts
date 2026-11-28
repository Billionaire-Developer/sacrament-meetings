
'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

export type LoginState = {
  message?: string;
};

export async function authenticate(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin/meetings',
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: 'Invalid email or password. Please try again.',
      };
    }

    throw error;
  }
}
